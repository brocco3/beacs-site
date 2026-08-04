(() => {
  "use strict";

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = "";
    let quoted = false;

    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      const next = text[i + 1];

      if (char === '"' && quoted && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === "," && !quoted) {
        row.push(field);
        field = "";
      } else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && next === "\n") i += 1;
        row.push(field);
        if (row.some(cell => cell.trim() !== "")) rows.push(row);
        row = [];
        field = "";
      } else {
        field += char;
      }
    }

    row.push(field);
    if (row.some(cell => cell.trim() !== "")) rows.push(row);
    return rows;
  }

  function rowsToObjects(rows) {
    if (rows.length < 2) return [];
    const headers = rows[0].map(header => header.trim());
    return rows.slice(1).map(row => Object.fromEntries(
      headers.map((header, index) => [header, (row[index] || "").trim()])
    ));
  }

  function isVisible(item) {
    const flag = String(item["表示"] || "TRUE").trim().toLowerCase();
    return !["false", "0", "no", "off", "非表示"].includes(flag);
  }

  async function fetchSheet(csvUrl) {
    if (!csvUrl) throw new Error("CSV URLが設定されていません");
    const response = await fetch(csvUrl, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    return rowsToObjects(parseCsv(text)).filter(isVisible);
  }

  window.HiraoSheets = {
    escapeHtml,
    fetchSheet,
    isVisible
  };
})();
