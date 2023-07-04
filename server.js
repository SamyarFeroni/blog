const express = require('express');
const app = express();
const port = 4000 ; //Select the desired port
// Router for function express
const usersRouter = require('./src/users/router');
//for red json of body
const bodyParser = require('body-parser')

//for get all html files from view 
app.use(express.static('view'));
app.use(bodyParser.json());
app.use(express.json());

//for use routers for express
app.use("/", usersRouter)

//run web page on localhost and any port do you want
app.listen(port,()=>{
    console.log(`The server is running on port ${port}`);
})
