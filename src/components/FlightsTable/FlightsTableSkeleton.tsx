import { Skeleton, Box } from "@mui/material";

export function FlightsTableSkeleton() {
  return (
    <Box>
      <Skeleton variant="rectangular" height={48} />

      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={40}
          sx={{ mt: 1 }}
        />
      ))}
    </Box>
  );
}
