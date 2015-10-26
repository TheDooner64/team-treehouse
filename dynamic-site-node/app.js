// This is the core application file that we run by typing "node app.js" in the console

// Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser
// Solution: Use Node.js to perform profile lookups and serve our template via HTTP
    // Connect to Treehouse's API to get the required information

// Require the "http" module
var http = require("http");
// Require (aka import) the router file we created (NOTE: must include the path to the file)
var router = require("./router.js");

// Create a web server
http.createServer(function (request, response) {
  // Include our "home" and "user" routes
  router.home(request, response);
  router.user(request, response);
}).listen(3000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:3000/');