// initialize firebase sdk
const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.resolve("magister-1ad61-firebase-adminsdk-fbsvc-e6b75d5423.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "magister-1ad61.appspot.com"
});

const auth = admin.auth();
const bucket = admin.storage().bucket();

module.exports = { admin, auth, bucket };
