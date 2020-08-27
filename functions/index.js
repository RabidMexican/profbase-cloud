const functions = require('firebase-functions');

functions.database.ref()

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');

admin.initializeApp({
  databaseURL: "https://profbase-79adc.firebaseio.com"
});

const db = admin.database();

// Detect when ANY change is made to a courses dates
exports.courseChange = functions.database.ref('/courses/{course}/dates')
    .onWrite((change, context) => {

        // Get course id
        const courseId = context.params.course;
    
        // Set default value of course name
        var courseName = 'A course';

        // Set reference for course name
        const nameRef = db.ref('/courses/' + courseId+ '/name/en');

        // Get course name and send notif, if not found do nothing
        nameRef.on('value', function(snapshot) {

            courseName = snapshot.val();

             // Create a notification
            const payload = {
                notification: {
                    title: 'Schedule change',
                    body: courseName + ' has had its schedule changed.',
                    sound: 'default'
                }
            };
        
            //Create an options object
            const options = {
                priority: 'high',
                timeToLive: 60 * 60 * 24
            };

            functions.logger.log("NOTIF SENT TO CHANNEL : " + courseId);

            // Send notification to channel with name of courseId
            return admin.messaging().sendToTopic(courseId, payload, options);

        }, function (errorObject) {
            // Log error
            functions.logger.log("ERROR : " + errorObject.code);

            // Return nothing or the request has to time-out
            return null;
        });
    });


