// components/SizeDistributionChart.js
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";

const SizeDistributionChart = ({ averageLengths }) => {
  const processedData = useMemo(() => {
    // Define the bins for the histogram
    const bins = [
      0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
    ];

    // Remove NaN values and scale the lengths
    let lengths = averageLengths
      .map((length) => length * 5)
      .filter((length) => !isNaN(length));

    // Calculate the number of elements in each bin
    let counts = Array(bins.length - 1).fill(0);
    lengths.forEach((length) => {
      for (let i = 0; i < bins.length - 1; i++) {
        if (length >= bins[i] && length < bins[i + 1]) {
          counts[i]++;
          break;
        }
      }
    });
    // Prepare data for Recharts
    return bins.slice(0, -1).map((bin, index) => ({
      name: bin,
      value: counts[index],
    }));
  }, [averageLengths]);
  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
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
        <Bar dataKey="value" fill="#8884d8" />
        <Line type="monotone" dataKey="pdf" stroke="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SizeDistributionChart;
