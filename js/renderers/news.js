(() => {
  "use strict";
  const sheet = window.SITE_CONFIG?.sheets?.news;
  if (!sheet?.enabled || !sheet.csvUrl) return;
  const container = document.querySelector(sheet.target || "#news-list");
  if (!container) return;
  const { escapeHtml, fetchSheet } = window.HiraoSheets;

  fetchSheet(sheet.csvUrl).then(items => {
    container.innerHTML = items.map(item => `
      <article class="data-card news-card">
        <time>${escapeHtml(item["日付"] || "")}</time>
        <div><h3>${escapeHtml(item["タイトル"] || "")}</h3><p>${escapeHtml(item["本文"] || "")}</p></div>
      </article>`).join("");
  }).catch(console.error);
})();
