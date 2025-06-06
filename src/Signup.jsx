import { useState } from "react";
import { UserAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState(""); // 🛠️ safer default
  const [password, setPassword] = useState(""); // 🛠️ safer default
  const [error, setError] = useState("");
  const { session, signUpNewUser } = UserAuth();
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  console.log(session);
  console.log(email, password);
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signUpNewUser(email, password);
      if (result?.success) {
        console.log("🎉 User signed up successfully!");
        navigate("/");
      } else if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      console.error(error);
      setError("Unexpected error occurred!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Authentication with Supabase SignUp</h2>
      <form
        onSubmit={handleSignUp}
        style={{ marginBottom: "1rem", display: "grid" }}
      >
        <input
          style={{ marginBottom: "1rem", padding: "0.5rem" }}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required // 🛠️ make input required
        />
        <input
          style={{ padding: "0.5rem" }}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required // 🛠️ make input required
        />
        <button disabled={loading} type="submit" style={{ marginTop: "1rem" }}>
          Sign Up
        </button>
        {error && (
          <p style={{ color: "red", textAlign: "center", paddingTop: "4px" }}>
            {error}
          </p>
        )}
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
