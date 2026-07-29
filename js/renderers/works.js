(() => {
  "use strict";
  const sheet = window.SITE_CONFIG?.sheets?.works;
  if (!sheet?.enabled || !sheet.csvUrl) return;
  const container = document.querySelector(sheet.target || "#works-list");
  if (!container) return;
  const { escapeHtml, fetchSheet } = window.HiraoSheets;

  fetchSheet(sheet.csvUrl).then(items => {
    container.innerHTML = items.map(item => {
      const url = String(item["URL"] || "").trim();
      return `<article class="data-card work-card">
        <p>${escapeHtml(item["種別"] || "WORK")}</p>
        <h3>${escapeHtml(item["タイトル"] || "")}</h3>
        <span>${escapeHtml(item["説明"] || "")}</span>
        ${/^https?:\/\//i.test(url) ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">詳しく見る →</a>` : ""}
      </article>`;
    }).join("");
  }).catch(console.error);
})();
