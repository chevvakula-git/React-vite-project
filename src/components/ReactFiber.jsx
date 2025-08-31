import React, { useState,useTransition } from 'react'

const items = Array.from({ length: 500000 }, (_, i) => `Item ${i + 1}`);
const ReactFiber = () => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);

  // Fiber-powered concurrent hook

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // non-urgent update (can be interrupted)
      const results = items.filter((item) =>item.toLowerCase().includes(value.toLowerCase()))
      setFiltered(results);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>⚡ React Fiber + useTransition Demo</h2>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search items..."
        style={{ padding: "8px", width: "250px" }}
      />

    <div style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}>
     <ul>
        {filtered.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
     
    </div>
  );
}

export default ReactFiber