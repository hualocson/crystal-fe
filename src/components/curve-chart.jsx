// components/SizeDistributionChart.js
import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CurveChart = ({ x, pdf }) => {
  const processedData = useMemo(() => {
    return x.map((value, index) => ({
      name: value,
      pdf: pdf[index],
    }));
  }, [x, pdf]);
  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart
        data={processedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{ value: "Size", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          label={{ value: "Density", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Line type="monotone" dataKey="pdf" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CurveChart;
