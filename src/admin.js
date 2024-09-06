var admin = require("firebase-admin");
var serviceAccount = require("/Users/josiahodunade/Desktop/fitbittest/fitbitchallenge/src/fitbitchallenge-2dfee-firebase-adminsdk-k7iih-e9010e3a3e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const collectionRef = db.collection('Names');

// Example: Adding a document to the collection
const docRef = collectionRef.doc('document_id'); // Optionally specify a document ID
const data = {
  field1: 'value1',
  field2: 'value3'
  // Add more fields as needed
};

docRef.set(data)
  .then(() => {
    console.log('Document successfully written!');
  })
  .catch((error) => {
    console.error('Error writing document: ', error);
  });