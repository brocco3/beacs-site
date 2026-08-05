(() => {
  "use strict";

  const sheet = window.SITE_CONFIG?.sheets?.events;
  if (!sheet?.enabled || !sheet.csvUrl) return;

  const container = document.querySelector(sheet.historyTarget || ".performance-venues");
  if (!container) return;

  const { fetchSheet } = window.HiraoSheets;

  function isChecked(value) {
    const flag = String(value || "").trim().toLowerCase();
    return ["true", "1", "yes", "on", "表示", "掲載", "✓", "✔"].includes(flag);
  }

  function render(items) {
    const venues = [];
    const seen = new Set();

    items.forEach(item => {
      if (!isChecked(item["実績表示"])) return;
      const venue = String(item["会場"] || "").trim();
      if (!venue || seen.has(venue)) return;
      seen.add(venue);
      venues.push(venue);
    });

    if (!venues.length) {
      container.hidden = true;
      container.textContent = "";
      return;
    }

    container.textContent = venues.join("｜");
    container.hidden = false;
  }

  // SCHEDULEの「表示」とは独立して、実績表示=TRUEの全行を参照する。
  fetchSheet(sheet.csvUrl, { visibleOnly: false })
    .then(render)
    .catch(error => {
      console.error("主な演奏会場の読み込みに失敗しました", error);
      container.hidden = true;
    });
})();
