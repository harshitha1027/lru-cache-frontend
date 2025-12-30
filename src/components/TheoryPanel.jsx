import React from "react";

function TheoryPanel() {
  return (
    <div className="card theory-panel">
      <h2>📘 LRU Cache – Theory</h2>

      <p>
        <b>LRU (Least Recently Used)</b> is a cache replacement algorithm that
        removes the page which has not been used for the longest time.
      </p>

      <ul>
        <li>✔ Frequently used pages stay in cache</li>
        <li>✔ Least recently accessed page is evicted</li>
        <li>✔ Improves hit ratio compared to FIFO</li>
      </ul>

      <h3>🔁 FIFO vs LRU</h3>

      <table className="compare-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>FIFO</th>
            <th>LRU</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Eviction Rule</td>
            <td>First inserted</td>
            <td>Least recently used</td>
          </tr>
          <tr>
            <td>Performance</td>
            <td>Lower</td>
            <td>Higher</td>
          </tr>
          <tr>
            <td>Hit Ratio</td>
            <td>Low</td>
            <td>Better</td>
          </tr>
          <tr>
            <td>Practical Usage</td>
            <td>Rare</td>
            <td>Very common</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TheoryPanel;
