# install-whisper.ps1
# Windows 一键装 Whisper + ffmpeg（PowerShell）
#
# 用法（在 PowerShell 里）：
#   powershell -ExecutionPolicy Bypass -File scripts\install-whisper.ps1

Write-Host "🪟 jemma-progressbar · 装 Whisper（Windows 版）" -ForegroundColor Cyan
Write-Host ""

# --- 1. 检测 Python ---
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "❌ 没装 Python" -ForegroundColor Red
    Write-Host "   推荐用 winget 装：winget install Python.Python.3.11"
    Write-Host "   或者去 https://www.python.org 下载安装包（记得勾 Add to PATH）"
    exit 1
}
Write-Host "✅ Python: $(python --version)" -ForegroundColor Green

# --- 2. 检测 / 装 ffmpeg ---
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "⏳ 装 ffmpeg..." -ForegroundColor Yellow

    # 尝试 winget（Win10/11 自带）
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        winget install --id=Gyan.FFmpeg -e --silent
    }
    # 退而求其次：choco
    elseif (Get-Command choco -ErrorAction SilentlyContinue) {
        choco install ffmpeg -y
    }
    # 都没有：让用户自己装
    else {
        Write-Host "❌ 找不到 winget 也找不到 choco" -ForegroundColor Red
        Write-Host "   选一个："
        Write-Host "   a. 装 winget（Win10/11 应用商店搜 App Installer）"
        Write-Host "   b. 装 Chocolatey: https://chocolatey.org/install"
        Write-Host "   c. 手动装 ffmpeg: https://www.gyan.dev/ffmpeg/builds/"
        Write-Host "      下载后解压，把 bin 加进 PATH"
        exit 1
    }

    Write-Host "⚠️  ffmpeg 装好后可能需要重开 PowerShell 才能识别"
} else {
    Write-Host "✅ ffmpeg: 已装" -ForegroundColor Green
}

# --- 3. 装 openai-whisper ---
Write-Host "⏳ 装 openai-whisper（首次会下载模型，~150MB）..." -ForegroundColor Yellow
python -m pip install --upgrade pip
python -m pip install openai-whisper

# --- 4. 验证 ---
Write-Host ""
Write-Host "✅ 全部装好了" -ForegroundColor Green
Write-Host ""
Write-Host "下一步试跑（用你随便一个视频）："
Write-Host "  python scripts\transcribe.py 你的视频.mp4"
