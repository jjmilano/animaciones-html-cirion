@echo off
setlocal

set SCRIPT_DIR=%~dp0
powershell -ExecutionPolicy Bypass -File "%SCRIPT_DIR%package_handoff.ps1" %*

endlocal
