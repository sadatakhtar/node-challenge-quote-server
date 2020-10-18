// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("CYF's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get('/quotes', (req, res) => {
 res.json(quotes);
});

app.get('/quotes/random', (req, res) => {
 let randomNumber = [Math.floor(Math.random() * quotes.length)];
 res.send(quotes[randomNumber]);
 });

 app.get('/quote/search', (req, res) => {
  let termQ = req.query.term;
  for(let i=0; i< quotes.length -1; i++){
    if(quotes[i].quote.toLowerCase().includes(termQ)
     || quotes[i].author.toLowerCase().includes(termQ)){
      res.json(quotes[i].quote + " " + quotes[i].author);
    }
  }
  res.json([]);
})


app.get('/echo', (req, res)=> {
  let wordQ = req.query.word;
  res.json(`you searched for the word: ${wordQ}`);
});
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(9000, function () {
  console.log("Your app is listening on port 9000");
});
