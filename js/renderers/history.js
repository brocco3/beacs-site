(() => {
  "use strict";

  const sheet = window.SITE_CONFIG?.sheets?.history;
  if (!sheet?.enabled || !sheet.csvUrl) return;

  const container = document.querySelector(sheet.target || "#performance-history-list");
  if (!container) return;

  const { escapeHtml, fetchSheet } = window.HiraoSheets;

  function isChecked(value) {
    return ["true", "1", "yes", "on", "表示", "掲載", "✓", "✔"].includes(
      String(value || "").trim().toLowerCase()
    );
  }

  function parseDate(value) {
    const raw = String(value || "").trim();
    const match = raw.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    if (!match) return null;
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function getHistoryLabel(item) {
    return String(item["実績名"] || item["タイトル"] || "").trim();
  }

  function formatShortDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}.${day}`;
  }

  function render(items) {
    const selected = items
      .filter(item => isChecked(item["実績表示"] || item["History"] || item["履歴表示"]))
      .map(item => ({ item, date: parseDate(item["日付"]), label: getHistoryLabel(item) }))
      .filter(entry => entry.date && entry.label)
      .sort((a, b) => b.date - a.date);

    if (!selected.length) {
      container.innerHTML = '<p class="performance-history-status">現在、掲載中の演奏履歴はありません。</p>';
      return;
    }

    const groups = new Map();
    selected.forEach(entry => {
      const year = entry.date.getFullYear();
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(entry);
    });

    container.innerHTML = Array.from(groups, ([year, entries]) => `
      <section class="performance-history-year" aria-label="${year}年の演奏履歴">
        <h4>${year}</h4>
        <ul>
          ${entries.map(({ item, date, label }) => {
            const url = String(item["詳細URL"] || item["URL"] || "").trim();
            const venue = String(item["会場"] || "").trim();
            const text = escapeHtml(label);
            const title = /^https?:\/\//i.test(url)
              ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${text}</a>`
              : text;
            return `<li>
              <time datetime="${escapeHtml(item["日付"] || "")}">${formatShortDate(date)}</time>
              <span class="performance-history-title">${title}</span>
              ${venue ? `<span class="performance-history-venue">${escapeHtml(venue)}</span>` : ""}
            </li>`;
          }).join("")}
        </ul>
      </section>
    `).join("");
  }

  fetchSheet(sheet.csvUrl, { visibleOnly: false })
    .then(render)
    .catch(error => {
      console.error("演奏履歴の読み込みに失敗しました", error);
      container.innerHTML = '<p class="performance-history-status">演奏履歴を読み込めませんでした。</p>';
    });
})();
