import { useState, useEffect } from "react";
import { UserData } from "../../types";

const useUser = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, clearUser };
};

export default useUser;
