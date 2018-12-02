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
};

// exports.outputGroceryList = (req, res) => {
//   const items = req.body.groceryListData.items;
//   const stores = req.body.groceryListData.stores;
//   const emailTo = req.body.emailTo;

//   function itemsAtAStore(obj, storeName) {
//     let storeItems = Object.keys(obj).filter(
//       prop => obj[prop].store === storeName
//     );

//     let storeItemsWithLocation = storeItems
//       .filter(item => obj[item].storeArea !== undefined)
//       .sort((a, b) => obj[a].storeArea - obj[b].storeArea);

//     let storeItemsWithNoLocation = storeItems
//       .filter(item => obj[item].storeArea === undefined)
//       .sort();

//     let sortedStoreItems = storeItemsWithLocation.concat(
//       storeItemsWithNoLocation
//     );

//     return sortedStoreItems;
//   }

//   function itemsWithOutAStore(obj) {
//     return Object.keys(obj).filter(prop => obj[prop].store === undefined);
//   }

//   let storesHTML =
//     stores.length > 0
//       ? stores
//         .map(
//           store =>
//             `${createStoreListHtml(
//               store,
//               itemsAtAStore(items, store),
//               items
//             )}`
//         )
//         .join('')
//       : '';

//   let noStoresHTML =
//     itemsWithOutAStore(items).length > 0
//       ? createNoStoreListHtml(itemsWithOutAStore(items), items)
//       : '';

//   function createNoStoreListHtml(arrayOfItemsWithNoStore, dataObj) {
//     return `
//       <h1 style="font-size: 1.25rem; font-weight: 400;">other</h1>
//       <ol style="margin-bottom: 2rem; padding-left: 0; list-style: none;">
//         ${arrayOfItemsWithNoStore
//         .map(
//           itemName => `
//           <li>
//             <input type="checkbox" value="${itemName}" id="${itemName}" name="item">
//             <label for="${itemName}">${itemName}${
//             dataObj[itemName].qty ? ` (x${dataObj[itemName].qty})` : ''
//             }</label>
//           </li>
//         `
//         )
//         .join('')}
//       </ol>
//     `;
//   }

//   function createStoreListHtml(
//     storeName,
//     arrayOfItemNamesAtStoreName,
//     dataObj
//   ) {
//     return `
//       <h1 style="font-size: 1.25rem; font-weight: 400;">${h.stores[
//         storeName
//       ].name.toLowerCase()}</h1>
//       <ol style="margin-bottom: 2rem; padding-left: 0; list-style: none;">
//         ${
//       storeName === 'tj' || storeName === 'moms'
//         ? arrayOfItemNamesAtStoreName
//           .map(
//             itemName => `
//                     <li>
//                       <input type="checkbox" value="${itemName}" id="${itemName}" name="item">
//                       <label for="${itemName}">${itemName}${
//               dataObj[itemName].qty ? ` (x${dataObj[itemName].qty})` : ''
//               }</label>
//                     </li>
//                   `
//           )
//           .join('')
//         : arrayOfItemNamesAtStoreName
//           .map(
//             itemName => `
//             <li>
//               <input type="checkbox" value="${itemName}" id="${itemName}" name="item">
//               <label for="${itemName}">${itemName}${
//               dataObj[itemName].qty ? ` (x${dataObj[itemName].qty})` : ''
//               }</label>
//             </li>
//           `
//           )
//           .join('')
//       }
//       </ol>
//     `;
//   }

//   let emailOutput = storesHTML + noStoresHTML;

//   const transporter = nodemailer.createTransport({
//     host: 'smtpout.secureserver.net',
//     port: 3535,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   let mailOptions = {
//     from: '"🧀 A&B Groceries 🍼" <holler@abbieandbrian.us>',
//     to: emailTo,
//     subject: 'grocery list',
//     text:
//       'Sorry, at the moment there is nothing to see here in the plain text version :(JSON.stringify(outputObj, null, 2)',
//     html: emailOutput
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);
//   });

//   res.render('groceryList', {
//     formData: req.body,
//     emailOutput
//   });
// };
