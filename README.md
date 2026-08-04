# Hirao Web System v2.4 / THE BEACS PROJECT

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
- movie
- email

## Membersシート

推奨列:

`表示 / 名前 / 担当 / 紹介 / HP / Instagram / 画像 / 英字名`

画像列にはURLではなくファイル名を入力します。

例: `shingo.png`

画像本体は `images/members/` に置きます。

## ファイル命名規則

- ファイル名とフォルダ名はすべて小文字
- 日本語とスペースを使わない
- 複数の単語はハイフン（`-`）で区切る
- 拡張子も小文字に統一する

例:

- `hero.jpg`
- `logo.svg`
- `main-visual.jpg`
- `shingo.png`

## 更新履歴

### v2.4

- メイン画像を `hero.jpg` に統一
- CSSの画像参照を `hero.jpg` に修正
- READMEへファイル命名規則を追加

### v2.3

- メイン画像をヒーローエリアへ表示

### v2.2

- Membersシートを有効化
- MOVIEにYouTube動画を埋め込み
- Siteシートの `movie` キーで動画URLを差し替え可能


## v2.5

CONTACTを固定テキスト、6枚の演奏写真、問い合わせ導線で構成するギャラリーブロックへ更新。

## v3.3

- サイトタイトルを `鈴木臣吾 THE BEACS PROJECT` に固定し、CMS読込時の表示タイムラグを解消
- TOP説明文をオリジナル音楽プロジェクトの紹介へ変更
- PERFORMANCE文章を確定版へ更新
- PERFORMANCE直下に `Performance History` を追加
- CONTACTを依頼時の疑問と対応内容が伝わる構成へ更新

### Performance Historyの更新方法

既存の `Events` シートに次の列を追加します。

- `実績表示`：チェックボックス。表示したい公演だけチェック
- `実績名`：任意。空欄なら既存の `タイトル` を表示

表示内容：

`年 / 月日 / 公演名 / 会場`

演奏履歴は日付の新しい順、年ごとに自動整理されます。`詳細URL` がある行はリンクになります。
