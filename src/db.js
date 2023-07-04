const Client = require('pg').Pool;
//connecting to postgres
const client = new Client({
    user:"postgres",
    host:"localhost",
    database:"usernameandpassword",
    password:"samyar1384",
    port:5432
});
module.exports = client
