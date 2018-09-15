// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function convertDate(date) {
  return new Date(date);
}

app.get("/api/timestamp/:dateString" , (req, res) => {
  let dateString = String(req.params.dateString);
  let arr = dateString.split('-');
  let date;

  if ( arr.length == 1 ) {
    date = parseInt( dateString );
    let result = convertDate(date);
    res.json({ 
      unix: result.getTime(),
      utc: result.toUTCString()
     })
  }

  if ( arr.length > 1 ) {
    let result = convertDate(date);
    res.json({ 
      unix: result.getTime(),
      utc: result.toUTCString()
     })
  }

  if ( arr.length == 0 ) {
    let result = new Date();
    res.json({ 
      unix: result.getTime(),
      utc: result.toUTCString()
     })
  }
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});