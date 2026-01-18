import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { fetchFlights } from "../../services/flightsApi";

export type FlightSearchParams = {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
};

type SearchFormProps = {
  onSearch: (params: FlightSearchParams) => void;
};

function SearchForm({ onSearch }: SearchFormProps) {
  const [params, setParams] = useState<FlightSearchParams>({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
  });

  const handleChange =
    (field: keyof FlightSearchParams) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setParams((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchFlights({
      origin: params.origin,
      destination: params.destination,
      departureDate: params.departureDate,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Origin"
            fullWidth
            value={params.origin}
            onChange={handleChange("origin")}
            required
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Destination"
            fullWidth
            value={params.destination}
            onChange={handleChange("destination")}
            required
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            label="Departure"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={params.departureDate}
            onChange={handleChange("departureDate")}
            required
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            label="Return"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={params.returnDate}
            onChange={handleChange("returnDate")}
          />
        </Grid>

        <Grid item xs={12} md={1} display="flex" alignItems="flex-end">
          <Button
            sx={{ padding: 2 }}
            type="submit"
            variant="contained"
            fullWidth
          >
            <Search />
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchForm;
