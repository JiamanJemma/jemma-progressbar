/**
 * Circular Progress · 多主题版
 * ----------------------------
 * 派生自 React Video Editor 免费模板（reactvideoeditor.com）
 * jemma-progressbar 改造：抽出硬编码颜色到 theme，支持 5 套配色
 */

"use client";

import { interpolate, useCurrentFrame } from "remotion";
import { getTheme, DEFAULT_THEME, type ThemeName } from "../themes";

export type CircularProgressProps = {
  theme?: ThemeName;
  loopFrames?: number;  // 一圈循环用多少帧（默认 90）
};

export default function CircularProgress({
  theme = DEFAULT_THEME,
  loopFrames = 90,
}: CircularProgressProps) {
  const frame = useCurrentFrame();
  const t = getTheme(theme);

  // Calculate progress based on frame
  const progress = interpolate(frame % loopFrames, [0, loopFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  // Calculate rotation for the loading effect
  const rotation = (frame * 4) % 360;

  // Calculate radius and circumference
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Pulse effect
  const pulse = 1 + Math.sin(frame / 10) * 0.05;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: t.bg,
        fontFamily: "Inter, -apple-system, 'PingFang SC', sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          transform: `scale(${pulse})`,
        }}
      >
        {/* Background circle */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          style={{ position: "absolute", transform: "rotate(-90deg)" }}
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={t.track}
            strokeWidth="12"
          />
        </svg>

        {/* Progress circle */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          style={{ position: "absolute", transform: "rotate(-90deg)" }}
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={t.fillStart} />
              <stop offset="100%" stopColor={t.fillEnd} />
            </linearGradient>
          </defs>
        </svg>

        {/* Rotating dot */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          style={{ position: "absolute", transform: `rotate(${rotation}deg)` }}
        >
          <circle cx="100" cy="20" r="8" fill={t.accent} />
        </svg>

        {/* Percentage text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "3rem",
            fontWeight: "bold",
            color: t.title,
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}
