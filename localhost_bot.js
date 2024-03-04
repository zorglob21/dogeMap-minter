    var bitcore = require('bitcore-lib-doge');
    var RpcClient = require('dogecoind-rpc');
    const request = require('request');
    const { exec } = require('child_process');

// set username and password appropriately, other parameters should be good by default but check them too

    var rpcConfig = {
      protocol: 'http',
      user: 'user', 
      pass: 'password',
      host: '127.0.0.1',
      port: '22555',
    };

  
    function rpcCall(method, params, callback) {
      const options = {
          url: `${rpcConfig.protocol}://${rpcConfig.user}:${rpcConfig.pass}` +
               `@${rpcConfig.host}:${rpcConfig.port}`,
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              jsonrpc: '1.0',
              id: 'curltest',
              method: method,
              params: params,
          }),
      };
  
      request(options, (error, response, body) => {
          if (error) {
              callback(error, null);
          } else {
              const jsonResponse = JSON.parse(body);
              callback(null, jsonResponse.result);
          }
      });
  }


function executeBatchScript(scriptName, argument) {
    return new Promise((resolve, reject) => {
        exec(`start ${scriptName} ${argument}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing ${scriptName}:`, error);
                reject(error);
            } else {
                console.log(`${scriptName} executed successfully.`);
                resolve();
            }
        });
    });
}

let currentBlockNumber;  

// Get current block number
function queryBlockNumber(){
rpcCall('getblockcount', [], (error, result) => {
  if (error) {
      console.error('Error:', error);
  } else {
      console.log('Current block number:', result);
      if(typeof currentBlockNumber === 'undefined'){currentBlockNumber = result}

      else if(currentBlockNumber != result){
        

        currentBlockNumber = result;
        numberToMintAdd2 = currentBlockNumber+2;
        numberToMintAdd3 = currentBlockNumber+3;
        numberToMintAdd4 = currentBlockNumber+4;
        numberToMintAdd5 = currentBlockNumber+5;
        console.log('new block number detected, executing mint for numbers : ',numberToMintAdd2);

       //execute bat script. You can pick either the current broadcasted number or the number +2, +3 etc to get a better success rate depending on fee, settings. It's challenging to the right block number since we have no control over what block the transaction will be mined in we can only make a guess. An other solutions is to broadcast several transactions each block in order to maximize chances to get a block right

        executeBatchScript('mintScript.bat', `${numberToMintAdd2}.dogemap`)
        /**.then(() => executeBatchScript('mintScript.bat', `${numberToMintAdd3}.dogemap`))
        .then(() => executeBatchScript('mintScript.bat', `${numberToMintAdd4}.dogemap`))
        .then(() => executeBatchScript('mintScript.bat', `${numberToMintAdd5}.dogemap`))*/
        .catch((error) => {
            console.error('Error executing batch scripts:', error);
        });
       
  }}

})}  

setInterval(queryBlockNumber, 3000);
