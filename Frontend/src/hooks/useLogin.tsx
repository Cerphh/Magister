// useLogin.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { UserData } from "../../types";

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

      const firestoreData = userSnapshot.data();
      const userData: UserData = {
        ...firestoreData,
        uid: user.uid,
        email: user.email,
        token,
      };

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Navigate based on role
      if (userData.role === "employer") {
        navigate("/employer-dashboard");
      } else {
        navigate("/profile");
      }

      return userData;
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
