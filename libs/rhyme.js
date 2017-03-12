'use strict'

const request = require('request')

function getRhymes(text){
  console.log("Rhyme: " + text);

  return getRhymezone(text);
}

function getRhymezone(text){
  console.log("Rhymezone: " + text);

  String url = "https://api.datamuse.com/words?rel_rhy=" + text

  var text = "";

  request(url, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the response
    text = body;
  });

  return text;

}

module.exports = {
    getRhymes: getRhymes
};
