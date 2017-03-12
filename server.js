var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://christmas-carol-words.com/song-23-deck-the-halls.shtml';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, artist, lyrics;
      var json = {title: "", lyrics : ""};

      $('.song-body').each(function(){
        var data = $(this);
        title = data.children().first().text();
        
        
        json.title = title;
        
      })



      $('.song-body').filter(function(){
        var data = $(this);

        lyrics = data.text().replace('\r', "");
        lyrics = lyrics.replace(/[&\/\\\r\n#,+()$~%.'":*?<>{}]/g, '');
        lyrics = lyrics.replace("Listen to sample  buy music »", '');
        
        json.lyrics = lyrics;
       //lyrics = lyrics.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;