import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import {
  GridArrowUpwardIcon,
  GridCheckCircleIcon,
  GridClearIcon,
  GridColumnIcon,
  GridMenuIcon,
  GridMoreVertIcon,
  GridViewStreamIcon,
  GridVisibilityOffIcon,
} from "@mui/x-data-grid";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import {
  allRooms,
  changeStatusDevice,
  getDeviceStatus,
  postRandomData,
  putDevice,
} from "../../../Api/ApiServices";

function StatCard({ universalId, description, name, model, roomId, trend }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [status, setStatus] = useState(); // Poner en true para simular

  const fetchDeviceStatus = async () => {
    try {
      const response = await getDeviceStatus(universalId);
      setStatus(response.data.status);
      console.log("estado", response.data.status);
    } catch (error) {
      console.log("Error obteniendo estado del dispositivo:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDeviceStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [status]);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    universalId: null,
    name: "",
    model: "",
    description: "",
    roomId: null,
  });

  const handleOpen = () => {
    setFormData({
      universalId,
      name,
      model,
      description,
      roomId,
    });
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeRoomId = (e) => {
    const selectedRoomId = e.target.value;
    setFormData({ ...formData, roomId: selectedRoomId }); // Directly update formData
    console.log("Room ID seleccionado:", selectedRoomId);
  };

  const editDevice = async (e) => {
    setLoading(true);

    try {
      const editedData = {
        universalId: formData.universalId,
        name: formData.name,
        model: formData.model,
        description: formData.description,
        roomId: formData.roomId,
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
        <Box display="flex" justifyContent="space-between">
          <Typography component="h2" variant="subtitle2" gutterBottom>
            {"ID: "}
            {universalId}
          </Typography>
          <Box sx={{ alignItems: "right" }}>
            <OnlinePredictionIcon
              color={status ? "success" : "error"}
              sx={{ fontSize: 30 }}
            />
          </Box>
        </Box>

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
              <IconButton sx={{ alignItems: "center" }}>
                <PowerSettingsNewIcon color="error" sx={{ fontSize: 17 }} />
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
                <Card sx={{ height: "90%" }}>
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
                      <Typography
                        id="modal-description"
                        variant="h6"
                        component="h2"
                        mt={1}
                      >
                        Habitación
                      </Typography>
                      <TextField
                        select
                        id="room-input"
                        label="Selecciona una habitación"
                        name="room"
                        fullWidth
                        value={formData.roomId || ""}
                        onChange={handleChangeRoomId}
                      >
                        {rooms?.map((room) => (
                          <MenuItem key={room.id} value={room.id}>
                            {room.name}
                          </MenuItem>
                        ))}
                      </TextField>

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
  status: PropTypes.bool.isRequired,
  trend: PropTypes.oneOf(["down", "neutral", "up"]).isRequired,
};

export default StatCard;
