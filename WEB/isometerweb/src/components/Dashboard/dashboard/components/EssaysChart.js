import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";
import { Box, CircularProgress, MenuItem, TextField } from "@mui/material";
import useFetchDevices from "../../../Hooks/FetchData/useFetchDevices";
import useFetchRooms from "../../../Hooks/FetchData/useFetchRooms";
import useFetchEssays from "../../../Hooks/FetchData/useFetchEssays";

export default function EssaysChart() {
  const theme = useTheme();
  const [gettedEssayId, setGettedEssayId] = useState(null);

  const { devices, loading } = useFetchDevices();
  const { rooms } = useFetchRooms();
  const {
    essays,
    setGettedDeviceId,
    setGettedRoomId,
    gettedDeviceId,
    gettedRoomId,
  } = useFetchEssays();

  const handleChangeDevice = (e) => {
    const selectedDeviceId = e.target.value;
    setGettedDeviceId(selectedDeviceId);
    console.log("Device seleccionado:", selectedDeviceId);
  };

  const handleChangeRoom = (e) => {
    const selectedRoomId = e.target.value;
    setGettedRoomId(selectedRoomId);
    setGettedEssayId(null);
    console.log("Room seleccionado:", selectedRoomId);
  };

  const handleChangeMeasurement = (e) => {
    const selectedEssayId = e.target.value;
    setGettedEssayId(selectedEssayId);
    console.log("Ensayo seleccionada:", selectedEssayId);
  };

  // Extract data for the chart
  const filteredEssays = gettedEssayId
    ? essays.find((measurement) => measurement.id === gettedEssayId)
    : null;

  // Extract data for the chart
  const dates = filteredEssays
    ? filteredEssays.measurements.map((measurement) =>
        dayjs(measurement.changeDate).format("HH:mm")
      )
    : [];

  const temperatures = filteredEssays
    ? filteredEssays.measurements.map((measurement) => measurement.temperature)
    : [];

  const humidity = filteredEssays
    ? filteredEssays.measurements.map((measurement) => measurement.humidity)
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
            onChange={handleChangeDevice}
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
            onChange={handleChangeRoom}
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
            name="essays"
            value={gettedEssayId || ""}
            onChange={handleChangeMeasurement}
            fullWidth
            disabled={!gettedRoomId}
          >
            {essays?.map((essay) => (
              <MenuItem key={essay.id} value={essay.id}>
                {"ID: "}
                {essay.id}
                {" Fecha Inicio: "}
                {essay.initDate}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : essays.length === 0 || gettedEssayId === null ? (
          <Typography
            variant="body2"
            color="text.primary"
            mt={2}
            display="flex"
            justifyContent="center"
          >
            No hay datos para mostrar, intenta seleccionar un ensayo.
          </Typography>
        ) : (
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data: dates,
                // Cada dos horas, partiendo de la primer medición
                //tickInterval: (index, i) => i % 2 === 0,

                // tickInterval: (index, i) => (i + 1) % 2 === 0,
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
