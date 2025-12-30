import React, { useState } from "react";

function CacheInput({ onSubmit }) {
  const [cacheSize, setCacheSize] = useState(3);
  const [pagesInput, setPagesInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const pages = pagesInput
      .trim()
      .split(" ")
      .map(Number)
      .filter(n => !isNaN(n));
    onSubmit(cacheSize, pages);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div>
        <label>Cache Size: </label>
        <input
          type="number"
          min="1"
          value={cacheSize}
          onChange={(e) => setCacheSize(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Pages (space-separated): </label>
        <input
          type="text"
          value={pagesInput}
          onChange={(e) => setPagesInput(e.target.value)}
          placeholder="e.g., 1 2 3 2 4 1"
          required
        />
      </div>
      <button type="submit" style={{ marginTop: "10px" }}>Simulate</button>
    </form>
  );
}

export default CacheInput;
