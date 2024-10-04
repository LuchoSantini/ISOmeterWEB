import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs";
import { allDevices, measurementsById } from "../../../Api/ApiServices";
import { Box, CircularProgress, MenuItem, TextField } from "@mui/material";

export default function SessionsChart() {
  const theme = useTheme();
  const [devices, setDevices] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(false);

  const [gettedDeviceId, setGettedDeviceId] = useState(null);

  const handleChange = (e) => {
    const selectedDeviceId = e.target.value;
    setGettedDeviceId(selectedDeviceId);
    console.log("Device seleccionado:", selectedDeviceId);
  };

  const fetchMeasurements = async (deviceId) => {
    if (!deviceId) return;
    setLoading(true);
    try {
      const measurementResponse = await measurementsById(deviceId);
      setMeasurements(measurementResponse.data);
      console.log("Mediciones obtenidas:", measurementResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gettedDeviceId) {
      fetchMeasurements(gettedDeviceId);
    }
  }, [gettedDeviceId]);

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

  // Extract data for the chart
  const dates = measurements?.length
    ? measurements.map(
        (measurement) => dayjs(measurement?.changeDate).format("HH:mm") // Formatting time for X-axis
      )
    : [];

  const temperatures = measurements?.length
    ? measurements?.map((measurement) => measurement?.temperature)
    : [];

  const humidity = measurements?.length
    ? measurements?.map((measurement) => measurement?.humidity)
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
        <Box display="flex" width="250px" mt={1}>
          <TextField
            select
            id="device-input"
            label="Selecciona un Dispositivo"
            name="device"
            fullWidth
            onChange={handleChange}
          >
            {devices?.map((device) => (
              <MenuItem key={device.id} value={device.id}>
                {device.universalId} {device.name} {device.model}
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
