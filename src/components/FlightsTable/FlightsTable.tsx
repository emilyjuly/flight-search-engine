import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import type { Flight } from "../../types/flight";
import moment from "moment";

type FlightsTableProps = {
  flights: Flight[];
};

export function FlightsTable({ flights }: FlightsTableProps) {
  return (
    <Paper>
      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          width: "100%",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Airline</TableCell>
              <TableCell>Departure</TableCell>
              <TableCell>Arrival</TableCell>
              <TableCell>Stops</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.airline}</TableCell>
                <TableCell>
                  {moment(flight.departureTime).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell>
                  {moment(flight.arrivalTime).format("YYYY-MM-DD HH:mm")}
                </TableCell>
                <TableCell>{flight.stops}</TableCell>
                <TableCell>{flight.duration}</TableCell>
                <TableCell align="right">${flight.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
