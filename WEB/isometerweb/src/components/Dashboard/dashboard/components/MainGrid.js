import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import CustomizedDataGrid from "./CustomizedDataGrid";
import EssaysChart from "./EssaysChart";
import StatCard from "./StatCard";
// import ChartUserByCountry from "./ChartUserByCountry";
// import HighlightedCard from "./HighlightedCard";
// import PageViewsBarChart from "./PageViewsBarChart";
import { CircularProgress, IconButton } from "@mui/material";
import { GridSaveAltIcon } from "@mui/x-data-grid";
import useFetchDevices from "../../../Hooks/FetchData/useFetchDevices";
import useExportDB from "../../../Hooks/PostData/useExportDB";

export default function MainGrid() {
  const { devices, loading } = useFetchDevices();
  const { exportDatabase } = useExportDB();

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
        </Grid>
      )}

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Visión General
      </Typography>

      <Grid size={{ sm: 12, md: 6 }}>
        <EssaysChart />
      </Grid>

      {/* Gráfico de barras */}
      {/* <Grid size={{ sm: 12, md: 6 }}>
        <PageViewsBarChart />
      </Grid> */}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5 }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Lista de Mediciones
        </Typography>

        <IconButton onClick={exportDatabase}>
          <GridSaveAltIcon />
        </IconButton>
      </Box>

      <Grid mt={1}>
        <Grid size={{ md: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
