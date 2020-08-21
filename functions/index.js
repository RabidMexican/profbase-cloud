const functions = require('firebase-functions');
functions.database.ref()

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Detect when ANY change is made to a courses dates
exports.courseChange = functions.database.ref('/courses/{course}/dates')
    .onWrite((change, context) => {
        const original = change.after.val();
        console.log('TEST :', context.params.course);
    });


