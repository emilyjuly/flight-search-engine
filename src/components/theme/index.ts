import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0c2b49ff",
    },
    background: {
      default: "#f7f8fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#5f6368",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});
