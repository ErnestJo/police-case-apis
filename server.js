const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');

//load env vars
dotenv.config({ path: './config/config.env' });

// connect to Database
connectDB();

//Route files
const cases = require('./routes/cases');
const accusers = require('./routes/accusers');
const investigationReports = require('./routes/investigationReports');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

const app = express();
  
// Body parser
app.use(express.json());


// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// To remove data, use:
app.use(mongoSanitize());

//helemt security header
app.use(helmet());

// Prevent scripts tags
app.use(xss());

// enable cors
app.use(cors());


//Mount router
app.use('/api/v1/cases', cases);
app.use('/api/v1/accusers', accusers);
app.use('/api/v1/investigationReports', investigationReports);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);



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