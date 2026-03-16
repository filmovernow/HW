const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'monitor.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const cryptoProto = grpc.loadPackageDefinition(packageDefinition).crypto;

const streamPrices = (call) => {
    console.log("Client connected to BTC price streaming...");
    
    const interval = setInterval(() => {
        const price = (Math.random() * (50000 - 30000) + 30000);
        call.write({
            value: Number(price),
        });
    }, 500);

    call.on('cancelled', () => {
        console.log("Streaming cancelled by client.");
        clearInterval(interval);
    });
};

function main() {
    const server = new grpc.Server();
    server.addService(cryptoProto.CryptoService.service, {
        StreamPrices: streamPrices
    });
    
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return console.error(err);
        console.log(`Server running at http://0.0.0.0:${port}`);

    });
}

main();