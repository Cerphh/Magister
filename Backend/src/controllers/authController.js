const { auth } = require("../config/firebase");

class AuthController {
  // Signup
  static async signup(req, res) {
    const { email, password, displayName, role } = req.body;

    try {
      const userRecord = await auth.createUser({
        email,
        password,
        displayName,
      });

      // custom role
      await auth.setCustomUserClaims(userRecord.uid, { role });

      res.status(201).json({
        message: "User created successfully",
        uid: userRecord.uid,
        role,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Login – Token verification is handled on the frontend.
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

  // Logout – Done on frontend by removing the token
  static logout(req, res) {
    res.json({ message: "Logout handled on client by deleting the token." });
  }
}

module.exports = AuthController;
