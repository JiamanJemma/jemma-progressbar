#!/usr/bin/env python3
"""
transcribe.py · 用 Whisper 把视频/音频转字幕（SRT）

用法:
    python scripts/transcribe.py <视频或音频文件> [--model base]

输出:
    同目录下的 .srt 文件

模型选项（精度↑ / 速度↓）:
    tiny / base / small / medium / large
    默认 base，对中文较友好；带方言/口音建议 small 或 medium
"""

import sys
import argparse
from pathlib import Path

NOT_INSTALLED_HELP = """
⚠️  没检测到 whisper（OpenAI Whisper 语音转字幕模型）

3 种装法任选：

  推荐（macOS 用户）
    bash scripts/install-whisper.sh

  手动（任何系统）
    pip install openai-whisper
    macOS 还要：brew install ffmpeg
    Windows 还要：choco install ffmpeg（或官网下载）
    Linux 还要：sudo apt install ffmpeg

  不想装本地版？
    上 https://huggingface.co/spaces/openai/whisper 在线跑
    上传文件→选模型→点 Submit→下载 SRT
"""


def check_whisper():
    try:
        import whisper  # noqa
        return True
    except ImportError:
        print(NOT_INSTALLED_HELP)
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="Whisper 视频/音频转字幕")
    parser.add_argument("input", help="视频或音频文件路径")
    parser.add_argument(
        "--model",
        default="base",
        choices=["tiny", "base", "small", "medium", "large"],
        help="Whisper 模型（默认 base · 中文够用 · 越大越准越慢）",
    )
    parser.add_argument(
        "--language",
        default="zh",
        help="语言代码（默认 zh 中文 · en 英文 · 留空让 Whisper 自动识别）",
    )
    args = parser.parse_args()

    input_path = Path(args.input).expanduser().resolve()
    if not input_path.exists():
        print(f"❌ 文件不存在: {input_path}")
        sys.exit(1)

    check_whisper()
    import whisper

    print(f"📼 输入：{input_path.name}")
    print(f"🧠 模型：{args.model}（首次运行会自动下载，可能要等几分钟）")
    print(f"🌏 语言：{args.language or '自动识别'}")
    print("⏳ 跑字幕中...")

    model = whisper.load_model(args.model)
    result = model.transcribe(
        str(input_path),
        language=args.language if args.language else None,
        verbose=False,
    )

    # 写 SRT
    srt_path = input_path.with_suffix(".srt")
    with open(srt_path, "w", encoding="utf-8") as f:
        for i, seg in enumerate(result["segments"], 1):
            start = _fmt(seg["start"])
            end = _fmt(seg["end"])
            text = seg["text"].strip()
            f.write(f"{i}\n{start} --> {end}\n{text}\n\n")

    # 顺便写一份纯文本（给 AI 分章节用，更干净）
    txt_path = input_path.with_suffix(".txt")
    with open(txt_path, "w", encoding="utf-8") as f:
        for seg in result["segments"]:
            f.write(f"[{_fmt(seg['start'])}] {seg['text'].strip()}\n")

    print(f"✅ 完成")
    print(f"   字幕：{srt_path.name}")
    print(f"   纯文本（带时间戳，给 AI 分章节用）：{txt_path.name}")
    print()
    print(f"下一步：把 {txt_path.name} 丢给 AI（任意一个都行）")
    print(f"        + prompts/segment-to-progress.md 的 prompt")
    print(f"        AI 会输出每章 {{start, end, title}} 的 JSON")


def _fmt(seconds: float) -> str:
    """秒数 → SRT 时间格式 HH:MM:SS,mmm"""
    ms = int(round(seconds * 1000))
    h, ms = divmod(ms, 3600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


if __name__ == "__main__":
    main()
