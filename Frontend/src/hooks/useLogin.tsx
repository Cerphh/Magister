import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Step 2: Fetch additional user data from Firestore
      const userDocRef = doc(db, "users", user.uid); // assumes Firestore doc ID = user UID
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        throw new Error("User profile not found in Firestore.");
      }

      const { displayName, role } = userSnapshot.data();

      // Step 3: Store in localStorage
      const userData = {
        uid: user.uid,
        email: user.email,
        token,
        displayName,
        role,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      // Step 4: Redirect
      navigate("/jobs");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
