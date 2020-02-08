#! /usr/bin/env node

'use strict';

const fs = require('fs');

const content = fs.readFileSync ('target.txt').toString('utf-8');

console.log(content);
