import * as React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import { Card } from "../../../Login/sign-in/SignIn";
import usePostDevice from "../../../Hooks/PostData/usePostDevice";
import useFetchRooms from "../../../Hooks/FetchData/useFetchRooms";
import { AuthContext } from "../../../Login/login-context/AuthProvider";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const { addDevice, formData, setFormData } = usePostDevice();
  const { rooms } = useFetchRooms();

  const navigate = useNavigate();

  const { logout } = React.useContext(AuthContext);

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeDevice = (e) => {
    const selectedRoomId = Number(e.target.value);
    setFormData({ ...formData, roomId: selectedRoomId });
    console.log("Room seleccionado:", selectedRoomId);
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
      {/* Puede servir para navegar entre distintas pantallas */}
      {/* Podria darse de que al iniciar sesión lleve a un panel, luego el usuario elige a que sección ir.
      En caso de elija determinada sección, poder permitir ir para atrás en modo de navegación*/}
      <NavbarBreadcrumbs />
      <Box>
        <img
          style={{ width: 150, marginRight: "150px" }}
          src="/Logo-Consultar.png"
          alt="Logo Consultar"
        />
      </Box>
      <Stack direction="row" sx={{ gap: 1 }}>
        <IconButton
          sx={{
            width: "36px",
            height: "36px",
          }}
          onClick={() => handleOpen(true)}
        >
          <GridAddIcon
            color="primary"
            aria-label="Abrir menu"
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
          <Card sx={{ height: "auto", flexGrow: 1 }}>
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
                AGREGAR DISPOSITIVO{" "}
              </Typography>
              <FormControl fullWidth component="form" onSubmit={addDevice}>
                <Typography id="modal-name" variant="h6" component="h2" mt={1}>
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
                <Typography id="modal-name" variant="h6" component="h2" mt={1}>
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
                <Typography id="modal-model" variant="h6" component="h2" mt={1}>
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
                  mt={1}
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
                <Typography id="modal-room" variant="h6" component="h2" mt={1}>
                  Habitación
                </Typography>
                <TextField
                  select
                  type="number"
                  id="room-input"
                  label="Selecciona una habitación"
                  name="room"
                  fullWidth
                  value={formData.roomId || ""}
                  onChange={handleChangeDevice}
                >
                  {rooms?.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      {room.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
                  Agregar Dispositivo
                </Button>
              </FormControl>

              <Button
                onClick={handleClose}
                variant="outlined"
                sx={{
                  mt: 2,
                }}
              >
                Aceptar
              </Button>
            </Box>
          </Card>
        </Modal>
        <ColorModeIconDropdown />
        <IconButton
          sx={{
            width: "36px",
            height: "36px",
          }}
          onClick={logoutHandler}
        >
          <LogoutRoundedIcon
            color="error"
            aria-label="Cerrar sesión"
            sx={{ fontSize: 17 }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
}
