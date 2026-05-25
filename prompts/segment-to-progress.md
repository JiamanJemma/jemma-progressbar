# Prompt · 字幕 → 章节进度条 JSON

> 用途：把 whisper 跑出的字幕 / 纯文本扔给任意 AI，AI 输出每章 `{start, end, title, progress_pct}` 的 JSON，喂给 Remotion 自动配进度条。
> 兼容 AI：ChatGPT · Claude · Gemini · 豆包 · 文心一言（任何能读文本的 AI）

---

## 怎么用

1. 跑 `python scripts/transcribe.py 我的视频.mp4`，得到 `我的视频.txt`（带时间戳的纯文本）
2. 把下面**整段 prompt + 你的字幕内容**一起发给 AI
3. AI 会输出一段 JSON，复制保存为 `progress-chapters.json`
4. 喂给 Remotion 组件渲染

---

## Prompt（整段复制给 AI）

````
你是一个视频章节切分助手。我会给你一份带时间戳的视频字幕，请你帮我分章节。

# 任务
1. 读完整段字幕，理解视频在讲什么
2. 按"话题转折"分章节（不是按时长平均切，是按内容转折切）
3. 每章给一个 5-10 字的中文标题（简洁有力，不要"第一部分""开头"这种废话）
4. 章节数控制在 3-7 章之间（太多碎，太少粗）

# 输出格式（严格按这个 JSON 输出，不要任何解释文字）

```json
{
  "video_duration_sec": <视频总时长，从字幕最后一条时间戳取>,
  "chapters": [
    {
      "index": 1,
      "title": "章节标题",
      "start_sec": <开始秒数>,
      "end_sec": <结束秒数>,
      "summary": "<10字内一句概括这章在讲什么>"
    }
  ]
}
```

# 重要规则
- start_sec / end_sec 必须是数字（秒数），不要写 "01:30" 这种字符串
- 第 N 章的 start_sec = 第 N-1 章的 end_sec（无缝衔接）
- 第 1 章 start_sec 一般是 0
- 最后一章 end_sec = video_duration_sec
- title 不许出现"开头""结尾""第一部分""总结"这种位置词，要用内容关键词
- summary 用陈述句，不用"介绍了""讲到了"这种说书人口吻

# 我的字幕（带时间戳）

【粘贴你的 .txt 文件内容到这里】
````

---

## 输出示例

```json
{
  "video_duration_sec": 105,
  "chapters": [
    {
      "index": 1,
      "title": "群里那条问话",
      "start_sec": 0,
      "end_sec": 20,
      "summary": "朋友问 Remotion 进度条怎么做"
    },
    {
      "index": 2,
      "title": "Claude 一页合成",
      "start_sec": 20,
      "end_sec": 50,
      "summary": "不用导出叠剪映，直接在 Remotion 里做"
    },
    {
      "index": 3,
      "title": "字幕配进度条",
      "start_sec": 50,
      "end_sec": 80,
      "summary": "whisper 跑字幕，AI 分章节自动配"
    },
    {
      "index": 4,
      "title": "整套打包成 skill",
      "start_sec": 80,
      "end_sec": 105,
      "summary": "评论区拿走，自己改"
    }
  ]
}
```

---

## 配合 Remotion 怎么用

```tsx
import progressData from './progress-chapters.json';
import { ProgressSteps } from 'jemma-progressbar';

<ProgressSteps
  theme="jemma-purple"
  steps={progressData.chapters.map(c => c.title)}
/>
```

或者结合视频时间轴，让进度条按章节真实推进：

```tsx
// 当前帧落在第几章，进度条到第几格
const currentChapter = progressData.chapters.findIndex(
  c => frame / fps >= c.start_sec && frame / fps < c.end_sec
);
```
