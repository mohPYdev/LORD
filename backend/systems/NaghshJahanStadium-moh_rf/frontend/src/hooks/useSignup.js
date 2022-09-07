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
    last_name,
    phone_number
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
        phone_number
      });

      if (!res) {
        throw new Error("Could not complete signup");
      }

      navigate("/login");
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
