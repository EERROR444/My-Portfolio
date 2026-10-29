@echo off
set "PATH=%PATH%;d:\PROJECTS\git\cmd"
cd /d "d:\PROJECTS\portfolio"
echo ============================================================
echo   Pushing Aryan's Portfolio to GitHub (Aryan-demo/portfolio)
echo ============================================================
git push -u origin main
if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] Your portfolio has been pushed to GitHub!
    echo Visit: https://github.com/Aryan-demo/portfolio
) else (
    echo.
    echo [NOTE] If you haven't created the repository yet, please create it at:
    echo        https://github.com/new (Name: portfolio)
)
echo.
pause
