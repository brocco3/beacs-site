(() => {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const sheet = config.sheets?.events;
  if (!sheet?.enabled) return;

  const container = document.querySelector(sheet.target || "#schedule-list");
  if (!container) return;

  const { escapeHtml, fetchSheet } = window.HiraoSheets;

  function parseDate(value) {
    if (!value) return null;
    const normalized = String(value).replaceAll("/", "-");
    const date = new Date(`${normalized}T00:00:00+09:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const weekday = new Intl.DateTimeFormat(config.locale || "ja-JP", {
      weekday: "short",
      timeZone: config.timeZone || "Asia/Tokyo"
    }).format(date);
    return { short: `${month}.${day}`, sub: `${year} ${weekday}` };
  }

  function statusClass(status) {
    const value = String(status || "").trim();
    if (["受付中", "予約受付中", "販売中"].includes(value)) return "is-open";
    if (["残席わずか", "残りわずか"].includes(value)) return "is-few";
    if (["満席", "完売", "受付終了"].includes(value)) return "is-sold";
    if (["中止", "延期"].includes(value)) return "is-cancelled";
    if (["終了"].includes(value)) return "is-ended";
    return "is-default";
  }

  function render(items) {
    const events = items
      .map(item => ({ ...item, _date: parseDate(item["日付"]) }))
      .filter(item => item._date)
      .sort((a, b) => a._date - b._date);

    if (!events.length) {
      container.innerHTML = `<article class="schedule-status"><div><p>NEXT EVENT</p><h3>次回公演を準備中です</h3><span>詳細決定後に掲載します</span></div></article>`;
      return;
    }

    container.innerHTML = events.map(event => {
      const date = formatDate(event._date);
      const title = escapeHtml(event["タイトル"] || "予定");
      const venue = escapeHtml(event["会場"] || "");
      const area = escapeHtml(event["地域"] || "");
      const open = escapeHtml(event["開場"] || "");
      const start = escapeHtml(event["開演"] || "");
      const status = escapeHtml(event["状態"] || "");
      const note = escapeHtml(event["備考"] || "");
      const url = String(event["URL"] || "").trim();
      const timeText = [open && `開場 ${open}`, start && `開演 ${start}`, note].filter(Boolean).join(" / ");
      const placeText = [venue, area].filter(Boolean).join(" / ");
      const badge = status ? `<span class="status-badge ${statusClass(status)}">${status}</span>` : "";
      const link = /^https?:\/\//i.test(url)
        ? `<a class="event-link" href="${escapeHtml(url)}" target="_blank" rel="noopener">詳細を見る →</a>`
        : "";

      return `<article class="event-card">
        <time datetime="${escapeHtml(event["日付"])}"><b>${date.short}</b><span>${date.sub}</span></time>
        <div class="event-content">
          <div class="event-heading">${badge}<h3>${title}</h3></div>
          ${placeText ? `<p class="event-place">${placeText}</p>` : ""}
          ${timeText ? `<p class="event-time">${timeText}</p>` : ""}
        </div>
        ${link}
      </article>`;
    }).join("");
  }

  if (!sheet.csvUrl) {
    container.innerHTML = `<article class="schedule-status"><div><p>SCHEDULE</p><h3>Google Sheets接続前です</h3><span>js/config.js に公開CSV URLを設定してください</span></div></article>`;
    return;
  }

  fetchSheet(sheet.csvUrl)
    .then(render)
    .catch(error => {
      console.error("出演予定の読み込みに失敗しました", error);
      container.innerHTML = `<article class="schedule-status"><div><p>SCHEDULE ERROR</p><h3>出演予定を取得できませんでした</h3><span>しばらくしてから再度ご覧ください</span></div></article>`;
    });
})();
