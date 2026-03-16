const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'monitor.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const cryptoProto = grpc.loadPackageDefinition(packageDefinition).crypto;

function main() {
    const client = new cryptoProto.CryptoService(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );

    console.log("--- Listening to BTC Price Stream ---");
    const call = client.StreamPrices({});

    call.on('data', (response) => {
        console.log(`Current BTC Price: ${response.value}`);
    });

    call.on('error', (err) => {
        console.error("Stream Error:", err);
    });

    call.on('end', () => {
        console.log("Stream ended.");
    });
}
main();