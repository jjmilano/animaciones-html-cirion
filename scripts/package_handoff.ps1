Param(
  [string]$Version = ""
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$Root = Resolve-Path (Join-Path $ScriptDir "..")
$Dist = Join-Path $Root "dist"

if ([string]::IsNullOrWhiteSpace($Version)) {
  $Version = "v" + (Get-Date).ToUniversalTime().ToString("yyyy.MM.dd")
}

$FilesToCopy = @(
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
  "assets/optimized/data/video.mp4"
)

$FolderName = "cirion-hero-it-handoff-$Version"
$PackageDir = Join-Path $Dist $FolderName
$ZipPath = Join-Path $Dist "$FolderName.zip"

New-Item -ItemType Directory -Force -Path $Dist | Out-Null
if (Test-Path $PackageDir) {
  Remove-Item -Path $PackageDir -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $PackageDir | Out-Null

$CopiedFiles = @()

foreach ($RelativePath in $FilesToCopy) {
  $Source = Join-Path $Root $RelativePath
  if (-not (Test-Path $Source)) {
    throw "No se encontró archivo requerido: $RelativePath"
  }

  $Target = Join-Path $PackageDir $RelativePath
  $TargetDir = Split-Path -Parent $Target
  New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null
  Copy-Item -Path $Source -Destination $Target -Force
  $CopiedFiles += $Target
}

$ChecksumFile = Join-Path $PackageDir "CHECKSUMS.sha256"
$ChecksumLines = @()

foreach ($FilePath in ($CopiedFiles | Sort-Object)) {
  $Hash = (Get-FileHash -Algorithm SHA256 -Path $FilePath).Hash.ToLowerInvariant()
  $Rel = [IO.Path]::GetRelativePath($PackageDir, $FilePath).Replace("\", "/")
  $ChecksumLines += "$Hash  $Rel"
}

Set-Content -Path $ChecksumFile -Value $ChecksumLines -Encoding UTF8

if (Test-Path $ZipPath) {
  Remove-Item -Path $ZipPath -Force
}

Compress-Archive -Path $PackageDir -DestinationPath $ZipPath -CompressionLevel Optimal

$PackageDirRel = [IO.Path]::GetRelativePath($Root, $PackageDir).Replace("\", "/")
$ZipPathRel = [IO.Path]::GetRelativePath($Root, $ZipPath).Replace("\", "/")

Write-Host "Paquete generado correctamente:"
Write-Host "- Carpeta: $PackageDirRel"
Write-Host "- ZIP: $ZipPathRel"
