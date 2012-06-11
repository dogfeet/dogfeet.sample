#!/usr/bin/env node

//Echo client program

var net = require('net');
var fs = require('fs');
var Future = require('fibers/future'), wait = Future.wait;

var stime=new Date().getTime();

function tryToConnect( ip, port, callback ){

    var socket = net.createConnection(port, ip);

    socket.on('error', function(err){
        console.log( ip + ' ' + port );
        callback(err, null);
    }).on('connect', function(connect) {
        socket.destroy();
        callback(null, connect);
    });
}

var connect = Future.wrap( tryToConnect );
var readFile = Future.wrap( fs.readFile, 2 );

Fiber(function(){
    var data = readFile(process.argv[2], 'utf-8').wait();
    var lines = data.split('\n');
    var jobs = [];

    lines.forEach(function(line){
        if( line.trim().length < 1 ) return;

        var opts=line.match(/[0-9\.]+/g);

        if( opts && opts.length > 1 ) {
            jobs.push( connect(opts[0], opts[1]) );
        } else {
            console.log(line);
        }
    });

    wait(jobs);

    var etime=new Date().getTime();

    console.log( "elapsed(ms) " + (etime - stime)/1000 );
}).run();


