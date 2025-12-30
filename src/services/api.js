export const simulateCache = async (cacheSize, pages) => {
  try {
    const response = await fetch("http://localhost:8080/api/cache/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cacheSize, pages }),
    });
    return await response.json();
  } catch (err) {
    console.error("Error calling backend:", err);
    return null;
  }
};
