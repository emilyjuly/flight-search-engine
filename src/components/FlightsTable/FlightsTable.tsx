import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import type { Flight } from "../../types/flight";

type FlightsTableProps = {
  flights: Flight[];
};

export function FlightsTable({ flights }: FlightsTableProps) {
  return (
    <Paper>
      <Table>
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
              <TableCell>{flight.departureTime}</TableCell>
              <TableCell>{flight.arrivalTime}</TableCell>
              <TableCell>{flight.stops}</TableCell>
              <TableCell>{flight.duration}</TableCell>
              <TableCell align="right">${flight.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
