// Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser
// Solution: Use Node.js to connect to Treehouse's API to get the required information

// Require the http module so the API is available in our code
var http = require("http");

// Function to print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}

// Function to print out an error message
function printError(e) {
  console.error(e.message); // All error objects have a message property
}

// Organize our code in a module called "get"
function get(username) {
  // Connect to the API URL (http://teamtreehouse.com/username.json)
  var req = http.get("http://teamtreehouse.com/" + username + ".json", function(res) { // .json serves as an API endpoint
    // Create a body variable to concatenate the chunks of data as they come in
    var body = "";
    // Log the status code to the console
    console.dir(res.statusCode);
    // Add each "chunk" of data to the body variable as the stream emits "data" events
    res.on("data", function(chunk) {
      body += chunk;
    });
    // Log the full "body" to the console once the data stream emits the "end" event
    res.on("end", function() {
      // Check if the URL is found (i.e. status code is 200, rather than 404)
      if (res.statusCode === 200) {
        // Use the "try / catch" statement to handle parse errors
        try {
          // Parse the body data (i.e. transform it from a string into an object we can more easily manipulate)
          var profile = JSON.parse(body);
          // Print the message
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch (e) {
          // Print parse error message
          printError(e);
        }
      } else {
        // Print status error message
        printError({message: "There was an error getting the profile for " + username + ". (" +
                   http.STATUS_CODES[res.statusCode] + ")"});
      }
    });
  });

  // Connection error
    // Execute a callback when the "error" event is emitted by the system
  req.on("error", printError);
}

// For this module (i.e. profile.js), explicitly export a function called "get" which is the function we wrote called "get"
module.exports.get = get;