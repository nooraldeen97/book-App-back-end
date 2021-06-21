'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const server = express();
server.use(cors());

const PORT = process.env.PORT;


//localhost:3001/test
server.get('/test',(req,res)=>{
    res.send(`its working fine :)))`);
})







server.listen(PORT,()=>{
    console.log(`listening to the port ${PORT}`);
});