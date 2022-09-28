@echo off
setlocal enabledelayedexpansion

SET OUTPUTDIR=%CD%

SET OUTPUTFILE="%OUTPUTDIR%\tool-use-case-selector\src\app\_files\use-cases.json"
SET COUNT=0

:use-cases
CD ..\use-cases\

REM FOR %%I in (*.json) do (    
REM     IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
REM     SET COUNT=1
REM     echo %OUTPUTFILE%
REM     type %%I >> %OUTPUTFILE%
REM )

REM echo ] >> %OUTPUTFILE%

call :processTreeUC
echo ] >> %OUTPUTFILE%
goto :eofUC

:processTreeUC
FOR %%I in (*.json) do (
    REM echo %%I
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
)
for /D %%d in (*) do (
    echo %%d
    cd %%d
    IF %%d NEQ rejected call :processTreeUC
    cd ..
)
exit /b

:eofUC
copy %OUTPUTFILE% "C:\sources\CDS-M\CDS-M\tools\tool-ict-selector\src\app\_files\

:authentications
SET OUTPUTFILE="..\tools\tool-use-case-selector\src\app\_files\authentications.json"
SET COUNT=0

CD ..\authentication\

FOR %%I in (*.json) do (    
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
)

echo ] >> %OUTPUTFILE%

copy %OUTPUTFILE% "C:\sources\CDS-M\CDS-M\tools\tool-ict-selector\src\app\_files\

:processing
SET OUTPUTFILE="..\tools\tool-use-case-selector\src\app\_files\processing.json"
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

copy %OUTPUTFILE% "C:\sources\CDS-M\CDS-M\tools\tool-ict-selector\src\app\_files\

:archiving
SET OUTPUTFILE="..\tools\tool-use-case-selector\src\app\_files\archiving.json"
SET COUNT=0

CD ..\archive\

FOR %%I in (*.json) do (    
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
)

echo ] >> %OUTPUTFILE%

copy %OUTPUTFILE% "C:\sources\CDS-M\CDS-M\tools\tool-ict-selector\src\app\_files\

:transport
SET OUTPUTFILE="..\tools\tool-use-case-selector\src\app\_files\transport.json"
SET COUNT=0

CD ..\transport\

FOR %%I in (*.json) do (    
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
)

echo ] >> %OUTPUTFILE%

copy %OUTPUTFILE% "C:\sources\CDS-M\CDS-M\tools\tool-ict-selector\src\app\_files\

:conflicts
SET OUTPUTFILE="..\tools\tool-use-case-selector\src\app\_files\conflicts.json"
SET COUNT=0

CD ..\conflicts\

FOR %%I in (*.json) do (    
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    SET COUNT=1
    type %%I >> %OUTPUTFILE%
)

echo ] >> %OUTPUTFILE%

copy %OUTPUTFILE% "C:\sources\CDS-M\CDS-M\tools\tool-ict-selector\src\app\_files\

:standards
CD ..\tools\
SET OUTPUTDIR=%CD%

SET OUTPUTFILE="%OUTPUTDIR%\tool-ict-selector\src\app\_files\standards.json"

SET COUNT=0
CD ..\standards\

call :processTree
echo ] >> %OUTPUTFILE%
goto :eof

:processTree
REM echo %CD%
FOR %%I in (*.json) do (
    IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)
    REM echo "IF !COUNT! == 0 (echo [ > %OUTPUTFILE%) ELSE (echo , >> %OUTPUTFILE%)"
    SET COUNT=1
    REM echo !COUNT!
    type %%I >> %OUTPUTFILE%
    REM echo "type %%I >> %OUTPUTFILE%"
)
for /D %%d in (*) do (
    cd %%d
    call :processTree
    cd ..
)
exit /b

copy ..\tools\tool-ict-selector\src\app\_files\* ..\tools\tool-use-case-shop\src\app\_files\

CD ..\tools\