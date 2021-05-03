const express = require('express');
const dotenv = require('dotenv');
const http = require('http');


//load env vars
dotenv.config({  path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.PORT} mode on port ${PORT}`));