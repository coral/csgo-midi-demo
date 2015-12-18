#csgo-midi-demo

This is a simple example of how to take incomming CSGO JSON payload and convert to RTP-MIDI messages (MIDI over IP standard).
It's a very rudimentary sketch so use it only as a starting point for figuring out the flow of the process.
This project uses the [KissBox CM-MIDI](http://www.kissbox.nl/products_midi.html) boxes and has control messages for it. You can probably use any RTP-MIDI box however.

To start:

- Clone this repo
- npm install
- Configure IP and Port to the [KissBox CM-MIDI](http://www.kissbox.nl/products_midi.html) in index.js
- Configure your game state integration as described on [Valve Wiki](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration)
- node index.js
- Run CS:GO and watch the MIDI box send on planted bomb events.