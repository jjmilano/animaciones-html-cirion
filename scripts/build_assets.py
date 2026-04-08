from __future__ import annotations

import subprocess
from pathlib import Path

import imageio.v3 as iio
import imageio_ffmpeg
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OPTIMIZED_ROOT = ROOT / "assets" / "optimized"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

ASSET_CONFIG = {
    "connectivity": {
        "source": ROOT / "CONECTIVIDAD.mp4",
        "poster_frame": 62,
        "loop_end_frame": 119,
    },
    "data": {
        "source": ROOT / "DATA.mp4",
        "poster_frame": 62,
        "loop_end_frame": 121,
    },
}


def run_ffmpeg(source: Path, destination: Path, codec_args: list[str]) -> None:
    command = [
        FFMPEG,
        "-y",
        "-i",
        str(source),
        *codec_args,
        str(destination),
    ]
    subprocess.run(command, check=True)


def build_filter(loop_end_frame: int) -> str:
    forward_end_frame = loop_end_frame + 1
    reverse_end_frame = loop_end_frame
    return (
        f"[0:v]trim=start_frame=0:end_frame={forward_end_frame},"
        "setpts=PTS-STARTPTS,"
        "fps=20,"
        "scale=1280:-2:flags=lanczos,"
        "split[fwd][revin];"
        f"[revin]reverse,trim=start_frame=1:end_frame={reverse_end_frame}[rev];"
        "[fwd][rev]concat=n=2:v=1:a=0[outv]"
    )


def build_poster(source: Path, destination: Path, frame_index: int) -> None:
    frame = iio.imread(source, index=frame_index)
    image = Image.fromarray(frame).convert("RGB")

    if image.width > 1400:
        target_height = round(image.height * (1400 / image.width))
        image = image.resize((1400, target_height), Image.Resampling.LANCZOS)

    image.save(destination, format="WEBP", quality=76, method=6)


def build_mp4(source: Path, destination: Path, loop_end_frame: int) -> None:
    run_ffmpeg(
        source,
        destination,
        [
            "-filter_complex",
            build_filter(loop_end_frame),
            "-map",
            "[outv]",
            "-an",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            "-c:v",
            "libx264",
            "-preset",
            "slow",
            "-profile:v",
            "high",
            "-level:v",
            "4.1",
            "-crf",
            "29",
        ],
    )


def build_webm(source: Path, destination: Path, loop_end_frame: int) -> None:
    run_ffmpeg(
        source,
        destination,
        [
            "-filter_complex",
            build_filter(loop_end_frame),
            "-map",
            "[outv]",
            "-an",
            "-c:v",
            "libvpx-vp9",
            "-pix_fmt",
            "yuv420p",
            "-b:v",
            "0",
            "-crf",
            "38",
            "-row-mt",
            "1",
            "-deadline",
            "good",
            "-cpu-used",
            "2",
        ],
    )


def human_size(size_in_bytes: int) -> str:
    size = float(size_in_bytes)
    for unit in ("B", "KB", "MB", "GB"):
        if size < 1024 or unit == "GB":
            return f"{size:.1f} {unit}"
        size /= 1024
    return f"{size_in_bytes} B"


def main() -> None:
    for key, config in ASSET_CONFIG.items():
        output_dir = OPTIMIZED_ROOT / key
        output_dir.mkdir(parents=True, exist_ok=True)

        poster_path = output_dir / "poster.webp"
        mp4_path = output_dir / "video.mp4"
        webm_path = output_dir / "video.webm"

        build_poster(config["source"], poster_path, config["poster_frame"])
        build_mp4(config["source"], mp4_path, config["loop_end_frame"])
        build_webm(config["source"], webm_path, config["loop_end_frame"])

        print(f"\n{key.upper()}")
        for file_path in (poster_path, mp4_path, webm_path):
            print(f"  {file_path.name:<12} {human_size(file_path.stat().st_size)}")


if __name__ == "__main__":
    main()
