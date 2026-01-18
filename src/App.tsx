import { Alert, Box, CircularProgress, Grid } from "@mui/material";
import Layout from "./components/Layout/Layout";
import SearchForm from "./components/SearchForm/SearchForm";
import { useFlightsSearch } from "./hooks/useFlightsSearch";
import { FlightsTable } from "./components/FlightsTable/FlightsTable";
import { useState } from "react";
import type { FlightFilters } from "./types/filters";
import { useFlightFilters } from "./hooks/useFlightFilters";
import { FiltersPanel } from "./components/FiltersPanel/FilterPanel";
import { PriceChart } from "./components/PriceChart/PriceChart";
import { mapFlightsToPriceChart } from "./utils/priceChartMapper";

function App() {
  const { flights, loading, error, searchFlights } = useFlightsSearch();

  const [filters, setFilters] = useState<FlightFilters>({
    maxPrice: 2000,
    airlines: [],
    stops: [],
  });

  const { filteredFlights } = useFlightFilters(flights, filters);

  const airlines = Array.from(new Set(flights.map((f) => f.airline)));

  const chartData = mapFlightsToPriceChart(filteredFlights);

  return (
    <Layout>
      <SearchForm onSearch={searchFlights} />
      <Box mt={4}>
        {loading && <CircularProgress />}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && flights.length > 0 && (
          <Grid container spacing={3}>
            <Grid size={4}>
              <FiltersPanel
                filters={filters}
                airlines={airlines}
                onChange={setFilters}
              />
              <PriceChart data={chartData} />
            </Grid>

            <Grid size={8}>
              <FlightsTable flights={filteredFlights} />
            </Grid>
          </Grid>
        )}
      </Box>
    </Layout>
  );
}

export default App;
