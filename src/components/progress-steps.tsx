/**
 * Progress Steps · 多主题版
 * -------------------------
 * 派生自 React Video Editor 免费模板（reactvideoeditor.com）
 * jemma-progressbar 改造：抽出硬编码颜色到 theme，支持 5 套配色 + 自定义步骤
 */

"use client";

import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { getTheme, DEFAULT_THEME, type ThemeName } from "../themes";

export type ProgressStepsProps = {
  theme?: ThemeName;
  title?: string;
  steps?: string[];
  framesPerStepRatio?: number;  // 每步用多少秒（默认 0.8 秒）
};

const DEFAULT_STEPS = ["选题", "写脚本", "拍摄", "发布"];

export default function ProgressSteps({
  theme = DEFAULT_THEME,
  title = "视频制作流程",
  steps = DEFAULT_STEPS,
  framesPerStepRatio = 0.8,
}: ProgressStepsProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = getTheme(theme);

  const framesPerStep = Math.floor(fps * framesPerStepRatio);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: t.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "Inter, -apple-system, 'PingFang SC', sans-serif",
      }}
    >
      <h2
        style={{
          color: t.title,
          fontSize: "2rem",
          fontWeight: "bold",
          margin: 0,
          paddingBottom: "60px",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0px",
          position: "relative",
        }}
      >
        {steps.map((label, i) => {
          const stepStart = i * framesPerStep;
          const fillProgress = interpolate(
            frame,
            [stepStart, stepStart + framesPerStep * 0.6],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const isActive =
            frame >= stepStart && frame < stepStart + framesPerStep;
          const isComplete = frame >= stepStart + framesPerStep * 0.6;

          const pulse = isActive
            ? spring({
                frame: frame - stepStart,
                fps,
                config: { damping: 8, stiffness: 150, mass: 0.4 },
              })
            : 1;

          const circleScale = isActive ? 0.9 + pulse * 0.2 : isComplete ? 1.1 : 1;

          const lineProgress =
            i < steps.length - 1
              ? interpolate(
                  frame,
                  [stepStart + framesPerStep * 0.5, stepStart + framesPerStep],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )
              : 0;

          return (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: `3px solid ${fillProgress > 0 ? t.fillStart : t.track}`,
                    background:
                      fillProgress > 0
                        ? `linear-gradient(135deg, ${t.fillStart}, ${t.fillEnd})`
                        : "transparent",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: `scale(${circleScale})`,
                    transition: "border-color 0.1s",
                  }}
                >
                  <span
                    style={{
                      color: fillProgress > 0 ? "white" : t.subtle,
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <span
                  style={{
                    color: fillProgress > 0 ? t.text : t.subtle,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    marginTop: "10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div
                  style={{
                    width: "80px",
                    height: "3px",
                    background: t.track,
                    borderRadius: "2px",
                    position: "relative",
                    overflow: "hidden",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      width: `${lineProgress * 100}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, ${t.fillStart}, ${t.fillEnd})`,
                      borderRadius: "2px",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
