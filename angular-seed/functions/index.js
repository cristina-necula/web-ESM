const functions = require('firebase-functions');
var hash = require('object-hash');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//listen for events
exports.triggerSurvey = functions.database.ref('/sessions/{pushId}/events')
    .onWrite(event => {

        var events = event.data.val();
        var eventsLength = event.data.val().length;
        var tasks = [];

        for(var i = 0; i < eventsLength; i++){
            var task = {};
            task['type'] = events[i].type;
            task['tag'] = events[i].tag;
            task['containerActivity'] = events[i].containerActivityName;
            tasks.push(task);
        }

        var userKey = "cristinanecula-af757a33466c8452";

        for(var i = 0; i < eventsLength; i++) {
            var eventsSlice = tasks.slice(i, eventsLength);
            var eventsHash = hash(eventsSlice);
            admin.database().ref('/workflowsHash/' + eventsHash).once('value').then(snapshot => {

                if(snapshot !== null && snapshot.val() !== null){
                    var payload = {
                        data: {
                            survey: snapshot.val().surveyKey,
                            workflow: snapshot.val().workflowKey
                        }
                    };

                    admin.database().ref('/users/' + userKey).once('value').then(data => {
                       var token = data.val().token;
                        return admin.messaging().sendToDevice(token, payload)
                            .then(function(response) {
                                console.log("Successfully sent message:", response);
                            })
                            .catch(function(error) {
                                console.log("Error sending message:", error);
                            });
                    });


                }
            });
        }
        return;
    });

exports.calculateWorkflowHash = functions.database.ref('/workflows/{pushId}')
    .onWrite(event => {

        if(event.data.val() === null){
            return
        }

        var hashString = hash(event.data.val().tasks)
        console.log("web hash: " + hashString);

        var json = {};
        json['surveyKey'] = event.data.val().survey;
        json['workflowKey'] = event.data.key;

        return event.data.ref.parent.ref.parent.child(`/workflowsHash/${hashString}`)
                .set(json);
    });