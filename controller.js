const fs = require('fs');
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
  const recipients = req.body.recipients;
  //   const to = recipients.map(
  //     r => process.env[`${r.slice(0, 1).toUpperCase()}Z`]
  //   );
  const to = recipients; //this is a hack for rushing groceries-vue out the shipping door

  const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: '3535',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let mailOptions = {
    from: '"🤖 A&B Groceries 🍼" <holler@abbieandbrian.us>',
    to,
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
    console.log('Message sent!: %s', info.messageId);

    function addLeading0(n) {
      return n < 10 ? `0${n}` : `${n}`;
    }

    function quotes(d) {
      return typeof d === 'string' ? (d.includes(' ') ? `"${d}"` : d) : d;
    }
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const d = now.getDate();
    const h = now.getHours();
    const mn = now.getMinutes();
    const s = now.getSeconds();
    const date = `${y}-${addLeading0(m + 1)}-${addLeading0(d)}`;
    const time = `${addLeading0(h)}:${addLeading0(mn)}:${addLeading0(s)}`;

    const accepted = info.accepted;
    const rejected = info.rejected.length < 1 ? 'none' : info.rejected;
    const envelopeTime = info.envelopeTime;
    const messageTime = info.messageTime;
    const messageSize = info.messageSize;
    const response = info.response;
    const envelopeTo = info.envelope.to;
    const messageId = info.messageId;

    const entry = `${date}, ${time}, ${accepted}, ${quotes(
      rejected
    )}, ${envelopeTime}, ${messageTime}, ${messageSize}, ${quotes(
      response
    )}, ${envelopeTo}, ${messageId}\n`;

    fs.appendFile('./.data/emails.csv', entry, err => {
      if (err) throw err;
      console.log('email.log updated!');
    });
  });
};

exports.createItem = async (req, res) => {
  const item = new Item(req.body);
  await item
    .save()
    .then(createdItem => {
      console.log("newItem savedD! Here's the data:::\n\n", createdItem);
      return createdItem;
    })
    .then(createdItem => {
      res.send(createdItem);
    });
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
    { _id: req.params._id },
    cbHackToExecuteThisMongoMethodImmediately
  ).exec(); //tells mongoose explicitly to run this query
  console.log('item deleted!! Heres the deleted item _id:', req.params._id);
};
