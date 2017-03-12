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
    var best_words = new Array();
    for (var i =0; i<5; i++) {
    	best_words.push(json_body[i].word);
    }
    console.log(json_body[0].word);

    return callback(best_words);
  });
}

/*
 * keywords - array of 5 words to find lyrics with
*/
function getLyric(keywords){
  let URL_BASE = "https://api.musixmatch.com/ws/1.1/track.search?apikey=9069370fe2eecd2d9b2875bb43c5e22f&format=jsonp&callback=callback&quorum_factor=1&f_music_genre_id=18&q_lyrics="

  for(var x = 0; keywords.length; i++){
    request(URL_BASE + keywords[i], function (error, response, body) {
      var jsonResp = JSON.parse(body);

      var lyricID = jsonResp.body.track_list[0].track.lyrics_id;

      console.log("Lyric ID: " + lyricID);

      return queryLine(lyricID);
    });
  }
}

function queryLine(id){
  let URL_BASE = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=9069370fe2eecd2d9b2875bb43c5e22f&format=jsonp&callback=callback&track_id="

  request(URL_BASE + id, function (error, response, body) {
    let jsonResp = JSON.parse(body);

    let lyrics = jsonResp.body.lyrics.lyrics_body;

    return lyrics;
  });

}

// text is the last word
function getRhyme(text) {
  getRhymezone(text, function(response) {
      return getLyric(response);
  });
}

module.exports = {
    getRhymezone : getRhymezone
    getRhyme : getRhyme
};
