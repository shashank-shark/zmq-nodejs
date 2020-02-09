'use strict';

const fs = require ('fs');
const zmq = require ('zeromq');

const publisher = zmq.socket('pub');

const filename = 'target.txt';

fs.watch(filename, () => {

    publisher.send(JSON.stringify({
        type: 'changed',
        filename: filename,
        timestamp: Date.now()
    }));
});

publisher.bind('tcp://*:40040', (error) => {
    if (error) {
        throw Error(error);
    }

    console.log ('zmq is listening for subscribers');
});