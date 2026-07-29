/**
 * Hirao Web Template v1.1
 * サイト固有の設定は、基本的にこのファイルだけを編集します。
 */
window.SITE_CONFIG = {
  locale: "ja-JP",
  timeZone: "Asia/Tokyo",

  sheets: {
    events: {
      enabled: true,
      csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwT7FeNIBt7Ro9AdSfBGCyWWIRlb4wmbX2BldadANolxsG58vSo6dK4Cf31y1JAWNalRirBlqIwXha/pub?gid=0&single=true&output=csv",
      target: "#schedule-list"
    },
    news: {
      enabled: false,
      csvUrl: "",
      target: "#news-list"
    },
    works: {
      enabled: false,
      csvUrl: "",
      target: "#works-list"
    },
    members: {
      enabled: false,
      csvUrl: "",
      target: "#members-list"
    }
  }
};
