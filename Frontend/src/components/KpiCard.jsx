import React from "react";
import { kpiCardStyles } from "../assets/dummyStyles";

/* -------------------- Icon Registry -------------------- */

const MetricIcons = {
  default: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-8H3v8z" />
    </svg>
  ),

  revenue: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),

  growth: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M23 6l-9.5 9.5-5-5L1 18" />
      <path d="M17 6h6v6" />
    </svg>
  ),

  document: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),

  clock: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

/* -------------------- KPI Card -------------------- */

const KPICard = ({
  title,
  value,
  hint,
  iconType = "default",
  trend, // number (positive | negative)
  className = "",
}) => {
  const Icon = MetricIcons[iconType] || MetricIcons.default;

  const showTrend = typeof trend === "number";
  const isNegative = trend < 0;

  return (
    <div className={`${kpiCardStyles.card} ${className}`}>
      {/* Header */}
      <div className={kpiCardStyles.header}>
        <div className={kpiCardStyles.iconContainer}>
          <Icon className={kpiCardStyles.icon} />
        </div>

        {showTrend && (
          <div
            className={`${kpiCardStyles.trend} ${
              isNegative ? kpiCardStyles.trendNegative : kpiCardStyles.trendPositive
            }`}
          >
            <svg
              className={`${kpiCardStyles.trendIcon} ${
                isNegative ? kpiCardStyles.trendIconNegative : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M23 6l-9.5 9.5-5-5L1 18" />
              <path d="M17 6h6v6" />
            </svg>
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={kpiCardStyles.content}>
        <p className={kpiCardStyles.title}>{title}</p>
        <h3 className={kpiCardStyles.value}>{value}</h3>
      </div>

      {/* Hint */}
      {hint && (
        <div className={kpiCardStyles.hint}>
          <svg
            className={kpiCardStyles.hintIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>{hint}</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;
