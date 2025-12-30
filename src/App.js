import React, { useState, useEffect } from "react";
import CacheInput from "./components/CacheInput";
import CacheVisualizer from "./components/CacheVisualizer";
import ResultSummary from "./components/ResultSummary";
import TheoryPanel from "./components/TheoryPanel";
import { simulateCache } from "./services/api";
import "./App.css";

function App() {
  const [response, setResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  const [speed, setSpeed] = useState(1000);

  // ⭐ NEW: store selected example info
  const [selectedExample, setSelectedExample] = useState(null);

  const handleSimulate = async (cacheSize, pages, exampleInfo = null) => {
    const result = await simulateCache(cacheSize, pages);
    setResponse(result);
    setCurrentStep(0);
    setSelectedExample(exampleInfo);
  };

  // 🔄 Animation with speed control
  useEffect(() => {
    if (!response || !response.cacheStates?.length) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < response.cacheStates.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [response, speed]);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      {/* 🔝 Header */}
      <header className="top-bar">
        <h1 className="app-title">🧠 LRU Cache Simulator</h1>
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* 🧩 Input Card */}
      <div className="card">
        <CacheInput onSubmit={handleSimulate} />

        {/* 🎚 Speed Controller */}
        <div className="speed-control">
          <label>
            ⏱ Animation Speed: <b>{speed / 1000}s</b>
          </label>
          <input
            type="range"
            min="500"
            max="2000"
            step="250"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>

        {/* 📌 Example Buttons */}
        <div className="example-buttons">

          <button
            onClick={() =>
              handleSimulate(3, [1, 2, 3, 4, 5], {
                title: "❌ No Hits Example",
                pages: "1 2 3 4 5",
                explanation:
                  "All pages are unique and the cache size is small, so every request causes a cache miss."
              })
            }
          >
            ❌ No Hits
          </button>

          <button
            onClick={() =>
              handleSimulate(3, [1, 2, 3, 2, 4, 1], {
                title: "✅ Normal Case (Some Hits)",
                pages: "1 2 3 2 4 1",
                explanation:
                  "Page 2 is accessed again before eviction, resulting in cache hits."
              })
            }
          >
            ✅ With Hits
          </button>

          <button
            onClick={() =>
              handleSimulate(3, [1, 2, 1, 2, 1, 2], {
                title: "⭐ High Hit Ratio Example",
                pages: "1 2 1 2 1 2",
                explanation:
                  "Pages 1 and 2 are repeatedly accessed, so they stay in cache and produce many hits."
              })
            }
          >
            ⭐ High Hit Ratio
          </button>

        </div>
      </div>

      {/* 📘 SELECTED EXAMPLE INFO */}
      {selectedExample && (
        <div className="card example-info">
          <h3>{selectedExample.title}</h3>
          <p>
            <strong>Page Sequence:</strong>{" "}
            <code>{selectedExample.pages}</code>
          </p>
          <p>
            <strong>Explanation:</strong> {selectedExample.explanation}
          </p>
        </div>
      )}

      {/* 🔍 Visualization */}
      {response && (
        <>
          <CacheVisualizer
            cacheStates={response.cacheStates}
            evictedPages={response.evictedPages}
            currentStep={currentStep}
          />
          <ResultSummary hits={response.hits} misses={response.misses} />
        </>
      )}

      {/* 📘 Theory */}
      <TheoryPanel />
    </div>
  );
}

export default App;
