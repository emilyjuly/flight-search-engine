import { FlightTakeoff } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

function EmptyState() {
  return (
    <Box
      height="60vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="text.secondary"
      textAlign="center"
    >
      <FlightTakeoff fontSize="large" />
      <Typography variant="h6" mt={2}>
        Search for flights
      </Typography>
      <Typography variant="body2" mt={1}>
        Enter an origin, destination, and date to see flight options and prices.
      </Typography>
    </Box>
  );
}

export default EmptyState;
