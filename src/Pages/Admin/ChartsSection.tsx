import React from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { Stats, User, Submission } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsSectionProps {
  stats: Stats;
  users: User[];
  submissions: Submission[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ stats, users }) => {
  // User Roles Pie Chart - ONLY place with colors
  const userRolesData = {
    labels: ["Admin", "Reviewer", "Author"],
    datasets: [
      {
        data: [
          users.filter((u) => u.role === "admin").length,
          users.filter((u) => u.role === "reviewer").length,
          users.filter((u) => u.role === "author").length,
        ],
        backgroundColor: [
          "#1e40af", // Blue for Admin
          "#3b82f6", // Lighter Blue for Reviewer
          "#60a5fa", // Light Blue for Author
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  // Submission Status Pie Chart - ONLY place with colors
  const submissionStatusData = {
    labels: Object.keys(stats.statusDistribution),
    datasets: [
      {
        data: Object.values(stats.statusDistribution),
        backgroundColor: [
          "#fbbf24", // Yellow for pending
          "#3b82f6", // Blue for under_review
          "#10b981", // Green for accepted
          "#ef4444", // Red for rejected
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  // Submissions per Month Line Chart - Black and White only
  const submissionsPerMonthData = {
    labels: stats.submissionsPerMonth.map((item) => item.month),
    datasets: [
      {
        label: "Submissions",
        data: stats.submissionsPerMonth.map((item) => item.count),
        borderColor: "#1e40af", // Blue only
        backgroundColor: "rgba(30, 64, 175, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#1e40af",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#000000", // Black text
          font: {
            size: 12,
            weight: "bold" as const,
          },
        },
      },
    },
  };

  const lineOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#000000", // Black text
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#000000", // Black text
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in">
      {/* User Roles Pie Chart */}
      <div className="chart-container">
        <h3 className="text-lg font-semibold text-black mb-4 text-center">
          User Roles Distribution
        </h3>
        <div className="h-64">
          <Pie data={userRolesData} options={commonOptions} />
        </div>
      </div>

      {/* Submission Status Pie Chart */}
      <div className="chart-container">
        <h3 className="text-lg font-semibold text-black mb-4 text-center">
          Submission Status
        </h3>
        <div className="h-64">
          <Pie data={submissionStatusData} options={commonOptions} />
        </div>
      </div>

      {/* Submissions per Month Line Chart */}
      <div className="chart-container lg:col-span-2">
        <h3 className="text-lg font-semibold text-black mb-4 text-center">
          Submissions per Month (Last 6 Months)
        </h3>
        <div className="h-64">
          <Line data={submissionsPerMonthData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
