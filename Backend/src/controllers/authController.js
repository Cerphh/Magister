const { auth, db } = require("../config/firebase");

class AuthController {
  // Signup
  static async signup(req, res) {
    const {
      email,
      password,
      displayName,
      role,
      companyName,
      companyType,
    } = req.body;

    try {
      // Create Firebase Auth user
      const userRecord = await auth.createUser({
        email,
        password,
        displayName,
      });

      // Set custom role
      await auth.setCustomUserClaims(userRecord.uid, { role });

      // Prepare user data for Firestore
      const userData = {
        uid: userRecord.uid,
        email,
        displayName,
        role,
        createdAt: new Date(),
      };

      if (role === "company") {
        if (!companyName || !companyType) {
          return res.status(400).json({
            error: "Company name and type are required for company accounts",
          });
        }
        userData.companyName = companyName;
        userData.companyType = companyType;
      }

      // Save user data in Firestore
      await db.collection("users").doc(userRecord.uid).set(userData);

      res.status(201).json({
        message: "User created successfully",
        uid: userRecord.uid,
        role,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get role
  static async getUserRole(req, res) {
    const { uid } = req.body;

    try {
      const user = await auth.getUser(uid);
      const role = user.customClaims?.role || "none";
      res.json({ uid, role });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Logout info
  static logout(req, res) {
    res.json({
      message: "Logout handled on client by deleting the token.",
    });
  }
}

module.exports = AuthController;
