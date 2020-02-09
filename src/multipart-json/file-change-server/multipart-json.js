'use strict';

const fs = require('fs');
const net = require('net');

const filename = 'target.txt';

if (!filename) {
    throw Error('file not found');
}

net.createServer(connection => {

   console.log('subscriber connected');
   connection.write(JSON.stringify({message : `Now watching the file "${filename}" ... for changes ...`}));

   const watcher = fs.watch(filename, () => {
       connection.write(JSON.stringify({type: 'changed', file: 'target.txt', timestamp: Date.now()}));
   });

   connection.on('close', () => {
       console.log ('subscriber disconnected');
       watcher.close();
   })

   connection.on('error', (err) => {
       console.log (err)
   });

}).listen(40040, () => console.log ('server started watching the file for changes'));