const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');


//load env vars
dotenv.config({ path: './config/config.env' });

// connect to Database
connectDB();

//Route files
const cases = require('./routes/cases');



const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount router
app.use('/api/v1/cases', cases);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.PORT} mode on port ${PORT}`)
);

  // handle unhandle promise rejection
  process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    // close down the server
    server.close(() => process.exit(1));
  
  });