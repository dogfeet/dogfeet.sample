#!/usr/bin/env node

//Echo client program

function tryToConnect( ip, port ){
    port=parseInt(port);

    console.log([ip, port]);
}

var fs = require('fs');

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

