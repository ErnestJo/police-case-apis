const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
//error handler
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');


//load env vars
dotenv.config({ path: './config/config.env' });

// connect to Database
connectDB();

//Route files
const cases = require('./routes/cases');
const accusers = require('./routes/accusers');



const app = express();
  
// Body parser
app.use(express.json());


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount router
app.use('/api/v1/cases', cases);
app.use('/api/v1/accusers', accusers);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.PORT} mode on port ${PORT}`.yellow.bold)
);

  // handle unhandle promise rejection
  process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    // close down the server
    server.close(() => process.exit(1));
  
  });