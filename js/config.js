/**
 * Hirao Web System v2.2
 * 日常更新はGoogle Sheets、画像はGitHubで管理します。
 */
window.SITE_CONFIG = {
  locale: "ja-JP",
  timeZone: "Asia/Tokyo",

  sheets: {
    site: {
      enabled: true,
      csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwT7FeNIBt7Ro9AdSfBGCyWWIRlb4wmbX2BldadANolxsG58vSo6dK4Cf31y1JAWNalRirBlqIwXha/pub?gid=1816024368&single=true&output=csv"
    },
    events: {
      enabled: true,
      csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwT7FeNIBt7Ro9AdSfBGCyWWIRlb4wmbX2BldadANolxsG58vSo6dK4Cf31y1JAWNalRirBlqIwXha/pub?gid=0&single=true&output=csv",
      target: "#schedule-list"
    },
    members: {
      enabled: true,
      csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwT7FeNIBt7Ro9AdSfBGCyWWIRlb4wmbX2BldadANolxsG58vSo6dK4Cf31y1JAWNalRirBlqIwXha/pub?gid=121741251&single=true&output=csv",
      target: "#members-list",
      imageBasePath: "images/members/"
    }
  }
};
