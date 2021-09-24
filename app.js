const fs = require('fs')
const path = require('path')

fs.readdirSync(__dirname+'/try/').forEach(file => {
    console.log(file);
});