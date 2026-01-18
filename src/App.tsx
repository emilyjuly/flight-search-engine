import { Alert, Box, Grid } from "@mui/material";
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
import EmptyState from "./components/EmptyState/EmptyState";
import PriceChartSkeleton from "./components/PriceChart/PriceChartSkeleton";
import { FlightsTableSkeleton } from "./components/FlightsTable/FlightsTableSkeleton";
import FilterPanelSkeleton from "./components/FiltersPanel/FilterPanelSkeleton";

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
      <SearchForm onSearch={searchFlights} loading={loading} />
      <Box mt={4}>
        {loading && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FilterPanelSkeleton />
              <PriceChartSkeleton />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 8 }}>
              <FlightsTableSkeleton />
            </Grid>
          </Grid>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && flights.length > 0 && (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <FiltersPanel
                filters={filters}
                airlines={airlines}
                onChange={setFilters}
              />
              <PriceChart data={chartData} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 8 }}>
              <FlightsTable flights={filteredFlights} />
            </Grid>
          </Grid>
        )}

        {!loading && flights.length === 0 && <EmptyState />}
      </Box>
    </Layout>
  );
}

export default App;
