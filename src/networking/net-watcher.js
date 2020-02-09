'use strict';

const fs = require ('fs');
const net = require ('net');

const filename = 'target.txt';

if (!filename) {
    throw Error('Error : No filename specified')
}

net.createServer(connnection => {
    console.log ('Subscriber Connected');
    connnection.write (`Now watching "${filename}" for changes ... \n`);


    // setup the watcher
    const watcher = fs.watch (filename, () => {
        connnection.write (`File Changed : "${new Date()}" \n`);
    });

    // cleanup
    connnection.on ('close', () => {
        console.log ('Subscriber disconnected');
        watcher.close();
    });

    // handle errors
    connnection.on('error', (err) => {
        connnection.write(err);
        throw Error(err);
    });

}).listen(40040, () => console.log ('Listening for subscribers'));