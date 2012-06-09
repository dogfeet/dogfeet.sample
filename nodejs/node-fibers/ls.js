var fs = require('fs');

fs.readdir('.', function(err, fileNames){
    console.log('Found '+ fileNames.length+ ' files');

    // Stat each file
    fileNames.forEach(function(fileName){
        fs.stat( fileName, function(err, stat){
            console.log( fileName + ': '+ stat.size);
        });
    });
});



