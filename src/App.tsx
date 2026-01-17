import { Alert, Box, CircularProgress } from "@mui/material";
import Layout from "./components/Layout/Layout";
import SearchForm from "./components/SearchForm/SearchForm";
import { useFlightsSearch } from "./hooks/useFlightsSearch";
import { FlightsTable } from "./components/FlightsTable/FlightsTable";

function App() {
  const { flights, loading, error, searchFlights } = useFlightsSearch();

  return (
    <Layout>
      <SearchForm onSearch={searchFlights} />
      <Box mt={4}>
        {loading && <CircularProgress />}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && flights.length > 0 && <FlightsTable flights={flights} />}
      </Box>
    </Layout>
  );
}

export default App;
