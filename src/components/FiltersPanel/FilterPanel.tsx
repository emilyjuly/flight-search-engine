import {
  Box,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import type { FlightFilters } from "../../types/filters";

type FiltersPanelProps = {
  filters: FlightFilters;
  airlines: string[];
  onChange: (filters: FlightFilters) => void;
};

export function FiltersPanel({
  filters,
  airlines,
  onChange,
}: FiltersPanelProps) {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Filters
      </Typography>

      <Stack spacing={3}>
        <Box>
          <Typography gutterBottom>Max price: ${filters.maxPrice}</Typography>
          <Slider
            value={filters.maxPrice}
            min={0}
            max={2000}
            onChange={(_, value) =>
              onChange({
                ...filters,
                maxPrice: value as number,
              })
            }
          />
        </Box>

        <FormControl fullWidth>
          <InputLabel>Airlines</InputLabel>
          <Select
            multiple
            value={filters.airlines}
            renderValue={(selected) => selected.join(", ")}
            onChange={(e) =>
              onChange({
                ...filters,
                airlines: e.target.value as string[],
              })
            }
          >
            {airlines.map((airline) => (
              <MenuItem key={airline} value={airline}>
                <Checkbox checked={filters.airlines.includes(airline)} />
                <ListItemText primary={airline} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Stops</InputLabel>
          <Select
            multiple
            value={filters.stops}
            renderValue={(selected) => selected.join(", ")}
            onChange={(e) =>
              onChange({
                ...filters,
                stops: e.target.value as number[],
              })
            }
          >
            {[0, 1, 2].map((stop) => (
              <MenuItem key={stop} value={stop}>
                <Checkbox checked={filters.stops.includes(stop)} />
                <ListItemText
                  primary={stop === 0 ? "Non-stop" : `${stop} stop`}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
}
