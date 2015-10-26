// This router file will control all of the routes for our application

// Require the querystring module
var querystring = require("querystring");

// Require the profile and renderer files we created
var Profile = require("./profile.js");
var renderer = require("./renderer.js");

// Store our common headers in a variable for convenience
  // We need to define the content-type as text/HTML so the browser knows how to interpret the files
var commonHeaders = {'Content-Type': 'text/HTML'};

// Handle HTTP route GET / && POST (i.e. home path)
function home(request, response) {
  // If URL == "/" && GET
    // Check if the url property of the incoming request is the home path
  if (request.url === "/") {
    if (request.method.toLowerCase() === "get") {
      // Show the search field
      response.writeHead(200, commonHeaders);
      // Since we used the synchronous version of readFile, each of these commands will "block"
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {
      // Else if URL == "/" && POST
        // Get the POST data from the body (i.e. the piece of the response that is hidden away)
        request.on("data", function(postBody) {
          // Extract the username
            // Convert the "buffer" to a string
            // Parse the string using querystring, which turns the string into a JSON object
          var query = querystring.parse(postBody.toString());
          // Redirect to /:username
            // The 303 status code forces a GET request to the new URL even if original request was a POST
            // Instead of content-type, we want to use location to redirect it
          response.writeHead(303, {"Location": "/" + query.username });
          // End the response
          response.end();
      });
    }
  }
}

// Handle HTTP route for GET / :username i.e. /chalkers
function user(request, response) {
  // If URL == "/..." (i.e. if the URL includes anything after the home path)
  var username = request.url.replace("/", "");
  // Check that a username exists
  if (username.length > 0) {
    response.writeHead(200, commonHeaders);
    renderer.view("header", {}, response);

    // Get the JSON file from Treehouse based on the username entered
    var studentProfile = new Profile(username);
    // When the JSON body is fully recieved the "end" event is triggered and the full body is given to the handler or callback
    studentProfile.on("end", function(profileJSON) {
      // Show the profile
      // Store the values which we need from the JSON file
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      };
      // Send a response using the values of the response form the JSON profile
      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      response.end();
    });

    // If a parsing, network or HTTP error occurs an error object is passed in to the handler or callback
    studentProfile.on("error", function(error) {
      // Show the error page
      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });
  }
}

// Export the route functions
module.exports.home = home;
module.exports.user = user;