@echo off
set "PATH=%PATH%;d:\PROJECTS\git\cmd"
cd /d "d:\PROJECTS\portfolio"
echo ============================================================
echo   Pushing Aryan's Portfolio to GitHub (EERROR444/portfolio)
echo ============================================================
git push -u origin main
if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] Your portfolio has been pushed to GitHub!
    echo Visit: https://github.com/EERROR444/portfolio
) else (
    echo.
    echo [NOTE] If you haven't created the repository yet, please create it at:
    echo        https://github.com/new (Name: portfolio)
)
echo.
pause
