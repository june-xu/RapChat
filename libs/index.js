'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const action_handler = require('./action_handler.js');

const PAGE_ACCESS_TOKEN = "EAADndRHzHwoBANXzbdMnEGFD5oVJYzkiUVrVbnZCoM4JnXKiFtanGLvGLKMGDfXlMpIoshnq4W0qX9TgFMQByLXxcgUNpnf9vrpEE8kkYadBpbh3fPZA0PFGxaZAeZAImexfFVZABAkjUALLnGj9OzFwZBb5BNwSSvrZBUpu2sSZBwZDZD"

const rhyme = require('./rhyme.js')


app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'verify_token') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
// get request static data
// post data sed "waiting for response"
app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {

            let text = event.message.text
<<<<<<< Updated upstream

            rhyme.getRhyme(text, function(resp){
              console.log("Final x2: " + resp);
              sendTextMessage(sender, resp);
            })
=======
            action_handler.handleMessageReceive(sender, text);

>>>>>>> Stashed changes
        }
    }
    res.sendStatus(200)
})


//API call to FB chatbot
function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });
}
