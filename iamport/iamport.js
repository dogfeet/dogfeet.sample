#!/usr/bin/env node

//Echo client program

var net = require('net');
var fs = require('fs');

var stime=new Date().getTime();
var done=0;

function tryToConnect( ip, port ){
    done++;

    var socket = net.createConnection(port, ip);

    socket.on('error', function(err){
        console.log( ip + ' ' + port );
    }).on('connect', function(connect) {
        socket.destroy();
    }).on('close', function(had_error){
        done--;

        if(done == 0 ){
            var etime=new Date().getTime();

            console.log( "elapsed(ms) " + (etime - stime) );
        }
    });
}

fs.readFile(process.argv[2], 'utf-8', function(err, data){
    var lines = data.split('\n');

    lines.forEach(function(line){
        var opts=line.match(/[0-9\.]+/g);

        if( opts && opts.length > 1 ) {
            tryToConnect(opts[0], opts[1]);
        } else {
            console.log(line);
        }
    });
});


