let lastBlockNumber = null;

function queryBlockNumber() {
    fetch('https://rpc.coinsdo.net/doge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'getblockcount',
            params: [],
            id: 1
        })
    })
    .then(response => response.json())
    .then(data => {
        let currentBlockNumber = data.result;
        console.log('Current Dogecoin block number:', currentBlockNumber);
        
        let myString = currentBlockNumber+'.dogemap';
        //let encoded = Buffer.from(myString).toString('hex');
        //const decoded = Buffer.from(encoded, 'hex').toString();

     

        if (lastBlockNumber !== null && lastBlockNumber !== currentBlockNumber) {
       //if (false) {
            console.log('Block number changed. Executing bat script...');
            console.log('string to write : '+myString);
            // Execute bat script in a separate window
            const { exec } = require('child_process');
            exec(`start mintScript.bat ${myString}`, (error, stdout, stderr) => {
                if (error) {
                    console.error('Error executing bat script:', error);
                    return;
                }
                console.log('Bat script executed successfully.');
            });
        }
        lastBlockNumber = currentBlockNumber;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Call queryBlockNumber initially
queryBlockNumber();

// Set interval to call queryBlockNumber every 2 seconds
setInterval(queryBlockNumber, 2000);
