"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const segments = [
  { label: "Public sale", value: 20, color: "#3B82F6" },
  { label: "Reserved", value: 35, color: "#FBBF24" },
  { label: "Advisors", value: 10, color: "#F97316" },
  { label: "Foundation", value: 10, color: "#8B5CF6" },
  { label: "Option pool", value: 12.5, color: "#34D399" },
  { label: "Team tokens", value: 12.5, color: "#22C55E" },
];

export default function FundingChart() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const animationTriggered = useRef(false);

  const [startBase, setStartBase] = useState(false);
  const [startSegments, setStartSegments] = useState(false);
  const [labelPositions, setLabelPositions] = useState<any[]>([]);
  const [visibleLabelIndex, setVisibleLabelIndex] = useState(-1);
  const [headingVisible, setHeadingVisible] = useState(false);

  /* Scroll Trigger (bi-directional) */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resetAndStart();
        } else {
          resetAll();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Reset everything */
  const resetAll = () => {
    animationTriggered.current = false;
    setStartBase(false);
    setStartSegments(false);
    setVisibleLabelIndex(-1);
    setHeadingVisible(false);
    setLabelPositions([]);

    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  /* Start animation fresh */
  const resetAndStart = () => {
    resetAll();

    setHeadingVisible(true);
    setStartBase(true);

    const baseTimer = setTimeout(() => {
      setStartSegments(true);
    }, 700);

    timeoutsRef.current.push(baseTimer);
  };

  /* After segment animation */
  const handleSegmentComplete = () => {
    if (animationTriggered.current) return;
    animationTriggered.current = true;

    const chartInstance = chartRef.current;
    if (!chartInstance) return;

    const meta = chartInstance.getDatasetMeta(0);
    if (!meta?.data?.length) return;

    const positions = meta.data.map((arc: any) => {
      const midAngle = (arc.startAngle + arc.endAngle) / 2;
      const radius = arc.outerRadius + 30;

      const x = arc.x + Math.cos(midAngle) * radius;
      const y = arc.y + Math.sin(midAngle) * radius;

      return { x, y };
    });

    setLabelPositions(positions);

    segments.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleLabelIndex(i);
      }, i * 250);

      timeoutsRef.current.push(t);
    });
  };

  const baseData = {
    datasets: [
      {
        data: startBase ? [100] : [0],
        backgroundColor: ["rgba(163, 176, 197, 0.5)"],
        borderWidth: 0,
      },
    ],
  };

  const segmentData = {
    datasets: [
      {
        data: startSegments
          ? segments.map((s) => s.value)
          : segments.map(() => 0),
        backgroundColor: segments.map((s) => s.color),
        borderWidth: 0,
      },
    ],
  };

  const baseOptions: any = {
    cutout: "86%",
    animation: {
      duration: 700,
      easing: "easeOutCubic",
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  const segmentOptions: any = {
    cutout: "86%",
    animation: {
      duration: 900,
      easing: "easeOutCubic",
      onComplete: () => {
        if (startSegments) {
          handleSegmentComplete();
        }
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <section ref={sectionRef} className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 transition-all duration-700"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible
              ? "translateY(0px)"
              : "translateY(20px)",
          }}
        >
          Token Allocation
        </h2>

        <p
          className="mt-4 text-gray-500 max-w-xl mx-auto transition-all duration-700 delay-200"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible
              ? "translateY(0px)"
              : "translateY(20px)",
          }}
        >
          A transparent distribution model ensuring sustainable growth,
          long-term ecosystem development, and balanced stakeholder rewards.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative w-[300px] h-[300px]">
          {/* Base Ring */}
          <div className="absolute inset-0">
            <Doughnut data={baseData} options={baseOptions} />
          </div>

          {/* Segments */}
          <div className="absolute inset-0">
            <Doughnut
              ref={chartRef}
              data={segmentData}
              options={segmentOptions}
            />
          </div>

          {/* Labels */}
          {labelPositions.map((pos, i) => {
            const isVisible = i <= visibleLabelIndex;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: pos.x,
                  top: pos.y,
                  transform: `translate(-50%, ${
                    isVisible ? "-50%" : "-40%"
                  })`,
                  opacity: isVisible ? 1 : 0,
                  transition:
                    "opacity 0.4s ease, transform 0.4s ease",
                }}
                className="text-xs font-semibold text-gray-700 text-center pointer-events-none"
              >
                <div>{segments[i].label}</div>
                <div className="text-[10px] text-gray-500">
                  {segments[i].value}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}