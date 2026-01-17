import { AppBar, Toolbar, Typography } from "@mui/material";
import { AirplanemodeActive } from "@mui/icons-material";

function Header() {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        <AirplanemodeActive />
        <Typography variant="h6" sx={{ ml: 1 }}>
          Flight Search Engine
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
