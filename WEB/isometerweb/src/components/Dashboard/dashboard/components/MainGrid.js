import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import ChartUserByCountry from "./ChartUserByCountry";
import CustomizedTreeView from "./CustomizedTreeView";
import CustomizedDataGrid from "./CustomizedDataGrid";
import HighlightedCard from "./HighlightedCard";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard from "./StatCard";

import api from "../../../Api/Api";
import { allDevices, postDatabase } from "../../../Api/ApiServices";
import { CircularProgress, IconButton } from "@mui/material";
import { GridArrowDownwardIcon, GridSaveAltIcon } from "@mui/x-data-grid";

// Usar esta data para mapear cada Device
const data = [
  {
    title: "Users",
    value: "14k",
    interval: "Last 30 days",
    trend: "up",
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: "Conversions",
    value: "325",
    interval: "Last 30 days",
    trend: "down",
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600,
      820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300,
      220,
    ],
  },
  {
    title: "Event count",
    value: "200k",
    interval: "Last 30 days",
    trend: "neutral",
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
      530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

export default function MainGrid() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const deviceResponse = await allDevices();

      setDevices(deviceResponse.data);
      console.log(devices);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const exportDatabase = async () => {
    try {
      await postDatabase({});
      alert("Base de datos exportada a Excel.\nGuardada en Escritorio");
      console.log("Base de datos exportada a Excel.");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Dispositivos
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          {devices?.map((card, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard {...card} />
            </Grid>
          ))}
          {/* <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid> */}
          {/* <Grid size={{ sm: 12, md: 6 }}>
          <SessionsChart />
        </Grid> */}
          {/* <Grid size={{ sm: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid> */}
        </Grid>
      )}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Visión General
      </Typography>

      {/* Duplicada */}
      {/* SessionsChart vendría a ser el intervalo temperatura/humedad */}

      <Grid size={{ sm: 12, md: 6 }}>
        <SessionsChart />
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5 }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Lista de Mediciones
        </Typography>
        {/* Agregar función de exportar */}
        <IconButton onClick={exportDatabase}>
          <GridSaveAltIcon></GridSaveAltIcon>
        </IconButton>
      </Box>

      {/* <Grid container spacing={2} columns={12}> */}
      <Grid mt={1}>
        <Grid size={{ md: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        {/* <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid> */}
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
