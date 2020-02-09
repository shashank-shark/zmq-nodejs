'use strict';

const fs = require('fs');
const net = require ('net');

const filename = 'target.txt';

if (!filename) {
    throw Error('File not found');
}

net.createServer(connection => {

    console.log ('Subscriber connected');
    connection.write(`Now watching file "${filename}" for changes ...\n`);

    const watcher = fs.watch(filename, () => {
        connection.write(JSON.stringify( {type : 'changed', timestamp : Date.now()} ) + '\n');
    });

    connection.on('close', () => {
        console.log('Subscriber disconnected');
        watcher.close(); 
    });

    connection.on('error', (error) => {
        console.log(error);
    });

}).listen(40040, () => console.log ('Server is ready and is listening for file changes'));

