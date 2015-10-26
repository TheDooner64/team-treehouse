// This file handles the reading of files and merges the values into our templates

// Require the fs, or filesystem, module
var fs = require("fs");

// Function to merge values
function mergeValues(values, content) {
  // Cycle over the keys
  for (var key in values) {
    // Replace all {{key}} with the values from the values object
    content = content.replace("{{" + key + "}}", values[key]);
  }
  // return merged content
  return content;
}

// Function to insert values into the specified template
function view(templateName, values, response) {
  // Read from the template files using readFileSync, the synchronous / blocking version of the function
  var fileContents = fs.readFileSync("./views/" + templateName + ".html", {encoding: "utf8"});
  // Insert values into the content
  fileContents = mergeValues(values, fileContents);
  // Write out the content to the response
  response.write(fileContents);
}

// Export the view function
module.exports.view = view;