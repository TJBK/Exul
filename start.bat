@echo off
setlocal EnableExtensions DisableDelayedExpansion

title antiDenjo

echo ##########################################
echo                  starting
echo ##########################################

IF EXIST %cd%\node_modules (
    goto run
) ELSE (
    CALL npm run install
    goto run
)

:run
CALL npm run build
CALL npm run start

pause
