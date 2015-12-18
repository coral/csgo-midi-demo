'use strict'

/**
* Configuration settings, change this:
*/

var config = {
    http_port: 3000,
    cmmidi_ip: "255.255.255.0",
    cmmidi_port: 5004
}

/**
* Module dependencies.
*/

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();

/**
* Load MIDI lib and setup with address to one CM-MIDI box
* In theory you shouldn't have to know the address to the CM-MIDI box but they did not reconnect gracefully so i send a reboot message to them on startup of the script.
*/

var midi = require('./midi.js')
midi.init(config.cmmidi_ip, config.cmmidi_port);


/**
* Setup of Express for handling incomming messages
*/

//Handle incomming JSON POST blobs
app.use(bodyParser.json());

//Accept everything because this is a demonstration!
app.post('*', function(req, res) {
    var data = req.body;

    //Check if we are not in warmup
    if(_.has(data, "map.phase") && data.map.phase != "warmup")
    {
        //Check if bomb was added to the round
        if(_.has(data.added, "round.bomb"))
        {
            //Check if bomb just got planted
            if(data.round.bomb == "planted")
            {
                //Emit MIDI note 10
                midi.send(10);

                //Log time bomb was planted
                var planttime =  Date.now();
                console.log("Bomb planted: ", planttime);
            }
        }
    }

    //Respond with 202 to make the CSGO client not hate us.
    res.status(202).json({status: "ok"});
});

/**
* Start express on the defined port
*/

var server = app.listen(config.http_port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server is listening");
});


