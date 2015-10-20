// Require the profile.js file (i.e. our custom module to retrieve profile information)
  // Note, the .js is optional, but the path is mandatory
var profile = require("./profile.js");

// Create a users variable based on the users that are entered upon running the application
  // i.e. in the console enter "node app.js [user1] [user2]"
var users = process.argv.slice(2);

// Run our get method to lookup our username
users.forEach(profile.get);