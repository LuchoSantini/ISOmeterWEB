import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppTheme from "../src/components/Dashboard/shared-theme/AppTheme"
import Dashboard from "./components/Dashboard/dashboard/Dashboard"
import SignIn from "./components/Login/sign-in/SignIn"
import { Box } from '@mui/material';
const App = () => {
  return (
    <div>
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <BrowserRouter>
        <Box className="main-content">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route
              path="/login"
              element={
                <SignIn />
              }
            />
            <Route
              path="/admin/productos"
              element={
                <ThemeProvider theme={AppTheme}>
                  <Dashboard />
                </ThemeProvider>
              }
            />
            {/* <Route
              path="/admin/usuarios"
              element={
                <CheckAdmin>
                  <UsersManagement users={users} loading={loading} />
                </CheckAdmin>
              }
            /> */}
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
    </div>
  )
}

export default App
