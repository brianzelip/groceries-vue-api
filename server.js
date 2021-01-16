const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' });

// Connect to our Database and handle any bad connections
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
  })
  .then(
    () => {
      console.log('DB CONNECTION SUCCESS!');
    },
    (err) => {
      console.error(`DATABASE CONNECTION ERROR → ${err.message}`);
    }
  );

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/', routes);

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
