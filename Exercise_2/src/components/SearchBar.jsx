import { useState } from "react";

function SearchBar() {
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <section className="section">
      <h2 className="section-title">🔍 Search Bar</h2>

      <div className="input-group">
        <input
          type="text"
          className="input-field"
          placeholder="Type something..."
          value={text}
          onChange={handleChange}
        />
      </div>

      <p className="realtime-display">
        📝 You typed: <strong>{text}</strong>
      </p>

      <label className="uppercase-label">
        🔠 Uppercase Output: <span>{text.toUpperCase()}</span>
      </label>
    </section>
  );
}

export default SearchBar;
