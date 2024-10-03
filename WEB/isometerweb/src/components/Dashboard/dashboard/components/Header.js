import * as React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton"; // Importa IconButton de Material UI
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"; // Importa el ícono de cerrar sesión
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Link,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  GridAddIcon,
  GridDragIcon,
  GridLoadIcon,
  GridMenuIcon,
} from "@mui/x-data-grid";
import { postDevice } from "../../../Api/ApiServices";
export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    universalId: null,
    name: "",
    model: "",
    description: "",
    userId: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addDevice = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await postDevice(formData);
      setFormData({
        universalId: "",
        name: "",
        model: "",
        description: "",
        userId: null,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  };

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Box>
        <img
          style={{ width: 100 }}
          src="/Logo-Consultar.png"
          alt="Logo Consultar"
        />
      </Box>
      <Stack direction="row" sx={{ gap: 1 }}>
        <IconButton
          sx={{
            width: "36px", // Ajusta el ancho del botón
            height: "36px", // Ajusta la altura del botón
          }}
        >
          <GridMenuIcon
            color="primary"
            aria-label="Cerrar sesión"
            onClick={() => handleOpen(true)}
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
            justifyContent: "center", // Centrar horizontalmente
            alignItems: "center", // Centrar verticalmente
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: 400,
              maxHeight: "80vh",
              overflow: "auto",
              outline: 2,
              justifyContent: "center",
            }}
          >
            <Typography
              textAlign="center"
              id="modal-name"
              variant="h6"
              component="h2"
              color="black"
            >
              AGREGAR DISPOSITIVO{" "}
            </Typography>
            <FormControl fullWidth component="form" onSubmit={addDevice}>
              <Typography
                id="modal-name"
                variant="h6"
                component="h2"
                color="black"
              >
                UniversalID
              </Typography>
              <TextField
                id="universalID-input"
                label="UniversalID"
                type="number"
                name="universalId"
                value={formData.universalId}
                onChange={handleChange}
              ></TextField>
              <Typography
                id="modal-name"
                variant="h6"
                component="h2"
                color="black"
              >
                Nombre
              </Typography>
              <TextField
                id="name-input"
                label="Nombre"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              ></TextField>
              <Typography
                id="modal-model"
                variant="h6"
                component="h2"
                color="black"
              >
                Modelo
              </Typography>
              <TextField
                id="model-input"
                label="Modelo"
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
              ></TextField>
              <Typography
                id="modal-description"
                variant="h6"
                component="h2"
                color="black"
              >
                Descripción
              </Typography>
              <TextField
                id="description-input"
                label="Descripción"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></TextField>
              <Typography
                id="modal-description"
                variant="h6"
                component="h2"
                color="black"
              >
                Usuario
              </Typography>
              <TextField
                select
                id="user-input"
                label="Selecciona un usuario"
                type="number"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
              >
                <MenuItem value={1}>Nombre Usuario</MenuItem>
              </TextField>
              <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
                Agregar Dispositivo
              </Button>
            </FormControl>

            <Button onClick={handleClose} variant="outlined" sx={{ mt: 2 }}>
              Cerrar
            </Button>
          </Box>
        </Modal>
        <ColorModeIconDropdown />
        <IconButton
          sx={{
            width: "36px", // Ajusta el ancho del botón
            height: "36px", // Ajusta la altura del botón
          }}
        >
          <LogoutRoundedIcon
            color="primary"
            onClick={logoutHandler}
            aria-label="Cerrar sesión"
            sx={{ fontSize: 17 }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
}
