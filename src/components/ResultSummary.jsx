import React from "react";
import "../App.css";

function ResultSummary({ hits, misses }) {
  const total = hits + misses;
  const hitRatio = total === 0 ? 0 : ((hits / total) * 100).toFixed(2);

  const explanation =
    hits === 0
      ? "No cache hits occurred because none of the requested pages were reused before being evicted from the cache."
      : "Cache hits occurred because some pages were requested again while they were still present in the cache.";

  return (
    <div className="card summary-card">
      <h2 className="section-title">📊 Simulation Summary</h2>

      <div className="summary-row">
        <div className="summary-box hit-box">
          <h3>{hits}</h3>
          <p>Total Hits</p>
        </div>

        <div className="summary-box miss-box">
          <h3>{misses}</h3>
          <p>Total Misses</p>
        </div>

        <div className="summary-box ratio-box">
          <h3>{hitRatio}%</h3>
          <p>Hit Ratio</p>
        </div>
      </div>

      {/* Auto Explanation */}
      <div className="explanation-box">
        <p>
          <strong>Explanation:</strong> {explanation}
        </p>
      </div>
    </div>
  );
}

export default ResultSummary;
