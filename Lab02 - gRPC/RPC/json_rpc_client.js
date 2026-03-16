const jayson = require('jayson');
const client = jayson.client.http({ port: 3000 });

console.log("--- Smart Home Controller ---");


client.request('toggleSmartLight',{ roomName: 'Living Room', brightness: 75}, (err, response) => {
    if (err) return console.error(err);
    console.log(response.result.message);
  }
);