# cdm-to-serial
Listen UDP Messages and send them to Arduino-board serial port

Install "serialport" library : npm install

Run :
node path-to\UDP_to_serial.js

- Starts a UDP server
- Search for serial port with Arduino board
- Listen for messages (simple character) and send them via Serial port 

Install as a windows service with qckwinsvc2 :

install name="CDM_UDP_listener_to_SERIAL" description="CDM UDP listener to SERIAL"
qckwinsvc2 start name="CDM_UDP_listener_to_SERIAL"

qckwinsvc2 stop name="CDM_UDP_listener_to_SERIAL"
qckwinsvc2 uninstall name="CDM_UDP_listener_to_SERIAL"