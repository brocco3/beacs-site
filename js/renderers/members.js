(() => {
  "use strict";

  const sheet = window.SITE_CONFIG?.sheets?.members;
  if (!sheet?.enabled || !sheet.csvUrl) return;

  const container = document.querySelector(sheet.target || "#members-list");
  if (!container) return;

  const { escapeHtml, fetchSheet } = window.HiraoSheets;
  const imageBasePath = String(sheet.imageBasePath || "images/members/");

  function safeExternalLink(url, label) {
    const value = String(url || "").trim();
    if (!/^https?:\/\//i.test(value)) return "";
    return `<a href="${escapeHtml(value)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
  }

  function render(items) {
    container.innerHTML = items.map(item => {
      const name = item["名前"] || "";
      const imageName = String(item["画像"] || item["画像ファイル名"] || "").trim();
      const image = imageName
        ? `<img class="member-photo" src="${escapeHtml(imageBasePath + imageName)}" alt="${escapeHtml(name)}" loading="lazy">`
        : `<div class="portrait" aria-hidden="true"></div>`;
      const links = [
        safeExternalLink(item["HP"] || item["Webサイト"], "HP"),
        safeExternalLink(item["Instagram"], "Instagram")
      ].filter(Boolean).join("");

      return `<article class="member-card">
        ${image}
        <p class="member-role">${escapeHtml(item["担当"] || "")}</p>
        <h3>${escapeHtml(name)}</h3>
        ${item["英字名"] ? `<span class="member-roman">${escapeHtml(item["英字名"])}</span>` : ""}
        ${item["紹介"] ? `<p class="member-description">${escapeHtml(item["紹介"])}</p>` : ""}
        ${links ? `<div class="member-links">${links}</div>` : ""}
      </article>`;
    }).join("");
  }

  fetchSheet(sheet.csvUrl)
    .then(render)
    .catch(error => console.error("メンバー情報の読み込みに失敗しました", error));
})();
