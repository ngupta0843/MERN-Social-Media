import React from "react";
import { Container, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Auth from "./components/Auth/Auth";
import { theme } from "./theme";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="ENTER GOOGLE CLIENT ID HERE">
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxwidth="lg">
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" exact element={<Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
