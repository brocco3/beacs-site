(() => {
  "use strict";
  const sheet = window.SITE_CONFIG?.sheets?.members;
  if (!sheet?.enabled || !sheet.csvUrl) return;
  const container = document.querySelector(sheet.target || "#members-list");
  if (!container) return;
  const { escapeHtml, fetchSheet } = window.HiraoSheets;

  fetchSheet(sheet.csvUrl).then(items => {
    container.innerHTML = items.map(item => {
      const image = String(item["画像URL"] || "").trim();
      return `<article>
        ${/^https?:\/\//i.test(image) ? `<img class="member-photo" src="${escapeHtml(image)}" alt="${escapeHtml(item["名前"] || "メンバー")}" loading="lazy">` : `<div class="portrait"></div>`}
        <p>${escapeHtml(item["担当"] || "")}</p>
        <h3>${escapeHtml(item["名前"] || "")}</h3>
        <span>${escapeHtml(item["英字名"] || "")}</span>
      </article>`;
    }).join("");
  }).catch(console.error);
})();
