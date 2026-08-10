# e-life-site

Cloudflare Pagesで公開する、40代からAIやCodexを試す実体験ブログです。

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

Cloudflare Pagesでは、ビルドコマンドを`npm run build`、出力ディレクトリを`dist`に設定します。

## 記事公開とSEO確認

- 記事は`articles/`へMarkdownで追加する
- 公開記事はfrontmatterの`draft`を`false`にする
- `title`、`description`、`publishedAt`、`updatedAt`、`image`、`imageAlt`を記事ごとに設定する
- OGP画像のSVGを`public/og/`へ追加し、`npm run images`でPNGを生成する
- `npm run build`で型チェック、静的生成、サイトマップ、RSSを確認する

公開後は、記事URL、canonical、OGP画像、`/robots.txt`、`/sitemap-index.xml`、`/rss.xml`を本番環境で確認します。

Google Analytics 4の測定IDは`src/site.ts`で一元管理します。アクセス解析タグは利用者がCookie利用へ同意した場合のみ読み込まれます。
