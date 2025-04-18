import { useState } from "react";
import { UserAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState(""); // ✅ safer default
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { session, signInUser } = UserAuth();
  const navigate = useNavigate(); // ✅ for redirecting
  console.log(session);
  console.log(email, password);
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading();

    try {
      const result = await signInUser(email, password);
      if (result?.success) {
        console.log("✅ Login success: ami sayem entry korlam");
        navigate("/"); // ✅ go to task page
      }
    } catch (error) {
      console.error(error);
      setError("Unexpected error occurred!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
        <h2>Authentication with Supabase Sign In</h2>
        <form
          onSubmit={handleSignIn}
          style={{ marginBottom: "1rem", display: "grid" }}
        >
          <input
            style={{ marginBottom: "1rem", padding: "0.5rem" }}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={{ padding: "0.5rem" }}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            disabled={loading}
            type="submit"
            style={{ marginTop: "1rem" }}
          >
            Sign In
          </button>
          {error && (
            <p style={{ color: "red", textAlign: "center", paddingTop: "4px" }}>
              {error}
            </p>
          )}
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
