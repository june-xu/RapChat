'use strict'

const request = require('request')

function getRhymes(text){
  console.log("Rhyme: " + text);

  return getRhymezone(text);
}

function getRhymezone(text){
  console.log("Rhymezone: " + text);

  console.log("URL = " + "https://api.datamuse.com/words?rel_rhy=" + text );
  request("https://api.datamuse.com/words?rel_rhy=" + text, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    console.log('body text:', body); // Print the response

    return body;
  });

}

module.exports = {
    getRhymes: getRhymes
};
