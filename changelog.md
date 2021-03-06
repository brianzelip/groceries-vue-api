# changelog\*

\* a personal take

This document started at v0.5.0.

1. Update a record in the database with data from the [front end](https://github.com/brianzelip/groceries-vue)

   - starting point: v0.5.0
   - starting branch name: update-item
   - ending point: v0.6.0
   - steps:
     - new route
     - new controller

2. Delete an item in the database via the front end

   - starting point: v0.6.0
   - starting branch: delete-item
   - ending point: v0.7.0
   - steps:
     - new route
     - new controller

3. Send submitted grocery list to the correct email addresses

   - starting point: v0.7.0
   - starting branch: handle-email-data
   - ending point: v0.8.0
   - steps:
     - handle email data passed from front end

4. Send created item info response on `post('/create')`

- starting point: v0.8.0
- starting branch: respond-to-post-create
- ending point: v0.9.0
- steps:
  - send response back before ending create controller

5. Allow for user-input email address on the front end

- starting point: v0.9.0
- ending point: v0.10.0
- branch (via github.com not local): custom-email-hack
- steps: update controller.js

**NOTE**: This was a hack job, and needs to be cleaned up!

6. Log all emails sent

- starting point: v0.10.0
- ending point: v0.11.0
- branch: log-emails-sent
- steps:
  - update controller
  - create a file to hold this data - since I'm relying on Glitch.com to publish this api, I need to follow suit with what they do...which is provide a secret `/.data` folder where users can save data that others cannot see. So I need to create a .data folder in all of my local dev environments, and copy the log to the data folder, ALSO GITIGNORE .data/
  - the file created is .data/emails.csv

**NOTE**: I'm doing this since I opened up the flood gates by allowing a user to input an email address into a form and send it!

7. Remove the html view

- starting point: v0.11.0
- ending point: v0.12.0
- branch: remove-html
- steps: DELETE FILES! and make sure there's a server response that sends some text

8. Migrate DB, fix vulns, v0.13.0
