const jayson = require('jayson');

const server = jayson.server({
  getCurrentTemperature: function(args, callback) {
    const temp = (Math.random() * (30 - 20) + 20).toFixed(2);
    callback(null, { value: temp, unit: "Celsius", timestamp: new Date().toLocaleTimeString() });
  },

toggleSmartLight: function(args, callback){
  const {roomName, brightness} = args;
  if (typeof roomName !== 'string' || typeof brightness !== 'number'){
    return callback({
      code: -32602,
      message: "Invalid params. Expected roomName (string) and brightness (number)"
    });
  }
  const message = `Light in ${roomName} set to ${brightness}%`;

  callback(null, {
    success: true,
    message
  });
}
});

server.http().listen(3000, () => {
  console.log("JSON-RPC Server running on port 3000");
});