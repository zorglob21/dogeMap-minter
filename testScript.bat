@echo off
rem script to test the if the block number is correctly received from node and written in a file

rem Path to the file to write the message
set "FILE=WRITE FILEPATH HERE"

rem Check if the file exists, create it if it doesn't
if not exist "%FILE%" (
    type nul > "%FILE%"
)

rem Get the current block number
set "BLOCK_NUMBER=%~1"

rem Write the message to the file
echo New block number %BLOCK_NUMBER%! >> "%FILE%"