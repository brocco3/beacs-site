# Hirao Web Template v1.1 / The Beacs

Cloudflare Pages + GitHub + Google Sheetsで運用する静的サイトです。

## 現在接続済み

- Events：Google Sheetsから自動取得
- 状態バッジ：受付中／残席わずか／満席／中止／終了を自動色分け
- 日付順：自動並び替え
- 表示列：TRUEのみ表示

## 更新方法

### 出演予定
Google SheetsのEventsシートを編集するだけです。GitHubへの再アップロードは不要です。

### デザイン・文章・画像
GitHubの該当ファイルを変更してCommitすると、Cloudflare Pagesが自動公開します。

## サイト固有設定

`js/config.js` に集約しています。

```js
window.SITE_CONFIG = {
  sheets: {
    events: { enabled: true, csvUrl: "...", target: "#schedule-list" },
    news: { enabled: false, csvUrl: "", target: "#news-list" },
    works: { enabled: false, csvUrl: "", target: "#works-list" },
    members: { enabled: false, csvUrl: "", target: "#members-list" }
  }
};
```

News・Works・Membersを使うときは、各CSV URLを入力して`enabled: true`にします。

## Google Sheetsの項目

テンプレートCSVは `data/templates/` にあります。

- `events.csv`
- `news.csv`
- `works.csv`
- `members.csv`

## ファイル構造

```text
index.html
css/style.css
js/config.js
js/sheets.js
js/main.js
js/renderers/
  events.js
  news.js
  works.js
  members.js
data/templates/
images/
assets/
404.html
README.md
```

## 注意

Google Sheetsの「ウェブに公開」で公開した内容は、URLを知る人から取得できます。内部メモ、個人情報、非公開情報は入れないでください。
