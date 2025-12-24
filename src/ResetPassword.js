import { useState } from "react";
import { gql } from "@apollo/client";
import client from "./apollo";

const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export default function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
console.log("TOKEN FROM URL:", token);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const handleReset = async () => {
    if (!password) {
      setMessage("Password required");
      return;
    }

    setLoading(true);
    try {
      await client.mutate({
        mutation: RESET_PASSWORD,
        variables: {
          token,
          newPassword: password,
        },
      });

      setMessage("✅ Password reset successful");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto", textAlign: "center" }}>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button onClick={handleReset} disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      <p>{message}</p>
    </div>
  );
}
