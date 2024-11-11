import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import axios from "axios";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

axios.defaults.baseURL = "http://localhost:3000/api/users";
axios.defaults.withCredentials = true; // it will help to exchange cookies with backend

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab,serif",
    // allVariants: { color: "Black" },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
