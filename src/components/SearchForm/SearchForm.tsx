import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { fetchLocations } from "../../services/flightsApi";

export type FlightSearchParams = {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
};

type LocationOption = {
  iataCode: string;
  name: string;
  address?: {
    cityName?: string;
    countryName?: string;
  };
};

type SearchFormProps = {
  onSearch: (params: FlightSearchParams) => void;
  loading: boolean;
};

function SearchForm({ onSearch, loading }: SearchFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const [dateError, setDateError] = useState<string | null>(null);
  const [loadingLocations, setLoadingLocations] = useState(false);

  const [params, setParams] = useState<FlightSearchParams>({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
  });

  const [options, setOptions] = useState<LocationOption[]>([]);

  const isFormInvalid =
    !params.origin ||
    !params.destination ||
    !params.departureDate ||
    params.departureDate < today;

  const handleSearchLocations = async (value: string) => {
    if (value.length < 2) {
      setOptions([]);
      return;
    }

    try {
      setLoadingLocations(true);
      const results = await fetchLocations(value);
      setOptions(results);
    } catch (e) {
      setOptions([]);
    } finally {
      setLoadingLocations(false);
    }
  };

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
    if (params.departureDate < today) {
      setDateError("Departure date cannot be in the past");
      return;
    }

    setDateError(null);
    onSearch({
      origin: params.origin.toUpperCase(),
      destination: params.destination.toUpperCase(),
      departureDate: params.departureDate,
      returnDate: params.returnDate,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Autocomplete
            options={options}
            disabled={loading}
            loading={loadingLocations}
            getOptionLabel={(option) => `${option.name} (${option.iataCode})`}
            filterOptions={(x) => x}
            onInputChange={(_, value) => handleSearchLocations(value)}
            onChange={(_, value) =>
              setParams((prev) => ({
                ...prev,
                origin: value?.iataCode ?? "",
              }))
            }
            renderInput={(params) => (
              <TextField {...params} label="Origin" required />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Autocomplete
            options={options}
            disabled={loading}
            loading={loadingLocations}
            getOptionLabel={(option) => `${option.name} (${option.iataCode})`}
            filterOptions={(x) => x}
            onInputChange={(_, value) => handleSearchLocations(value)}
            onChange={(_, value) =>
              setParams((prev) => ({
                ...prev,
                destination: value?.iataCode ?? "",
              }))
            }
            renderInput={(params) => (
              <TextField {...params} label="Destination" required />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            label="Departure"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={params.departureDate}
            onChange={handleChange("departureDate")}
            disabled={loading}
            required
            inputProps={{ min: today }}
            error={!!dateError}
            helperText={dateError}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            label="Return"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={params.returnDate}
            onChange={handleChange("returnDate")}
            disabled={loading}
            inputProps={{ min: today }}
          />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6, md: 2 }}
          display="flex"
          alignItems="flex-end"
        >
          <Button
            sx={{ padding: 2 }}
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading || isFormInvalid}
            startIcon={!loading && <Search />}
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchForm;
