'use strict';

const netClinet = require ('net').connect({port: 40040});
const multipartMessageHandler = require('../lib/event-emitter-multipart.js').connect(netClinet)

multipartMessageHandler.on('message', message => {

    if (message.type === 'watching') {
        console.log (`wathcing the file "${message.file}" ...\n`)
    } else if (message.type === 'changed') {
        console.log (`file chnaged at "${new Date(message.timestamp)}"`);
    } else {
        throw Error ('Invalid message recieved');
    }
});