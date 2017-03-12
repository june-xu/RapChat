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
      try{
    	   best_words.push(json_body[i].word);
      }catch(err){
        console.log(err);
      }
    }
    console.log(best_words);

    return callback(best_words);
  });
}

/*
 * keywords - array of 5 words to find lyrics with
*/
function getLyric(keywords, callback){
  console.log("getLyric: " + keywords);

  let URL_BASE = "https://api.musixmatch.com/ws/1.1/track.search?apikey=9069370fe2eecd2d9b2875bb43c5e22f&format=jsonp&callback=callback&quorum_factor=1&f_music_genre_id=18&page_size=1&q_lyrics="

  console.log(keywords[0]);

  //for(var i = 0; keywords.length; i++){
    request(URL_BASE + keywords[0], function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      body = body.substring(9, body.length -2);
      console.log(body);

      var jsonResp = JSON.parse(body);

      var lyricID = jsonResp.message.body.track_list[0].track.track_id;

      console.log("Lyric ID: " + lyricID);

      queryLine(lyricID, function(resp){
        console.log("Lyrics Resp: " + resp);
        return callback(resp);
      });
    });
  //}
}

function queryLine(id, callback){
  //id = 16357186;

  let URL_BASE = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=9069370fe2eecd2d9b2875bb43c5e22f&format=jsonp&callback=callback&track_id="
  console.log("queryline: " + URL_BASE + id);

  request(URL_BASE + id, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    console.log(body);
    body = body.substring(9, body.length -2);
    let jsonResp = JSON.parse(body);

    let lyrics = jsonResp.message.body.lyrics.lyrics_body;
    console.log("Lyrics: " + lyrics);

    return callback(lyrics);
  });

}

// text is the last word
function getRhyme(text, callback) {
  getRhymezone(text, function(response) {
      getLyric(response, function(resp){
        console.log("Final: " + resp);
        return callback(resp);
      });
  });
}

module.exports = {
    getRhymezone : getRhymezone,
    getRhyme : getRhyme
};
