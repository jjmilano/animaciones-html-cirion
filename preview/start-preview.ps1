$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$port = 8000
$url = "http://127.0.0.1:$port/preview/"

$existing = Get-CimInstance Win32_Process -Filter "Name = 'python.exe'" |
  Where-Object { $_.CommandLine -like "*http.server $port*" -and $_.CommandLine -like "*Animaciones HTML Cirion*" }

if (-not $existing) {
  Start-Process python -ArgumentList "-m http.server $port" -WorkingDirectory $projectRoot | Out-Null
  Start-Sleep -Seconds 2
}

Start-Process $url | Out-Null
Write-Host "Preview disponible en $url"
