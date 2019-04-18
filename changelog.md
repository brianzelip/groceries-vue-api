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
