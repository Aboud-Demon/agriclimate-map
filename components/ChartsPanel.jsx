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

import { useLanguage } from "@/components/LanguageProvider";

const chartConfig = [
  {
    titleKey: "weather.averageTemperature",
    dataKey: "avgTemperature",
    color: "#1b5e20",
  },
  {
    titleKey: "weather.totalRainfall",
    dataKey: "totalRainfall",
    color: "#00639a",
  },
  {
    titleKey: "weather.soilMoisture",
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
  const { t } = useLanguage();

  return (
    <div className="grid gap-3">
      {chartConfig.map((chart) => {
        const hasData = yearly.some((entry) => entry?.[chart.dataKey] !== null);

        return (
          <div
            key={chart.dataKey}
            className="min-w-0 rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-1)] p-4 sm:p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
              {t(chart.titleKey)}
            </p>
            <div className="mt-4 h-40 rounded-[1rem] bg-[var(--color-surface-2)] px-2 py-3 sm:h-44">
              {isLoading ? (
                <div className="flex h-full items-center justify-center px-5 text-center text-sm text-[var(--color-foreground-muted)]">
                  {t("weather.loading")}
                </div>
              ) : hasData ? (
                <TrendChart
                  data={yearly}
                  dataKey={chart.dataKey}
                  color={chart.color}
                />
              ) : (
                <div className="flex h-full items-center justify-center px-5 text-center text-sm text-[var(--color-foreground-muted)]">
                  {t("map.chartPlaceholder")}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
