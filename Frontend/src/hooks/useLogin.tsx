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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        throw new Error("User profile not found in Firestore.");
      }

      const { displayName, role } = userSnapshot.data();
      const userData = {
        uid: user.uid,
        email: user.email,
        token,
        displayName,
        role,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ Redirect based on role
      if (role === "employer") {
        navigate("/employer-dashboard");
      } else {
        navigate("/profile");
      }

      return userData; // Optional: return user data
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
