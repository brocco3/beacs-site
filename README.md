# Hirao Web System v2.0 / THE BEACS PROJECT

Cloudflare Pages + GitHub + Google Sheetsで運用する静的サイトです。

## 管理場所

- Google Sheets: Site / Events / Members
- GitHub: HTML・CSS・JavaScript・画像
- Cloudflare Pages: GitHub更新時に自動公開

## Siteシート

`Key, Value`形式で管理します。

- site_name
- tagline
- description
- instagram
- line
- youtube
- email

## Membersシート

推奨列:

`表示 / 名前 / 担当 / 紹介 / HP / Instagram / 画像 / 英字名`

画像列にはURLではなくファイル名を入力します。

例: `shingo.png`

画像本体は `images/members/` に置きます。

Membersシート公開後、`js/config.js` の `members.csvUrl` を設定し、`enabled` を `true` にしてください。
