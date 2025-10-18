import React from "react";
import type { Stats } from "./types";

interface StatsCardsProps {
  stats: Stats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
    },
    {
      title: "Total Submissions",
      value: stats.totalSubmissions,
      icon: "📄",
    },
    {
      title: "Acceptance Rate",
      value: `${(stats.acceptanceRate * 100).toFixed(1)}%`,
      icon: "✅",
    },
    {
      title: "Pending Reviews",
      value: stats.statusDistribution.pending || 0,
      icon: "⏳",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in">
      {cards.map((card, index) => (
        <div key={index} className="stats-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold text-black mt-2">{card.value}</p>
            </div>
            <div className="text-2xl">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
