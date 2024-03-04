@echo off

rem Get the current block number
set "HEXADECIMAL_CODE=%~1"

rem echo node . mint DRdbYcc7Z4d3mwk9ZoMRkG4vCwLvStoGFR "text/plain;charset=utf-8" %HEXADECIMAL_CODE%
node . mint DRdbYcc7Z4d3mwk9ZoMRkG4vCwLvStoGFR "text/plain" %HEXADECIMAL_CODE%

