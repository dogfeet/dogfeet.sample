var Future = require('fibers/future'), wait = Future.wait;
var fs = require('fs');

// This wraps existing functions assuming the last argument of the passed
// function is a callback. The new functions created immediately return a
// future and the future will resolve when the callback is called (which
// happens behind the scenes).
var readdir = Future.wrap(fs.readdir);
var stat = Future.wrap(fs.stat);

Fiber(function() {
    // Get a list of files in the directory
    var fileNames = readdir('.').wait();
    console.log('Found '+ fileNames.length+ ' files');

    // Stat each file
    var stats = [];
    for (var ii = 0; ii < fileNames.length; ++ii) {
        stats.push(stat(fileNames[ii]));
    }
    wait(stats);

    // Print file size
    for (var ii = 0; ii < fileNames.length; ++ii) {
        console.log(fileNames[ii]+ ': '+ stats[ii].get().size);
    }
}).run();
