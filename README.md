# jemma-progressbar

> 让 AI 帮你做视频进度条 · 截图就能复刻
> Let AI build your video progress bars · Replicate from a screenshot

一个给所有视频创作者用的 Remotion 进度条工具包。
不会写代码也能用 — 把想法发给任意 AI（ChatGPT / Claude / Gemini），它会输出可以直接跑的代码。

A Remotion progress-bar kit for any video creator.
Zero-code friendly — describe what you want to any AI, get working code back.

---

## 30 秒看明白 / 30s Overview

**它能做 3 件事 · 3 things it does**

1. **现成的 3 种进度条 × 5 种主题** — 横条 / 圆环 / 步骤式，5 套配色任选
   3 components × 5 themes — bars / circular / steps, 5 color presets
2. **字幕自动配章节进度条** — whisper 跑字幕 + AI 分章节 = 自动生成进度条
   Subtitle → auto chapters — whisper + AI = auto progress bar
3. **看到喜欢的截图就能抄** — 截图丢给 AI，输出可用 Remotion 代码
   Screenshot → component code — paste image to AI, get TSX back

---

## 装 / Install

```bash
git clone https://github.com/<your-org>/jemma-progressbar.git
cd jemma-progressbar
npm install
```

字幕功能需要 whisper（按系统选 1 条跑）/ Subtitle feature needs whisper:

```bash
# macOS / Linux
bash scripts/install-whisper.sh

# Windows (PowerShell)
powershell -ExecutionPolicy Bypass -File scripts\install-whisper.ps1
```

不想本地装？/ Don't want local install?
→ [Whisper Online (Hugging Face)](https://huggingface.co/spaces/openai/whisper)

---

## 用法 1 · 直接用组件 / Use the components

```tsx
import { ProgressBars, CircularProgress, ProgressSteps } from './src/components';

// 横条进度条
<ProgressBars
  theme="jemma-purple"
  title="本周创作进度"
  items={[
    { label: "选题", value: 90 },
    { label: "拍摄", value: 75 },
    { label: "发布", value: 45 },
  ]}
/>

// 圆环进度条
<CircularProgress theme="ocean-blue" />

// 步骤式进度条
<ProgressSteps
  theme="forest-green"
  steps={["选题", "拍摄", "剪辑", "发布"]}
/>
```

### 5 种主题 / 5 Themes

| theme | 中文 | 用途 |
|---|---|---|
| `jemma-purple` | 佳蔓紫 | 默认 · 品牌色 |
| `ocean-blue` | 深海蓝 | 商务 · 科技 |
| `forest-green` | 森林绿 | 自然 · 教育 |
| `sunset-orange` | 落日橙 | 活泼 · 美食 |
| `mono-black` | 极简黑 | 商务 · 严肃 |

---

## 用法 2 · 字幕自动配进度条 / Auto chapters from subtitle

```bash
# 1. 视频跑字幕
python scripts/transcribe.py 我的视频.mp4
# 输出: 我的视频.srt + 我的视频.txt

# 2. 把 .txt + prompt 发给 AI
# prompt 在 prompts/segment-to-progress.md
# AI 会输出每章 {start, end, title} 的 JSON

# 3. JSON 喂给 ProgressSteps 渲染
```

完整流程见 [prompts/segment-to-progress.md](prompts/segment-to-progress.md)
Full guide → [prompts/segment-to-progress.md](prompts/segment-to-progress.md)

---

## 用法 3 · 截图复刻别人的进度条 / Replicate from screenshot

1. 截一张你喜欢的进度条图（别人视频里的 / 网上看到的都行）
2. 在 AI 里发图 + [prompts/screenshot-to-component.md](prompts/screenshot-to-component.md) 的 prompt
3. AI 输出 Remotion 组件代码，复制就能用

Paste any progress bar screenshot to ChatGPT / Claude / Gemini with the prompt in `prompts/screenshot-to-component.md` — get working TSX code back.

---

## 项目结构 / Structure

```
jemma-progressbar/
├── src/
│   ├── components/          # 3 个基底组件 / 3 base components
│   │   ├── progress-bars.tsx
│   │   ├── circular-progress.tsx
│   │   └── progress-steps.tsx
│   └── themes/              # 5 套主题色板 / 5 themes
├── prompts/                 # 通用 AI prompt 模板 / Universal AI prompts
│   ├── segment-to-progress.md
│   └── screenshot-to-component.md
├── scripts/                 # Whisper 字幕工具 / Whisper transcribe tools
│   ├── transcribe.py
│   ├── install-whisper.sh
│   └── install-whisper.ps1
└── examples/                # 示例 / Examples
```

---

## 致谢 / Credits

基底组件派生自 [React Video Editor](https://www.reactvideoeditor.com) 免费模板，按其许可二次开发。
Base components derived from [React Video Editor](https://www.reactvideoeditor.com) free templates, under their original license.

主要改造 / Main modifications:
- 抽出硬编码颜色到 theme 系统 / Extract hardcoded colors into theme system
- 加 5 套预设主题 / Add 5 preset themes
- 加字幕分章节 + 截图复刻工作流 / Add subtitle-to-chapters + screenshot-to-code workflow
- 中英文双语文档 / Bilingual docs

---

## License

MIT — 拿去用 · 拿去改 · 拿去商用 · 留个 credit 心意领
MIT — use it · modify it · sell it · credit appreciated

---

## 关于作者 / About

**佳蔓 Jemma** — 从全职妈妈到 AI 一人公司
From full-time mom to a one-person AI company

- 网站 / Site: [jiamanjemma.com](https://jiamanjemma.com)
- 全域同名「佳蔓 Jemma」/ Same name across all platforms

喜欢这个 skill 的话 · star 一下让更多人看到
If you like it, give it a star — helps more people find it.
