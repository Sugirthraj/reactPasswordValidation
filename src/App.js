import React, { useState } from "react";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send the password to the server for processing
    try {
      const response = await fetch("/api/password/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      setResult(data.steps);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Password:
          <input type="password" value={password} onChange={handleChange} />
        </label>
        <button type="submit">Check Password Strength</button>
      </form>
      {result !== null && <p>Steps required: {result}</p>}
    </div>
  );
};

export default PasswordStrengthChecker;
