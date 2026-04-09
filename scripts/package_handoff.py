#!/usr/bin/env python3
"""Genera un paquete ZIP listo para entregar a IT."""

from __future__ import annotations

import argparse
import hashlib
import shutil
from datetime import datetime, timezone
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"

FILES_TO_COPY = [
    "README.md",
    "docs/WORDPRESS_IT_HANDOFF.md",
    "snippets/cirion-hero.css",
    "snippets/cirion-hero.js",
    "snippets/cirion-hero-experimental.css",
    "snippets/cirion-hero-experimental.js",
    "snippets/hero-connectivity.html",
    "snippets/hero-data.html",
    "assets/optimized/connectivity/poster.webp",
    "assets/optimized/connectivity/video.webm",
    "assets/optimized/connectivity/video.mp4",
    "assets/optimized/data/poster.webp",
    "assets/optimized/data/video.webm",
    "assets/optimized/data/video.mp4",
]


def sha256sum(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def build_package(version: str) -> tuple[Path, Path]:
    DIST.mkdir(parents=True, exist_ok=True)

    folder_name = f"cirion-hero-it-handoff-{version}"
    package_dir = DIST / folder_name

    if package_dir.exists():
        shutil.rmtree(package_dir)

    package_dir.mkdir(parents=True)

    copied_paths: list[Path] = []

    for relative in FILES_TO_COPY:
        source = ROOT / relative
        target = package_dir / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        copied_paths.append(target)

    checksum_file = package_dir / "CHECKSUMS.sha256"
    with checksum_file.open("w", encoding="utf-8") as checksums:
        for file_path in sorted(copied_paths):
            rel = file_path.relative_to(package_dir).as_posix()
            checksums.write(f"{sha256sum(file_path)}  {rel}\n")

    copied_paths.append(checksum_file)

    zip_path = DIST / f"{folder_name}.zip"
    if zip_path.exists():
        zip_path.unlink()

    with ZipFile(zip_path, "w", compression=ZIP_DEFLATED) as zipped:
        for file_path in sorted(copied_paths):
            arcname = file_path.relative_to(DIST).as_posix()
            zipped.write(file_path, arcname)

    return package_dir, zip_path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Genera paquete de entrega para IT.")
    parser.add_argument(
        "--version",
        default=datetime.now(timezone.utc).strftime("v%Y.%m.%d"),
        help="Versión del paquete (default: vAAAA.MM.DD en UTC).",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    package_dir, zip_path = build_package(args.version)

    print("Paquete generado correctamente:")
    print(f"- Carpeta: {package_dir.relative_to(ROOT)}")
    print(f"- ZIP: {zip_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
