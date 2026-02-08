"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  type IChartApi,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";
import { CandleData } from "@/stores/usePriceStore";

interface ChartCanvasProps {
  candles: CandleData[];
}

export default function ChartCanvas({ candles }: ChartCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#6b7b8d",
        fontFamily: "monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "rgba(30, 42, 58, 0.12)" },
        horzLines: { color: "rgba(30, 42, 58, 0.12)" },
      },
      crosshair: {
        vertLine: { color: "#4a5568", width: 1, style: 2 },
        horzLine: { color: "#4a5568", width: 1, style: 2 },
      },
      rightPriceScale: {
        borderColor: "#1e2a3a",
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderColor: "#1e2a3a",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: "#00ff88",
      downColor: "#ff3355",
      borderUpColor: "#00ff88",
      borderDownColor: "#ff3355",
      wickUpColor: "#00ff88",
      wickDownColor: "#ff3355",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    handleResize();

    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current && candles.length > 0) {
      const chartData = candles.map((c) => ({
        time: c.time as Time,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      }));
      seriesRef.current.setData(chartData);
    }
  }, [candles]);

  return <div ref={containerRef} className="absolute inset-0" />;
}
