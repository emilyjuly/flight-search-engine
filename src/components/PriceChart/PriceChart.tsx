import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Box, Typography, Paper } from "@mui/material";
import type { PriceChartPoint } from "../../utils/priceChartMapper";

type PriceChartProps = {
  data: PriceChartPoint[];
};

export function PriceChart({ data }: PriceChartProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ p: 3, mb: 3, mt: 3 }}>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Price trends
      </Typography>

      <Box height={250}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
