import { createContext, useEffect, useContext, useState } from "react";
import { supabase } from "./supabase/SupabaseClient";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  //   Sign up
  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error("there was a problem signin up:", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  // Sign in

  const signInNewUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error("sign in occurred:", error);
        return { success: false, error: error.message };
      }
      console.log("sign-in success:", data);
      return { success: true, data };
    } catch (error) {
      console.error("an error occurred:", error);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  // Sign out
  const signOut = () => {
    const { error } = supabase.auth.signOut();

    if (error) {
      console.log("there was an error:", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signOut, signInNewUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(AuthContext);
};
