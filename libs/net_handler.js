const request = require('request');

// Token used to send messages.
const AUTH_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// States for control flow to determine what message is sent
const State = {
    INITIAL: 0, // The server is waiting search selection (ie product or recipe)
    ANSWERED_RHYME: 1,     // The server is waiting product search
    ANSWERED_CONTEXT: 2, 
    COMPLETE: 3 // The server is waiting recipe search
};

// A dictionary of the state for each user, where key in the user ID,
// and the value is the state of the user (see above). If the user is not in the
// dictionary, it implies the user is idle or has not picked a search type.
var userStates = {};

//before a message is sent, checks to see if user is in dictionary
// if user is in dictionary, increments the state, otherwise,
// adds the user with the initial state. State is reset when
// state exceeds 3 (COMPLETE)
function updateUserState(sender, userStates){
    if (sender in userStates) { //obj.hasOwnProperty("key") // true
        if (userStates[sender]<COMPLETE) {
            userStates[sender] = userStates[sender]+1;
        } else {
            userStates[sender] = INITIAL;
        }
        return userStates[sender];
    }
    else {
        userStates.sender = 0;
        return 0;
    }
}


module.exports = {
    updateUserState: updateUserState,
    State: State,
    userStates: userStates,
    sendFBRequest: sendFBRequest
};