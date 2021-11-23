const bcrypt = require('bcrypt');
require('dotenv').config(); 

console.log(process.env.PASSWORD_LOGIN)
const comparar = bcrypt.compareSync('fponent132', process.env.PASSWORD_LOGIN);
console.log(comparar);