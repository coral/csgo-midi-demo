var rtpmidi = require('rtpmidi');
var dgram = require('dgram');

var midi = {
    session: null,
    init: function(ip, port)
    {
        //Initialize the RTP-MIDI session
        this.session = rtpmidi.manager.createSession({   
            localName: "gameEvents",
            bonjourName: "server",
            port: port
        });

        //Create a UDP client
        var client = dgram.createSocket('udp4');
        var message = new Buffer([0xff, 0xff, 0x45, 0x44, 0x84]);

        // Send a reboot message to the predefined CM-MIDI box for it to reconnect
        client.send(message, 0, message.length, port, ip, function(err, bytes) {
            if (err) throw err;
            console.log('CM-MIDI reboot message sent to ' + ip +':'+ port);
            client.close();
        });
    },

    send: function(note)
    {
        //Send the paramteter "note" as NOTE ID with Velocity 127 over midi at Midi channel 1.
        session.sendMessage([0x90, note, 127]);
    }
}

module.exports = midi;