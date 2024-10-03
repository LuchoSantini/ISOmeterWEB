import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppTheme from "../src/components/Dashboard/shared-theme/AppTheme";
import Dashboard from "./components/Dashboard/dashboard/Dashboard";
import SignIn from "./components/Login/sign-in/SignIn";
import SignUp from "./components/Login/sign-up/SignUp";
import { Box } from "@mui/material";

const App = () => {
  return (
    <AppTheme disableCustomTheme={false}>
      {" "}
      {/* Aplica el tema globalmente */}
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <BrowserRouter>
          <Box className="main-content">
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/home" element={<Dashboard />} />
              {/* Agrega más rutas aquí */}
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
    </AppTheme>
  );
};

export default App;
