"use client";

import { formatPrice } from "@/_utils/formatters";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type BarGraphProps = {
  data: GraphData[];
};

type GraphData = {
  day: string;
  date: string;
  totalAmount: number;
};

export function BarGraph({ data }: BarGraphProps) {
  const labels = data.map((item) => item.day);
  const values = data.map((item) => item.totalAmount / 100);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sale Amount",
        data: values,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={chartData} options={options} />;
}
