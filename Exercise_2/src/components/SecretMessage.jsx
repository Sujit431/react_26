import { useState } from "react";

function SecretMessage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  let logoutButton1;
  if (isLoggedIn) {
    logoutButton1 = <button className="btn btn-danger">🚪 Logout (If/Else)</button>;
  } else {
    logoutButton1 = <button className="btn btn-outline" disabled>Not logged in</button>;
  }

  return (
    <section className="section">
      <h2 className="section-title">👁️ Conditional Rendering</h2>

      <div className="login-toggle">
        <button
          className={`btn ${isLoggedIn ? "btn-danger" : "btn-primary"}`}
          onClick={() => setIsLoggedIn((p) => !p)}
        >
          {isLoggedIn ? "Simulate Logout" : "Simulate Login"}
        </button>
      </div>

      <div className="conditional-demo">
        {/* Way 1: If / Else */}
        <div className="method-box">
          <span className="method-label">1️⃣ If/Else</span>
          {logoutButton1}
        </div>

        {/* Way 2: Logical && */}
        <div className="method-box">
          <span className="method-label">2️⃣ Logical &&</span>
          {isLoggedIn && <button className="btn btn-danger">🚪 Logout (&&)</button>}
          {!isLoggedIn && <button className="btn btn-outline" disabled>Not logged in</button>}
        </div>

        {/* Way 3: Ternary */}
        <div className="method-box">
          <span className="method-label">3️⃣ Ternary ⭐ Most Common</span>
          {isLoggedIn
            ? <button className="btn btn-danger">🚪 Logout (Ternary)</button>
            : <button className="btn btn-outline" disabled>Not logged in</button>
          }
        </div>
      </div>

      {/* Secret Message */}
      <div className="secret-box">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          &nbsp; Check to reveal the secret message
        </label>
        {isChecked && (
          <div className="secret-message">
            🤫 <strong>Secret:</strong> React makes UI building magical! 🎩✨
          </div>
        )}
      </div>
    </section>
  );
}

export default SecretMessage;
