import React from "react";
import "../App.css";

function CacheVisualizer({ cacheStates, evictedPages, currentStep }) {
  if (!cacheStates || cacheStates.length === 0) return null;

  return (
    <div className="visualization-card">
      {/* 🔹 Animation Section */}
      <h3>🔄 Step-by-Step Animation</h3>
      <h4>Current Step: {currentStep + 1}</h4>

      <div className="cache-row">
        {cacheStates[currentStep].map((page, index) => (
          <div
            key={index}
            className={`cache-cell ${
              evictedPages[currentStep] === null ? "hit" : "miss"
            }`}
          >
            {page}
          </div>
        ))}
      </div>

      <p className="status-text">
        {evictedPages[currentStep] === null ? (
          "✅ Cache Hit – Page already present"
        ) : (
          <>❌ Cache Miss – Evicted Page: <b>{evictedPages[currentStep]}</b></>
        )}
      </p>

      {/* 📊 Table Section */}
      <h3 style={{ marginTop: "30px" }}>📊 LRU Simulation Table</h3>

      <table className="lru-table">
        <thead>
          <tr>
            <th>Step</th>
            <th>Page Requested</th>
            <th>Cache State</th>
            <th>Hit / Miss</th>
            <th>Evicted Page</th>
          </tr>
        </thead>

        <tbody>
          {cacheStates.map((state, index) => (
            <tr
              key={index}
              className={index === currentStep ? "active-row" : ""}
            >
              <td>{index + 1}</td>
              <td>{state[state.length - 1]}</td>
              <td>{state.join(", ")}</td>
              <td>
                {evictedPages[index] === null ? (
                  <span className="hit-text">Hit</span>
                ) : (
                  <span className="miss-text">Miss</span>
                )}
              </td>
              <td>
                {evictedPages[index] === null
                  ? "-"
                  : evictedPages[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CacheVisualizer;
