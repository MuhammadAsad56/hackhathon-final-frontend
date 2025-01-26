import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { ThemeProvider } from "../components/theme-provider"
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import AuthContextProvider from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
    {/* <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> */}
      <App />
      {/* </ThemeProvider> */}
    </AuthContextProvider>
  </BrowserRouter>
);
