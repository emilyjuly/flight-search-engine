import { Skeleton, Box } from '@mui/material'

function PriceChartSkeleton() {
  return (
    <Box height={320} sx={{  marginTop: 2  }}>
      <Skeleton variant="rectangular" height="100%" />
    </Box>
  )
}

export default PriceChartSkeleton;