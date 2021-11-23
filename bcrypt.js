const bcrypt = require('bcrypt');
require('dotenv').config(); 
const encriptar = bcrypt.hashSync('1234', 12);
const comparar = bcrypt.compareSync('1234', process.env.PASSWORD_LOGIN);
console.log(comparar, encriptar);