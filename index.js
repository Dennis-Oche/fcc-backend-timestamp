// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:input", function(req, res) {
  let inputParam = req.params.input;
  console.log(inputParam + " // First step");

  let dateParam = new Date(inputParam);
  let dateString = dateParam.toString();

  console.log(dateString) // This is to check if dateString is valid.

  if (dateString === "Invalid Date") {
    if (new Date(Number(inputParam)).toString() === "Invalid Date") {      
      res.json({
        "error": "Invalid Date"
      })
    }

    dateParam = new Date(Number(inputParam));
  }

  console.log(dateParam);

  res.json({
    "unix": dateParam.getTime(),
    "utc": dateParam.toUTCString()
  });
});

// Your second API endpoint...
app.get("/api", function(req, res) {
  let dateStamp = new Date().getTime();
  let dateString = new Date().toUTCString();
  
  res.json({
    "unix": dateStamp,
    "utc": dateString
  })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
