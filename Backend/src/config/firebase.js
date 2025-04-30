// initialize firebase sdk
const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.resolve(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "magister-1ad61.appspot.com",
});

const auth = admin.auth();
const bucket = admin.storage().bucket();
const db = admin.firestore(); // Add this line

module.exports = { admin, auth, db, bucket };