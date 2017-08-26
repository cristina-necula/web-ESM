const functions = require('firebase-functions');
var hash = require('object-hash');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//listen for events
exports.triggerSurvey = functions.database.ref('/sessions/{pushId}/events')
    .onWrite(event => {
//      const getSomethingPromise = admin.database().ref(`/important/messages/{pushId}`).once('value');
//
// return getSomethingPromise.then(results => {
//     const somethingSnapshot = results[0];

    // Do something with the snapshot
// })
        console.log(event.data.val());
    });

exports.calculateWorkflowHash = functions.database.ref('/workflows/{pushId}')
    .onWrite(event => {

        if(event.data.val() === null){
            return
        }

        if(event.data.val().hash !== " "){
            return
        }

        var tasksKeys = Object.keys(event.data.val().tasks);
        var tasksLength = tasksKeys.length;
        var tasks = [];

        for(var i = 0; i < tasksLength; i++){
            var key = tasksKeys[i].replace("\"", "");
            var task = {};
            admin.database().ref('/tasks/' + key).once('value').then(snapshot => {
                task['type'] = snapshot.val().type;
                task['tag'] = snapshot.val().tag;
                task['containerActivity'] = snapshot.val().containerActivity;
            });
            tasks.push(task);
            console.log("Task " + i + " " + tasks[i]);
        }
        console.log("Tasks: " + tasks);
        var workflowTasksHash = hash(tasks);
        return event.data.ref.child('hash').set(workflowTasksHash);
    });