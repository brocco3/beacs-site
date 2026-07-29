(() => {
  "use strict";

  const sheet = window.SITE_CONFIG?.sheets?.site;
  if (!sheet?.enabled || !sheet.csvUrl) return;

  const { fetchSheet } = window.HiraoSheets;

  function toSettings(rows) {
    return Object.fromEntries(rows.map(row => {
      const key = String(row.Key || row.key || row["キー"] || "").trim();
      const value = String(row.Value || row.value || row["値"] || "").trim();
      return [key, value];
    }).filter(([key]) => key));
  }

  function validUrl(value) {
    return /^(https?:\/\/|mailto:)/i.test(String(value || "").trim());
  }

  function applyText(settings) {
    document.querySelectorAll("[data-site-text]").forEach(element => {
      const key = element.dataset.siteText;
      if (settings[key]) element.textContent = settings[key];
    });
  }

  function applyLinks(settings) {
    document.querySelectorAll("[data-site-href]").forEach(element => {
      const key = element.dataset.siteHref;
      let value = settings[key] || "";
      if (key === "email" && value && !/^mailto:/i.test(value)) value = `mailto:${value}`;

      if (validUrl(value)) {
        element.href = value;
        element.hidden = false;
      } else {
        element.hidden = true;
      }
    });
  }


  function toYouTubeEmbedUrl(value) {
    const raw = String(value || "").trim();
    if (!raw) return "";

    try {
      const url = new URL(raw);
      let videoId = "";

      if (url.hostname.includes("youtu.be")) {
        videoId = url.pathname.split("/").filter(Boolean)[0] || "";
      } else if (url.hostname.includes("youtube.com")) {
        if (url.pathname.startsWith("/embed/")) {
          videoId = url.pathname.split("/embed/")[1]?.split("/")[0] || "";
        } else if (url.pathname.startsWith("/shorts/")) {
          videoId = url.pathname.split("/shorts/")[1]?.split("/")[0] || "";
        } else {
          videoId = url.searchParams.get("v") || "";
        }
      }

      return /^[A-Za-z0-9_-]{6,}$/.test(videoId)
        ? `https://www.youtube.com/embed/${videoId}`
        : "";
    } catch {
      return "";
    }
  }

  function applyMovie(settings) {
    const iframe = document.querySelector("#main-movie");
    if (!iframe || !settings.movie) return;

    const embedUrl = toYouTubeEmbedUrl(settings.movie);
    if (embedUrl) iframe.src = embedUrl;
  }

  function applyMetadata(settings) {
    if (settings.site_name) {
      document.title = `${settings.site_name} | Blend of Entertainment Art Cultures`;
    }
    if (settings.description) {
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = settings.description;
    }
  }

  fetchSheet(sheet.csvUrl)
    .then(rows => {
      const settings = toSettings(rows);
      applyText(settings);
      applyLinks(settings);
      applyMovie(settings);
      applyMetadata(settings);
    })
    .catch(error => console.error("サイト設定の読み込みに失敗しました", error));
})();
