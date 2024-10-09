import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";
import {
  allDevices,
  allRooms,
  getEssaysById,
  measurementsById,
} from "../../../Api/ApiServices";
import { Box, CircularProgress, MenuItem, TextField } from "@mui/material";

export default function SessionsChart() {
  const theme = useTheme();
  const [devices, setDevices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(false);

  const [gettedDeviceId, setGettedDeviceId] = useState(null);
  const [gettedRoomId, setGettedRoomId] = useState(null);
  const [gettedMeasurementId, setGettedMeasurementId] = useState(null);

  const handleChange = (e) => {
    const selectedDeviceId = e.target.value;
    setGettedDeviceId(selectedDeviceId);
    console.log("Device seleccionado:", selectedDeviceId);
  };

  const handleChangeDevice = (e) => {
    const selectedRoomId = e.target.value;
    setGettedRoomId(selectedRoomId);
    console.log("Device seleccionado:", selectedRoomId);
  };

  const handleChangeMeasurement = (e) => {
    const selectedMeasurementId = e.target.value;
    setGettedMeasurementId(selectedMeasurementId);
    console.log("Medición seleccionada:", selectedMeasurementId);
  };

  const fetchEssay = async (deviceId, roomId) => {
    if (!deviceId) return;
    setLoading(true);
    try {
      const measurementResponse = await getEssaysById(deviceId, roomId);
      setMeasurements(measurementResponse.data);
      console.log("Ensayos obtenidos:", measurementResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gettedDeviceId && gettedRoomId) {
      fetchEssay(gettedDeviceId, gettedRoomId);
    }
  }, [gettedDeviceId, gettedRoomId]);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const deviceResponse = await allDevices();
      setDevices(deviceResponse.data);
      console.log(devices.id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const roomsResponse = await allRooms();
      setRooms(roomsResponse.data);
      console.log(rooms.id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Extract data for the chart
  const filteredMeasurements = gettedMeasurementId
    ? measurements.find((measurement) => measurement.id === gettedMeasurementId)
    : null;

  // Extract data for the chart
  const dates = filteredMeasurements
    ? filteredMeasurements.measurements.map((measurement) =>
        dayjs(measurement.changeDate).format("HH:mm")
      )
    : [];

  const temperatures = filteredMeasurements
    ? filteredMeasurements.measurements.map(
        (measurement) => measurement.temperature
      )
    : [];

  const humidity = filteredMeasurements
    ? filteredMeasurements.measurements.map(
        (measurement) => measurement.humidity
      )
    : [];

  const colorPalette = {
    temperature: theme.palette.primary.main,
    humidity: theme.palette.secondary.main,
  };

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="h6" gutterBottom>
          Mediciones de Temperatura y Humedad
        </Typography>

        <Stack sx={{ justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Comparación entre temperatura y humedad
          </Typography>
        </Stack>
        <Box display="flex" width="600px" mt={1} justifyContent="space-between">
          <TextField
            select
            id="device-input"
            label="Selecciona un Dispositivo"
            name="device"
            fullWidth
            value={gettedDeviceId || ""}
            onChange={handleChange}
          >
            {devices?.map((device) => (
              <MenuItem key={device.id} value={device.id}>
                {device.universalId} {device.name} {device.model}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            id="room-input"
            label="Selecciona una habitación"
            name="room"
            fullWidth
            value={gettedRoomId || ""}
            onChange={handleChangeDevice}
          >
            {rooms?.map((room) => (
              <MenuItem key={room.id} value={room.id}>
                {room.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            id="essay-input"
            label="Selecciona un ensayo"
            name="essay"
            value={gettedMeasurementId || ""}
            onChange={handleChangeMeasurement}
            fullWidth
          >
            {measurements?.map((measurement) => (
              <MenuItem key={measurement.id} value={measurement.id}>
                {measurement.initDate}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : measurements.length === 0 ? ( // Comprobamos si hay datos
          <Typography
            variant="body2"
            color="text.primary"
            mt={2}
            display="flex"
            justifyContent="center"
          >
            No hay datos para mostrar, intenta seleccionar un dispositivo.
          </Typography>
        ) : (
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data: dates,
                //tickInterval: (index, i) => (i + 1) % 5 === 0,
              },
            ]}
            series={[
              {
                id: "temperature",
                label: "Temperatura (°C)",
                data: temperatures,
                color: colorPalette.temperature,
                showMark: false,
                curve: "linear",
                area: true,
              },
              {
                id: "humidity",
                label: "Humedad (%)",
                data: humidity,
                color: colorPalette.humidity,
                showMark: false,
                curve: "linear",
                area: true,
              },
            ]}
            height={250}
            margin={{ left: 50, right: 20, top: 25, bottom: 20 }}
            grid={{ horizontal: true }}
            sx={{
              "& .MuiAreaElement-series-temperature": {
                fill: "url('#temperature')",
              },
              "& .MuiAreaElement-series-humidity": {
                fill: "url('#humidity')",
              },
            }}
            slotProps={{
              legend: {
                padding: -5,
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
