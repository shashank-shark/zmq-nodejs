'use strict';

const fs = require('fs');

fs.watch('target.txt', () => console.log("file has changed"));

fs.watch('one.txt', () => console.log("file one has changed"));

fs.watch('two.txt', () => console.log("file two has changed"));


console.log("now watching file for changes");