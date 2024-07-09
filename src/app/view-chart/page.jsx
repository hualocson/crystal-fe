"use client";

import CurveChart from "@/components/curve-chart";
import SizeDistributionChart from "@/components/size-distributions-chart";
import React, { useEffect, useState } from "react";

const TestPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    averageLengths: [],
    x: [],
    pdf: [],
  });
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/get-chart");
      const data = await response.json();

      return setData({
        averageLengths: data.histogramData.average_lengths,
        x: data.x,
        pdf: data.pdf,
      });
    };
    fetchData()
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen  p-4">
      <h1 className="text-2xl font-bold mb-4">Size Distribution Chart</h1>
      <div className="p-4 shadow-md rounded-lg">
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <SizeDistributionChart averageLengths={data.averageLengths} />
            <CurveChart x={data.x} pdf={data.pdf} />
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;
