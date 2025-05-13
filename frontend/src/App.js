import React, { useState } from 'react';
import './App.css';

function App() {
  const [date, setDate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/calendar-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date })
      });

      const data = await res.json();

      if (data.error) setError(data.error);
      else setResult(data);
    } catch (err) {
      setError("Server error.");
    }
  };

  return (
    <div className="App">
   
      <h2>Calendar Lookup</h2>
      <input style={{width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc"}}
        type="string"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Enter a date (YYYY-MM-DD)"
      />
      <button onClick={handleSubmit}>Get Day Info</button>

      {result && (
        <div>
          <p><strong>Day:</strong> {result.day}</p>
          <p><strong>Day of the Week:</strong> {result.dayOfWeek}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
