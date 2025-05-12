const { auth, db } = require("../config/firebase");
const User = require("../models/userModel");

class AuthController {
  static async signup(req, res) {
    try {
      const { firstName, lastName, email, password, userType } = req.body;

      if (!firstName || !lastName || !email || !password || !userType) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const displayName = `${firstName} ${lastName}`;

      const userRecord = await auth.createUser({
        email,
        password,
        displayName,
      });

      await auth.setCustomUserClaims(userRecord.uid, { userType });

      const userData = new User({
        uid: userRecord.uid,
        name: displayName,
        email,
        userType,
      });

      await db.collection("users").doc(userRecord.uid).set(userData.toFirestore());

      return res.status(201).json({
        message: "User created successfully",
        uid: userRecord.uid,
        userType,
      });
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(400).json({ error: error.message });
    }
  }

  static async getUserRole(req, res) {
    const { uid } = req.body;

    try {
      const user = await auth.getUser(uid);
      const userType = user.customClaims?.userType || "none";
      res.json({ uid, userType });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static logout(req, res) {
    res.json({
      message: "Logout handled on client by deleting the token.",
    });
  }
  
static async updateProfile(req, res) {
  const {
    uid,
    name,
    userType,
    location,
    subjects = [],
    teachingLevel = [],
    about = "",
    companyName = "",
    companyType = "",
  } = req.body;

  if (!uid) {
    return res.status(400).json({ error: "User ID (uid) is required" });
  }

  try {
    const docRef = db.collection("users").doc(uid);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingData = snapshot.data();

    const updatedUser = {};

    if (name) updatedUser.name = name;
    if (userType) updatedUser.userType = userType;
    if (location) updatedUser.location = location;
    if (subjects.length) updatedUser.subjects = subjects;
    if (teachingLevel.length) updatedUser.teachingLevel = teachingLevel;
    if (about) updatedUser.about = about;
    if (companyName) updatedUser.companyName = companyName;
    if (companyType) updatedUser.companyType = companyType;

    await docRef.update(updatedUser);

    res.status(200).json({ message: "Profile updated successfully", uid,
  name,
  userType,
  location,
  subjects,
  teachingLevel,
  about,
  companyName,
  companyType,
 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

}

module.exports = AuthController;
