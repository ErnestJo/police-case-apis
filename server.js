const express = require('express');
const dotenv = require('dotenv');

//Route files
const cases = require('./routes/cases');

//load env vars
dotenv.config({  path: './config/config.env' });

const app = express();

//Mount router
app.use('/api/v1/cases', cases);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.PORT} mode on port ${PORT}`));