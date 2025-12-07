const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');
const { SerialPort } = require('serialport')

let portArduino;

const DEFAULT_PORT = "COM6";

/**************************************************/
// UDP Params :
const udpHost = "0.0.0.0";
const udpPort = 41235;
/**************************************************/

const log = function(data) {
  const timeMySQL = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(timeMySQL + ": " + data);
}

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  const messageStr = msg.toString();
  log(`UDP received Str: ${messageStr} from ${rinfo.address}:${rinfo.port}`);
  
  if (portArduino) {
	  
	  portArduino.write(messageStr, (err) => {
		if (err) {
		  return console.log('Error on write: ', err.message)
		}
		console.log('message written')
	  })
	  
  } else {
		console.log('portArduino is null')
  }
  
  
});

server.on('listening', () => {
  const address = server.address();
  log(`server listening ${address.address}:${address.port}`);
});

server.bind(udpPort, udpHost);


/**************************************************/
// Serial port
/**************************************************/

setTimeout(

	async function() {
	  await SerialPort.list().then((ports, err) => {
		if (err) {
		  console.log(err.message);
		  return
		}

		let detectedCOMPort;

		console.log("ports.length", ports.length);
		
		if (ports.length > 0) {
			ports.forEach(port => {
				if (port.friendlyName.indexOf("Arduino") === 0) {
					detectedCOMPort = port.path;
				}
			});
		}
		
		// Si aucun Arduino détecté, on prend le port par défaut :
		if (! detectedCOMPort) {
			detectedCOMPort = DEFAULT_PORT ;
			console.log("port COM Arduino par défaut", detectedCOMPort);

		}
		else {
			console.log("port COM Arduino détecté", detectedCOMPort);
		}
		
		// Serial port
		portArduino = new SerialPort({
		  path: detectedCOMPort,
		  baudRate: 9600,
		}, (err) => {
		  if (err) {
			return console.log('Error: ', err.message)
		  }
		});
		
	  })
	}
	
, 2000);
