import { Box, Skeleton } from "@mui/material";

function FilterPanelSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width="60%" height={32} />

      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={48} sx={{ mt: 2 }} />
      ))}
    </Box>
  );
}

export default FilterPanelSkeleton;
