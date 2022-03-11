@echo off
setlocal enabledelayedexpansion
SET OUTPUTFILE="..\tools\tool-use-case-selector\use-case-selector\src\app\_files\use-cases.json"
SET COUNT=0

CD ..\use-cases\

FOR /R %%I in (*.json) do (
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    
    SET COUNT=1
    SET file=%%~dpnI.json 
    REM echo %file%
    type %%~dpnI.json >> %OUTPUTFILE%
)

echo ] >> %OUTPUTFILE%

CD ..\tools\