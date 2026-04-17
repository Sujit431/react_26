import { useRef, useEffect } from "react";

function FocusForm() {
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current.focus();
  }, []);

  const handleFocusSecond = () => {
    secondInputRef.current.focus();
  };

  return (
    <section className="section">
      <h2 className="section-title">🎯 useRef & Focus</h2>

      <div className="form-group">
        <label className="form-label">First Name (auto-focused on load 👇)</label>
        <input
          ref={firstInputRef}
          type="text"
          className="input-field"
          placeholder="Auto-focused when page loads..."
        />
      </div>

      <div className="form-group">
        <label className="form-label">Last Name (focused by button click)</label>
        <input
          ref={secondInputRef}
          type="text"
          className="input-field"
          placeholder="Click the button below to focus here..."
        />
      </div>

      <button className="btn btn-primary" onClick={handleFocusSecond}>
        🎯 Focus Last Name Field
      </button>
    </section>
  );
}

export default FocusForm;
