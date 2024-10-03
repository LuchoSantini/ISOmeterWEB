import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import dayjs from "dayjs"; // For date formatting
import { allMeasurements } from "../../../Api/ApiServices";
import { CircularProgress } from "@mui/material";

export default function SessionsChart() {
  const theme = useTheme();
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the measurement data
  const fetchData = async () => {
    setLoading(true);
    try {
      const deviceResponse = await allMeasurements();
      setMeasurements(deviceResponse.data); // Update the state with the fetched data
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  useEffect(() => {
    fetchData();
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
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Mediciones de Temperatura y Humedad
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Comparación entre temperatura y humedad
          </Typography>
        </Stack>
        {loading ? (
          <CircularProgress />
        ) : (
          <LineChart
            xAxis={[
              {
                scaleType: "point",
                data: dates,
                tickInterval: (index, i) => (i + 1) % 5 === 0,
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
            margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
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
                position: "top", // Display legend at the top
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
