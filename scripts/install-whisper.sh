#!/usr/bin/env bash
# install-whisper.sh
# macOS / Linux 一键装 Whisper + ffmpeg
#
# 用法：bash scripts/install-whisper.sh

set -e

echo "🍎 jemma-progressbar · 装 Whisper（macOS / Linux 版）"
echo

# --- 1. 检测 Python ---
if ! command -v python3 &> /dev/null; then
  echo "❌ 没装 Python 3"
  echo "   macOS：brew install python"
  echo "   Linux：sudo apt install python3 python3-pip"
  exit 1
fi
echo "✅ Python: $(python3 --version)"

# --- 2. 检测 / 装 ffmpeg ---
if ! command -v ffmpeg &> /dev/null; then
  echo "⏳ 装 ffmpeg..."
  if [[ "$OSTYPE" == "darwin"* ]]; then
    if ! command -v brew &> /dev/null; then
      echo "❌ macOS 上没装 Homebrew · 先装 https://brew.sh"
      exit 1
    fi
    brew install ffmpeg
  elif command -v apt &> /dev/null; then
    sudo apt update && sudo apt install -y ffmpeg
  elif command -v yum &> /dev/null; then
    sudo yum install -y ffmpeg
  else
    echo "❌ 不认识你的系统，自己装 ffmpeg 后再跑这个"
    exit 1
  fi
else
  echo "✅ ffmpeg: 已装"
fi

# --- 3. 装 openai-whisper ---
echo "⏳ 装 openai-whisper（首次会下载模型，~150MB）..."
python3 -m pip install --upgrade pip
python3 -m pip install openai-whisper

# --- 4. 验证 ---
echo
echo "✅ 全部装好了"
echo
echo "下一步试跑（用你随便一个视频）："
echo "  python3 scripts/transcribe.py 你的视频.mp4"
