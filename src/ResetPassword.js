import { useState } from "react";
import "./ResetPassword.css";
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
    <div className="reset-container">
      <h1 className="brand-name">GrabIt</h1>
      <h2 className="reset-title">Reset Password</h2>

      <div className="input-group">
        <input
          type="password"
          className="custom-input"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="reset-button" onClick={handleReset} disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      {message && (
        <p className={`message ${message.includes("success") ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
