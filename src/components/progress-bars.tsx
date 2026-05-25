/**
 * Horizontal Progress Bars · 多主题版
 * -----------------------------------
 * 派生自 React Video Editor 免费模板（reactvideoeditor.com）
 * jemma-progressbar 改造：抽出硬编码颜色到 theme，支持 5 套配色 + 自定义数据
 */

"use client";

import { interpolate, useCurrentFrame } from "remotion";
import { getTheme, DEFAULT_THEME, type ThemeName } from "../themes";

export type ProgressBarItem = {
  label: string;
  value: number;  // 0-100
};

export type ProgressBarsProps = {
  theme?: ThemeName;
  title?: string;
  items?: ProgressBarItem[];
};

const DEFAULT_ITEMS: ProgressBarItem[] = [
  { label: "选题", value: 90 },
  { label: "脚本", value: 85 },
  { label: "拍摄", value: 75 },
  { label: "剪辑", value: 60 },
  { label: "发布", value: 45 },
];

export default function ProgressBars({
  theme = DEFAULT_THEME,
  title = "创作进度",
  items = DEFAULT_ITEMS,
}: ProgressBarsProps) {
  const frame = useCurrentFrame();
  const t = getTheme(theme);

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
        fontFamily: "Inter, -apple-system, 'PingFang SC', sans-serif",
        background: t.bg,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "700px",
          backgroundColor: t.panel,
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
          padding: "40px 50px",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: t.title,
            letterSpacing: "-0.5px",
            marginBottom: "35px",
            textAlign: "center",
          }}
        >
          {title}
        </div>

        {/* Bars */}
        {items.map((item, i) => {
          const barProgress = interpolate(
            frame,
            [5 + i * 8, 25 + i * 8],
            [0, item.value],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );

          const labelOpacity = interpolate(
            frame,
            [i * 8, 5 + i * 8],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );

          return (
            <div
              key={`item-${i}`}
              style={{
                marginBottom: i < items.length - 1 ? "22px" : "0",
                opacity: labelOpacity,
              }}
            >
              {/* Label row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ color: t.text, fontSize: "16px", fontWeight: 600 }}>
                  {item.label}
                </span>
                <span style={{ color: t.subtle, fontSize: "16px", fontWeight: 500 }}>
                  {Math.round(barProgress)}%
                </span>
              </div>

              {/* Bar track */}
              <div
                style={{
                  width: "100%",
                  height: "14px",
                  backgroundColor: t.track,
                  borderRadius: "7px",
                  overflow: "hidden",
                }}
              >
                {/* Bar fill */}
                <div
                  style={{
                    width: `${barProgress}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${t.fillStart}, ${t.fillEnd})`,
                    borderRadius: "7px",
                    boxShadow: `0 0 10px ${t.accent}40`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
