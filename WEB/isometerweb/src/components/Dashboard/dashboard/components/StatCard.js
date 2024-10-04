import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Button,
  FormControl,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import {
  GridArrowUpwardIcon,
  GridClearIcon,
  GridMenuIcon,
  GridMoreVertIcon,
} from "@mui/x-data-grid";
import {
  changeStatusDevice,
  postRandomData,
  putDevice,
} from "../../../Api/ApiServices";

function StatCard({ universalId, description, name, model, data, trend }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    universalId: null,
    name: "",
    model: "",
    description: "",
  });

  const handleOpen = () => {
    setFormData({
      universalId,
      name,
      model,
      description,
    });
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editDevice = async (e) => {
    setLoading(true);

    try {
      const editedData = {
        universalId: formData.universalId,
        name: formData.name,
        model: formData.model,
        description: formData.description,
      };
      console.log(editedData);
      console.log(formData.universalId);
      const response = await putDevice(formData.universalId, editedData);

      console.log(response);
      console.log("Dispositivo actualizado:", formData);
    } catch (error) {
      console.log("Error al actualizar el dispositivo:", error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const editDeviceStatus = async (e) => {
    setLoading(true);
    const statusToSend = {
      status: false,
    };

    try {
      console.log(universalId);
      console.log(statusToSend);
      const response = await changeStatusDevice(universalId, statusToSend);
      console.log(response);
      alert("Se dio de baja el dispositivo.");
    } catch (error) {
      console.log("Error al actualizar el dispositivo:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSimulatedData = async (e) => {
    try {
      const response = await postRandomData(universalId);
      console.log(response);
      alert("Datos agregados.");
    } catch (error) {
      console.log("Error al actualizar el dispositivo:", error);
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();

  const trendColors = {
    up:
      theme.palette.mode === "light"
        ? theme.palette.success.main
        : theme.palette.success.dark,
    down:
      theme.palette.mode === "light"
        ? theme.palette.error.main
        : theme.palette.error.dark,
    neutral:
      theme.palette.mode === "light"
        ? theme.palette.grey[400]
        : theme.palette.grey[700],
  };

  const labelColors = {
    up: "success",
    down: "error",
    neutral: "default",
  };

  const color = labelColors[trend];
  const chartColor = trendColors[trend];

  return (
    <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {"ID: "}
          {universalId}
        </Typography>

        <Stack
          direction="column"
          sx={{ justifyContent: "space-between", flexGrow: "1", gap: 1 }}
        >
          <Stack sx={{ justifyContent: "space-between" }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography variant="h4" component="p">
                {name} {model}
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                textAlign: "center",
              }}
            >
              <IconButton
                onClick={handleOpen}
                sx={{ alignItems: "center", marginRight: "5px" }}
              >
                <GridMenuIcon
                  color="primary"
                  aria-label="Editar dispositivo"
                  sx={{ fontSize: 17, textAlign: "center" }}
                />
              </IconButton>
              <IconButton
                onClick={addSimulatedData}
                sx={{ alignItems: "center", marginRight: "5px" }}
              >
                <GridArrowUpwardIcon
                  color="action"
                  aria-label="Agregar data"
                  sx={{ fontSize: 17, textAlign: "center" }}
                />
              </IconButton>
              <IconButton
                onClick={editDeviceStatus}
                sx={{ alignItems: "center" }}
              >
                <GridClearIcon
                  color="error"
                  aria-label="Eliminar dispositivo"
                  sx={{ fontSize: 17 }}
                />
              </IconButton>

              <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card sx={{ height: "85%" }}>
                  <Box
                    sx={{
                      padding: "20px",
                      width: 400,
                      maxHeight: "80vh",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      textAlign="center"
                      id="modal-name"
                      variant="h5"
                      component="h2"
                    >
                      EDITAR DISPOSITIVO{" "}
                    </Typography>
                    <FormControl
                      fullWidth
                      component="form"
                      onSubmit={editDevice}
                    >
                      <Typography
                        id="modal-name"
                        variant="h6"
                        component="h2"
                        mt={1}
                      >
                        UniversalID
                      </Typography>
                      <TextField
                        id="universalID-input"
                        label="UniversalID"
                        type="number"
                        name="universalId"
                        disabled
                        value={formData.universalId || ""}
                        onChange={handleChange}
                      />
                      <Typography
                        id="modal-name"
                        variant="h6"
                        component="h2"
                        mt={1}
                      >
                        Nombre
                      </Typography>
                      <TextField
                        id="name-input"
                        label="Nombre"
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                      />
                      <Typography
                        id="modal-model"
                        variant="h6"
                        component="h2"
                        mt={1}
                      >
                        Modelo
                      </Typography>
                      <TextField
                        id="model-input"
                        label="Modelo"
                        type="text"
                        name="model"
                        value={formData.model || ""}
                        onChange={handleChange}
                      />
                      <Typography
                        id="modal-description"
                        variant="h6"
                        component="h2"
                        mt={1}
                      >
                        Descripción
                      </Typography>
                      <TextField
                        id="description-input"
                        label="Descripción"
                        type="text"
                        name="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                      />

                      <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
                        Editar
                      </Button>
                    </FormControl>

                    <Button
                      onClick={handleClose}
                      variant="outlined"
                      sx={{
                        mt: 2,
                      }}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </Card>
              </Modal>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  universalId: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(["down", "neutral", "up"]).isRequired,
};

export default StatCard;
