# Prompt · 截图 → Remotion 进度条组件

> 用途：看到喜欢的进度条直接截图，丢给任意支持图像的 AI，AI 输出可以直接用的 Remotion 组件代码。
> 兼容 AI：ChatGPT（GPT-4o/4.6）· Claude（Sonnet/Opus）· Gemini · 豆包（带图）

---

## 怎么用

1. 截一张你喜欢的进度条图（别人视频里的 / 网上看到的都行）
2. 在 AI 里发图 + 下面**整段 prompt**
3. AI 输出一段 TSX 组件代码
4. 存到 `src/components/my-progress.tsx`，import 就能用

---

## Prompt（整段复制 · 配图发送）

````
你是一个 Remotion 组件复刻助手。我会给你一张进度条截图，请你帮我用 jemma-progressbar 这套基础组件做出来。

# jemma-progressbar 可用的基底
我已经装了 jemma-progressbar，它提供 3 个基底组件：

1. ProgressBars   — 横条进度条（多行 · 每行带 label/value/%）
2. CircularProgress — 圆环进度条（带百分比数字 · 自动循环 / 转点）
3. ProgressSteps  — 步骤式进度条（横排圆点 · 之间连线 · 高亮当前步）

每个组件都接受 theme prop，5 套主题任选：
- jemma-purple（浅紫背景 + 深紫填充）
- ocean-blue（深蓝背景 + 亮蓝填充）
- forest-green（浅绿背景 + 深绿填充）
- sunset-orange（暖橙背景 + 亮橙填充）
- mono-black（黑底白填）

# 任务

看截图，按 3 维识别：

1. **形** — 是横条 / 圆环 / 步骤 / 其他？
   - 形如果不是这 3 种基底（比如液态/波浪/3D），告诉我「不在 jemma-progressbar 基础形态里，需要自定义 SVG」，给出大致思路
2. **色** — 截图主色调最接近哪个主题？或者要自定义 hex？
3. **动** — 动画是从左到右增长 / 从中心旋转 / 弹性进入？

# 输出格式

如果能用基底套：
```tsx
// 用法：复制到 src/components/my-progress.tsx
import { ProgressBars } from 'jemma-progressbar';

export default function MyProgress() {
  return (
    <ProgressBars
      theme="jemma-purple"
      title="..."
      items={[
        { label: "...", value: 90 },
      ]}
    />
  );
}
```

如果颜色需要自定义（截图色跟 5 主题都不像）：
```ts
// 在 src/themes/index.ts 加一条自定义主题
export const customTheme = {
  name: 'my-color',
  displayName: '自定义',
  bg: 'linear-gradient(...)',
  // ... 其他字段
};
```

如果形态超出基底范围：
- 给一段大致思路
- 写一个新的 .tsx 组件骨架（用 Remotion 的 interpolate + useCurrentFrame）

# 输出要求
- 直接给可粘贴的代码，不要解释步骤
- 标注 "复制到哪个文件"
- 如果有需要佳蔓人工调整的地方（比如真实数据），用 `// TODO: 填你的数据` 标出来

---

# 我的截图：

【在这里附上截图】

# 我的补充说明（可选）：

【比如：要用在 60s 短视频里 / 想要左到右增长动画 / 主色想换成你看到的那个紫】
````

---

## 复刻示例（参考效果）

**输入截图**：YouTube 上看到一个白底黑条简洁进度条

**AI 应该输出**：
```tsx
// 复制到 src/components/my-clean-bar.tsx
import { ProgressBars } from 'jemma-progressbar';

export default function MyCleanBar() {
  return (
    <ProgressBars
      theme="mono-black"
      title="本周完成度"
      items={[
        { label: "选题", value: 100 },
        { label: "拍摄", value: 80 },
        // TODO: 填你的真实数据
      ]}
    />
  );
}
```

---

## ⚠️ 翻车情况怎么办

| 问题 | 解决 |
|---|---|
| AI 给的代码跑不起来 | 检查是不是 import 路径错了，jemma-progressbar 安装方式见 README |
| 颜色不像截图 | 跟 AI 说"颜色不对，截图主色是 XXX hex，重做" |
| 动画对不上 | 说"动画我想要 X 秒从 0 到 100 慢慢推" |
| 形态超出基底 | AI 会给 SVG 骨架，可能要再让 AI 帮你调几轮 |
