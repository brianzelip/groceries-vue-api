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
  const html = req.body.html;

  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: '3535',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: '"🤖 groceries-vue 💚" <holler@abbieandbrian.us>',
    to: 'bzelip@gmail.com',
    subject: 'grocery list',
    text: `Sorry, at the moment there is nothing to see here in the plain text version :( ${JSON.stringify(
      html,
      null,
      2
    )}`,
    html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

exports.createItem = async req => {
  const item = new Item(req.body);
  await item.save();
  console.log("newItem savedD! Here's the data:::\n\n", item);
};

exports.updateItem = async req => {
  const item = await Item.findOneAndUpdate({ _id: req.params._id }, req.body, {
    runValidators: true //tells findOneAndUpdate to run any required statements
    // on the form schema in the data model; ie in this case, the store name is
    // required so if someone submits an edit that removes the store name,
    // this option will run the validator to catch that problem (plus the trims)
  }).exec(); //tells mongoose explicitly to run this query
  console.log('item updated! Heres the saved data::::::', req.body);
};

exports.deleteItem = async req => {
  const cbHackToExecuteThisMongoMethodImmediately = () => {};
  // see https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete
  const item = await Item.findOneAndDelete(
    {
      _id: req.params._id
    },
    cbHackToExecuteThisMongoMethodImmediately
  ).exec(); //tells mongoose explicitly to run this query
  console.log('item updated! Heres the saved data::::::', req.body);
};
