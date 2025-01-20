import { useState, useEffect } from "react";
import axios from "axios";

export const useUser = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, userLoading };
};
