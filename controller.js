const nodemailer = require('nodemailer');
const Item = require('./Item');

exports.home = (req, res) => {
  res.send(`This is not the web page you're looking for`);
};

exports.getAllItems = async (req, res) => {
  // 1. query the database for a list of all items
  //   and sort them alphabetically by name
  // mongoose sort via https://stackoverflow.com/a/24461272/2145103
  const items = await Item.find().sort({ name: 'asc' });
  console.log('getAllItems fired!');
  res.json(items);
};

exports.submit = (req, res) => {
  console.log('submit fired!');
  console.log('req.body', req.body, '\nreq.route', req.route);

  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 3535,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: '"🧀 A&B Groceries 🍼" <holler@abbieandbrian.us>',
    to: 'bzelip@gmail.com',
    subject: 'grocery list',
    text:
      'Sorry, at the moment there is nothing to see here in the plain text version :(JSON.stringify(outputObj, null, 2)',
    html: '<h1>HELLO WORLD!</h1>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};
