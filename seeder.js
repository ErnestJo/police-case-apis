const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models

const Case = require('./models/Case');
const Accuser = require('./models/Accuser');
const InvestigationReport = require('./models/InvestigationReport');
// const Review = require('./models/Review');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const cases = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/case.json`, 'utf-8')
);


const accusers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/accuser.json`, 'utf-8')
);

const investigationReports = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/investigationReport.json`, 'utf-8')
);

// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
// );

// Import into DB
const importData = async () => {
  try {
    await Case.create(cases);
    await Accuser.create(accusers)
    await InvestigationReport.create(investigationReports);
    // await Review.create(reviews);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Case.deleteMany();
    await Accuser.deleteMany();
    await InvestigationReport.deleteMany();
    // await Review.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}