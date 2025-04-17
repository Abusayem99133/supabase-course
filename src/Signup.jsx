import { useState } from "react";
import { UserAuth } from "./AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const { session, signUpNewUser } = UserAuth();
  console.log(session);
  console.log(email, password);
  const handleSingUp = async (e) => {
    e.preventDefault();
    try {
      const result = await signUpNewUser(email, password);
      if (result?.success) {
        console.log("ami sayem entry korlam ");
      }
    } catch (error) {
      setError("an error occurred");
    }
  };
  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
        <h2>Authentication with Supabase</h2>
        {/* form to add a new task */}
        <form
          onSubmit={handleSingUp}
          style={{ marginBottom: "1rem", display: "grid" }}
        >
          <input
            style={{ marginBottom: "1rem", padding: "0.5rem" }}
            type="email"
            name=""
            id=""
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={{ padding: "0.5rem" }}
            type="password"
            name=""
            id=""
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={{ marginTop: "1rem" }}>SignUp</button>
          {error && (
            <p style={{ color: "red", textAlign: "center", paddingTop: "4px" }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
