"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useRef, useState } from "react";

const chartConfig = [
  {
    title: "Temperature Trend Over Last 5 Years",
    dataKey: "avgTemperature",
    color: "#1b5e20",
  },
  {
    title: "Rainfall Trend Over Last 5 Years",
    dataKey: "totalRainfall",
    color: "#00639a",
  },
  {
    title: "Soil Moisture Trend",
    dataKey: "avgSoilMoisture",
    color: "#50342c",
  },
];

function TrendChart({ data, dataKey, color }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const updateWidth = () => {
      setWidth(containerRef.current?.clientWidth ?? 0);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      {width > 0 ? (
        <LineChart width={width} height={152} data={data}>
          <CartesianGrid stroke="#c0c9bb" strokeDasharray="3 3" />
          <XAxis dataKey="year" stroke="#717a6d" />
          <YAxis stroke="#717a6d" />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #c0c9bb",
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2.5}
            dot={{ r: 4 }}
            connectNulls={false}
          />
        </LineChart>
      ) : null}
    </div>
  );
}

export default function ChartsPanel({ yearly, isLoading }) {
  return (
    <div className="grid gap-3">
      {chartConfig.map((chart) => {
        const hasData = yearly.some((entry) => entry?.[chart.dataKey] !== null);

        return (
          <div
            key={chart.dataKey}
            className="rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-1)] p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
              {chart.title}
            </p>
            <div className="mt-4 h-44 rounded-[1rem] bg-[var(--color-surface-2)] px-2 py-3">
              {isLoading ? (
                <div className="flex h-full items-center justify-center px-5 text-center text-sm text-[var(--color-foreground-muted)]">
                  Fetching historical weather data...
                </div>
              ) : hasData ? (
                <TrendChart
                  data={yearly}
                  dataKey={chart.dataKey}
                  color={chart.color}
                />
              ) : (
                <div className="flex h-full items-center justify-center px-5 text-center text-sm text-[var(--color-foreground-muted)]">
                  Chart will appear after selecting a location.
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
