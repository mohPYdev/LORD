import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { LocalUrl } from "../urls/urls";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const SIGNUP_URL = LocalUrl + "auth/users/";

  const signup = async (
    email,
    password,
    username,
    first_name,
    last_name
  ) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await axios.post(SIGNUP_URL, {
        email,
        username,
        password,
        first_name,
        last_name,
      });

      if (!res) {
        throw new Error("Could not complete signup");
      }

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
        navigate("/login");
      }
    } catch (err) {
      if (!isCancelled) {
        setError(Object.values(err.response.data)[0][0]);
        setIsPending(false);
        alert(Object.values(err.response.data)[0][0]);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
