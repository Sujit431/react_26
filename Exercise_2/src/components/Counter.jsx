import { useState } from "react";

function Counter() {
  const [isOn, setIsOn] = useState(false);
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <section className="section">
      <h2 className="section-title">🔢 Counter & Toggle</h2>

      {/* Toggle Button */}
      <div
        className="toggle-box"
        style={{ backgroundColor: isOn ? "#1a73e8" : "#e0e0e0" }}
      >
        <p className="toggle-label">Status: <strong>{isOn ? "ON" : "OFF"}</strong></p>
        <button
          className={`btn ${isOn ? "btn-danger" : "btn-primary"}`}
          onClick={() => setIsOn((prev) => !prev)}
        >
          Turn {isOn ? "OFF" : "ON"}
        </button>
      </div>

      {/* Counter */}
      <div className="counter-box">
        <p className="counter-display">{count}</p>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={increment}>➕ Increment</button>
          <button className="btn btn-danger" onClick={decrement}>➖ Decrement</button>
          <button className="btn btn-outline-blue" onClick={reset}>🔄 Reset</button>
        </div>
        {count === 0 && (
          <p className="hint">⚠️ Counter cannot go below zero!</p>
        )}
      </div>
    </section>
  );
}

export default Counter;
