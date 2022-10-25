@echo off
setlocal enabledelayedexpansion

SET OUTPUTDIR=%CD%

SET OUTPUTFILE="%OUTPUTDIR%\tool-use-case-shop\src\app\_files\use-cases.json"
SET COUNT=0

:use-cases
CD ..\use-cases\

call :processTreeUC
echo ] >> %OUTPUTFILE%
goto :authentications

:processTreeUC
FOR %%I in (*.json) do (
    REM echo %%I
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
)
for /D %%d in (*) do (
    REM echo %%d
    cd %%d
    IF %%d NEQ rejected call :processTreeUC
    cd ..
)
exit /b

:authentications
SET OUTPUTFILE="..\tools\tool-use-case-shop\src\app\_files\authentications.json"
SET COUNT=0
CD ..\authentication\

FOR %%I in (*.json) do (    
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
)

echo ] >> %OUTPUTFILE%

:processing
SET OUTPUTFILE="..\tools\tool-use-case-shop\src\app\_files\processing.json"
SET COUNT=0
CD ..\processing\

FOR %%I in (*.json) do (    
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
)

CD ..\certificates\

FOR %%I in (*.json) do (    
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
)

echo ] >> %OUTPUTFILE%

:archiving
SET OUTPUTFILE="..\tools\tool-use-case-shop\src\app\_files\archiving.json"
SET COUNT=0

CD ..\archive\

FOR %%I in (*.json) do (   
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
)

echo ] >> %OUTPUTFILE%

:transport
SET OUTPUTFILE="..\tools\tool-use-case-shop\src\app\_files\transport.json"
SET COUNT=0

CD ..\transport\

FOR %%I in (*.json) do (  
    REM echo %%I  
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
)

echo ] >> %OUTPUTFILE%

:conflicts
SET OUTPUTFILE="..\tools\tool-use-case-shop\src\app\_files\conflicts.json"
SET COUNT=0

CD ..\conflicts\

FOR %%I in (*.json) do (    
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
)

echo ] >> %OUTPUTFILE%

:standards
CD ..\tools\
SET OUTPUTDIR=%CD%

SET COUNT=0
CD ..\standards\

SET OUTPUTFILE="%OUTPUTDIR%\tool-use-case-shop\src\app\_files\standards.json"

call :processTree
echo ] >> %OUTPUTFILE%
goto :eof

:processTree
FOR %%I in (*.json) do (
    REM echo %%I
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
    REM echo "type %%I >> %OUTPUTFILE%"
)
for /D %%d in (*) do (
    cd %%d
    call :processTree
    cd ..
)
exit /b

CD ..\tools\