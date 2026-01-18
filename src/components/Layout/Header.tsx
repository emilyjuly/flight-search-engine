import { AppBar, Toolbar, Typography } from "@mui/material";
import { FlightTakeoff } from "@mui/icons-material";

function Header() {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <FlightTakeoff />
        <Typography variant="h6" sx={{ ml: 1 }}>
          Flight Search Engine
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
