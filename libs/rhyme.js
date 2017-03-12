'use strict'

const request = require('request')

function getRhymezone(text, callback){
  console.log("Rhymezone: " + text);
  console.log("URL = " + "https://api.datamuse.com/words?rel_rhy=" + text );

  request("https://api.datamuse.com/words?rel_rhy=" + text, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    console.log('body text:', body); // Print the response
    var json_body = JSON.parse(body);
    var best_words = new Array(5);
    for (var i =0; i<5; i++) {
    	best_words.push(json_body[i].word);
    }
    console.log(json_body[0].word);

    return callback(best_words);
  });

}

module.exports = {
    getRhymezone: getRhymezone
};
