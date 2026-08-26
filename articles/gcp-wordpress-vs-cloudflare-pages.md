---
title: "GCPのWordPressとCloudflare Pagesを公式情報で比較｜費用・保守・更新方法"
description: "GCP Compute Engine＋WordPressとCloudflare Pages＋Astro＋Markdownを、費用、無料枠、保守、投稿、SEO、動的機能から公式情報をもとに比較します。"
personalLead: "最初は料金だけで比べようとしていました。でも、実際には『どうやって記事を更新したいか』から考える方が分かりやすかったです。"
publishedAt: "2026-08-11"
updatedAt: "2026-08-26T23:54:00+09:00"
category: "サイト構築"
tags:
  - "GCP"
  - "WordPress"
  - "Cloudflare Pages"
  - "Astro"
image: "/og/gcp-wordpress-vs-cloudflare-pages.png"
imageAlt: "サーバー運用と静的サイト配信を、更新・費用・保守・分析・機能の観点で比べる図"
articleImage:
  src: "/images/articles/gcp-wordpress-comparison/update-cost-maintenance.webp"
  alt: "サーバーと管理画面を使う構成、更新・費用・保守・分析・機能の確認項目、静的サイトを配信する構成を並べた比較図"
  width: 1693
  height: 929
draft: false
readerState:
  - "WordPressと静的サイトのどちらにするか迷っている"
  - "無料枠だけでなく保守や更新方法まで比較したい"
  - "AIやCodexを使った少人数運営を考えている"
quickAnswer: |-
  少人数でMarkdownとGitを使い、静的な記事を中心に公開するならCloudflare Pagesが有力。
  ブラウザーの管理画面、複数人の権限、予約投稿、WordPress向けプラグインが必要ならWordPressが向く。
  料金より先に更新方法で絞ると選びやすい。
articleSteps:
  - "比較する2つの構成をそろえる"
  - "更新方法と必要機能で候補を絞る"
  - "費用・無料枠・保守・SEOを比べる"
  - "公式上限と導入時の見積もりを再確認する"
experienceScope: "この記事は主に公式情報を整理した比較資料です。筆者の実体験は、GCPのClick to Deploy WordPressでデプロイ前の見積画面まで進み、Cloudflare Pages＋Astro＋Markdownでe-life.siteを公開した範囲に限ります。GCP上のWordPress本番運用は未経験です。"
factCheckedAt: "2026-08-13T00:00:00+09:00"
copyPrompt:
  label: "WordPressと静的サイトを比較する指示"
  text: "私のサイト要件を整理してください。最初に、更新人数、記事を書く場所、予約・承認、会員・決済・検索・フォーム、既存WordPress資産、月額予算、保守できる範囲を質問してください。その回答をもとに、GCP上のWordPressとCloudflare Pages上の静的サイトを比較し、向いている方、追加費用になり得る項目、導入前に公式ページで再確認する項目を表にしてください。分からない条件は推測せず質問してください。"
faq:
  - question: "結局、初心者にはどちらが簡単？"
    answer: "記事をブラウザーだけで書きたいならWordPressが分かりやすい一方、サーバー保守まで含めると作業が増えます。MarkdownやGitをCodexに手伝ってもらう運用なら、Cloudflare Pagesも候補になります。"
  - question: "SEOはWordPressの方が強い？"
    answer: "ホスティング方式だけで順位は決まりません。どちらでもtitle、canonical、構造化データ、サイトマップ、表示速度などを整えられます。WordPressはプラグインで設定しやすく、静的サイトは実装を管理しやすいという違いです。"
  - question: "Cloudflare Pagesはアクセスが増えても無料？"
    answer: "Functionsを呼ばない静的アセットのリクエストは、2026年8月13日時点で無料・無制限です。ただし、動的処理、外部サービス、ストレージ、ビルドやファイル数には別の料金・上限があります。"
  - question: "GCPの無料枠でWordPressを始めるのはあり？"
    answer: "条件を理解して試す選択はあります。ただし、無料枠対象は米国3リージョンのe2-microなどに限られ、性能や運用負荷が用途に合うかは別に確認が必要です。"
  - question: "あとからWordPressへ移行できる？"
    answer: "可能です。URL、記事本文、画像、公開日、カテゴリなどを移しやすい形で管理しておくと作業を減らせます。移行前にURL維持とリダイレクトを設計してください。"
---

この記事では、個人や少人数で記事サイトを作るときの具体的な2構成を比べます。

- **GCP Compute Engine＋WordPress**：仮想マシンでWordPressとデータベースを動かす
- **Cloudflare Pages＋Astro＋Markdown**：作成済みのHTML、CSS、画像を静的配信する

私がGCPの見積画面を見てCloudflare Pagesへ方針を変えた経緯は、[月5,776円の見積もりから考え直した体験記](/articles/gcp-wordpress-5776-cloudflare-pages/)に分けました。この記事では、その体験を繰り返さず、公式情報で比較できる材料に絞ります。

## 最初に比べるのは「記事をどう更新するか」

初心者だった私は、最初にサーバー料金を比べようとしました。

実際には、先に決めた方がよかったのは更新方法です。

### WordPressが合いやすい更新方法

- ブラウザーの管理画面から記事と画像を投稿する
- 編集者、投稿者、寄稿者などの権限を分ける
- 下書きや予約投稿を管理画面で扱う
- WordPress向けテーマやプラグインを使う
- コードやGitを触らない人も更新する

WordPressには複数のユーザー権限があり、管理画面で投稿状態を扱えます。

- [WordPress公式：Roles and Capabilities](https://wordpress.org/documentation/article/roles-and-capabilities/)
- [WordPress公式：投稿設定](https://wordpress.org/documentation/article/page-post-settings-sidebar/)

### Cloudflare Pagesが合いやすい更新方法

- Markdownで記事を管理する
- GitHubなどで変更履歴とレビューを扱う
- AIやCodexに記事とコードの修正を頼む
- 公開前のプレビューで確認する
- 記事閲覧時にデータベース処理を必要としない

Cloudflare PagesはGitHubまたはGitLabと連携でき、ブランチの変更を自動でビルド・公開できます。カスタムブランチやプルリクエストのプレビューURLも作れます。

[Cloudflare公式：Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)

## 比較一覧

| 比較項目 | GCP Compute Engine＋WordPress | Cloudflare Pages＋Astro＋Markdown |
|---|---|---|
| 主な更新場所 | WordPress管理画面 | MarkdownとGit |
| 基本費用 | VM、ディスク、外部IPv4、通信、バックアップなど | 静的配信は無料枠から開始可能。外部サービスや動的処理などは別 |
| 複数人の権限 | WordPressの役割を使いやすい | Gitホスティング側の権限とレビューで設計 |
| 予約・承認 | 管理画面で扱いやすい | CIや運用ルールを別に設計 |
| 機能追加 | WordPress向けプラグイン | コード、Pages Functions、外部サービス |
| 保守 | OS、PHP、DB、WordPress、テーマ、プラグインなど | 配信サーバーのOS管理は不要。Astro、依存関係、公開設定は更新が必要 |
| バックアップ | DB、画像、設定、ディスクを含めて設計 | 原稿とコードはGitで履歴化。外部データは別管理 |
| SEO設定 | 本体・テーマ・プラグインで設定 | テンプレートやビルド処理で実装 |
| 動的機能 | WordPress本体やプラグインで追加しやすい | Functionsや外部サービスを組み合わせる |
| AI・Codexとの作業 | REST APIやファイル編集で連携 | 記事とコードの差分を一緒に確認しやすい |

## 費用は同じ条件にできない

### GCP＋WordPressで費用になり得るもの

WordPress本体はオープンソースですが、Compute Engine上で動かす資源は別です。

主に次の項目を見積もります。

- VMインスタンス
- 永続ディスク
- 外部IPv4アドレス
- インターネットへのデータ転送
- スナップショットやバックアップ
- 監視、ログ、外部サービス

Google Cloud公式は、ディスク料金、ネットワーク料金、実際のコンソールや料金計算ツールを分けて案内しています。通貨や契約条件でも表示は変わるため、記事中の一例をそのまま自分の月額にはできません。

- [Google Cloud：ディスクとイメージの料金](https://cloud.google.com/compute/disks-image-pricing)
- [Google Cloud：VPCネットワーク料金](https://cloud.google.com/vpc/network-pricing#ipaddress)
- [Google Cloud：料金計算ツール](https://cloud.google.com/products/calculator)

私の画面では、2026年8月11日に東京、e2-medium、バランス永続ディスク30GBで月5,776円と表示されました。ただし、これは一般料金ではなく、デプロイ前の一例です。

### Cloudflare Pagesで費用になり得るもの

Functionsを呼ばない静的アセットへのリクエストは、Freeプランでも無料・無制限です。

ただし、サイト運営全体が必ず0円になるわけではありません。

- 独自ドメイン
- Pages FunctionsやWorkersの動的処理
- R2などのストレージ
- 外部フォーム、検索、認証、メール配信
- AI APIや有料の制作ツール

静的な閲覧と動的な処理を分けて見積もるのがポイントです。

[Cloudflare公式：Pages Functionsの料金](https://developers.cloudflare.com/pages/functions/pricing/)

## 無料枠の違い

### Google CloudのCompute Engine無料枠

2026年8月13日時点の主な条件は次のとおりです。

- 米国の`us-west1`、`us-central1`、`us-east1`にある非プリエンプティブルe2-micro 1台相当
- 標準永続ディスク30GB・月
- 北米から対象地域への下りデータ転送1GB・月

[Google Cloud公式：Free Tier](https://docs.cloud.google.com/free/docs/free-cloud-features#compute)

無料枠は「好きなリージョンとマシンを無料にできる仕組み」ではありません。

また、e2-microでWordPressを動かせるかと、管理画面、テーマ、プラグイン、アクセス数まで含めて無理なく運用できるかは別の話です。用途に合わせた負荷確認が必要です。

### Cloudflare Pages Freeプラン

2026年8月13日時点で、Cloudflare公式が案内する主な上限は次のとおりです。

| 項目 | Freeプランの上限 |
|---|---|
| ビルド | 月500回、同時1件、1回最大20分 |
| ファイル | 1サイト最大20,000ファイル |
| 1ファイル | 最大25MiB |
| 独自ドメイン | 1プロジェクト最大100件 |
| Pagesプロジェクト | 1アカウント最大100件 |

[Cloudflare公式：Pages Limits](https://developers.cloudflare.com/pages/platform/limits/)

記事数の上限が直接決まっているわけではありません。HTML、画像、CSS、JavaScriptなどを合わせたファイル数で考えます。25MiBを超える動画や配布ファイルは、R2など別の置き場所が必要です。

Pages FunctionsはWorkersの利用枠として数えます。Workers Freeは2026年8月13日時点で1日100,000リクエスト、1回当たりCPU時間10msです。一方、Functionsを呼ばない静的アセットへのリクエストはこの数に含まれません。

- [Cloudflare公式：Workers Pricing](https://developers.cloudflare.com/workers/platform/pricing/)
- [Cloudflare公式：Pages Functions Pricing](https://developers.cloudflare.com/pages/functions/pricing/)

## 保守とセキュリティの違い

### GCP＋WordPressで利用者側に残ること

Compute EngineのVMを使う場合、OSの更新、監視、障害対応、容量管理が利用者側に残ります。加えて、WordPress本体、テーマ、プラグイン、PHP、データベース、バックアップの管理も必要です。

WordPress公式も、セキュリティと性能のためにプラグインを最新へ保つよう案内しています。

- [Google Cloud公式：VM Managerのパッチ](https://docs.cloud.google.com/compute/vm-manager/docs/patch)
- [WordPress公式：Manage Plugins](https://wordpress.org/documentation/article/manage-plugins/)

もちろん、マネージドサービスや自動化を組み合わせれば負担は減らせます。その場合はサービス料金と運用範囲を別に確認します。

### Cloudflare Pagesでも保守はなくならない

静的サイトでは、公開面にWordPress管理画面や自分で動かすデータベースを置かずに済みます。その分、管理する対象を減らしやすい構成です。

ただし、次の作業は残ります。

- Astroや依存パッケージの更新
- GitHubアカウントと公開権限の管理
- ビルドエラーの確認
- フォームや認証など外部サービスの管理
- 公開前プレビューと公開後確認

Cloudflare Pagesだから自動的に安全になる、保守がゼロになる、という意味ではありません。

## SEOはホスティング名だけでは決まらない

WordPressでも静的サイトでも、次の項目は用意できます。

- ページごとのtitleとdescription
- canonical URL
- 構造化データ
- XMLサイトマップ
- RSS
- パンくずと内部リンク
- OGP画像
- 高速化や画像最適化

WordPressはテーマやSEOプラグインで設定しやすいのが利点です。静的サイトはテンプレートとビルド処理で一貫して出力できますが、最初の実装と確認が必要です。

「WordPressだからSEOに強い」「静的だから必ず上位になる」とは断定できません。記事の内容、検索意図、内部構造、表示品質、サイト全体の信頼性まで含めて考えます。

## 問い合わせ・検索・会員機能をどう作るか

静的サイトでも、記事、カテゴリ、タグ、関連記事、サイトマップ、RSSはビルド時に作れます。

一方、次の機能は動的な処理や保存先が必要です。

- お問い合わせ送信
- ログインと会員情報
- コメント
- 決済やEC
- 管理画面からの投稿

WordPressでは本体やプラグインで追加しやすい機能です。Cloudflare PagesではPages Functions、外部フォーム、認証サービス、検索サービスなどを組み合わせます。

必要な機能が多いほど、Pagesの「静的配信0円」だけを見て判断しない方が安全です。

## 読者タイプ別の選び方

### Cloudflare Pagesから検討しやすい人

- ひとり、または少人数で運営する
- MarkdownとGitの作業を受け入れられる
- AIやCodexにファイル編集を頼みたい
- 記事閲覧が中心で、動的機能は少ない
- VM、PHP、データベースを今は管理したくない

### WordPressから検討しやすい人

- ブラウザーの管理画面が必要
- 非技術者を含む複数人で頻繁に投稿する
- 権限、予約、承認をすぐ使いたい
- 既存のWordPressテーマやプラグインがある
- 会員、コメント、ECなどをプラグイン中心で作りたい

### GCP以外も比較した方がよい人

WordPressを使いたいけれど、OSやデータベースの管理はしたくない場合です。

その場合は、GCPのVMだけでなく、保守込みのWordPress向けホスティングも候補になります。WordPressを使うかと、自分でVMを管理するかは別の選択です。

## あとから移りやすくする準備

どちらを選んでも、将来の変更はあり得ます。

移行しやすくするため、最初に次をそろえておくと安心です。

1. 記事のURL形式を決める
2. タイトル、要約、公開日、更新日、カテゴリ、タグを統一する
3. 画像ファイルと代替テキストを整理する
4. 特定テーマ専用の装飾に依存しすぎない
5. 原稿と画像のバックアップを持つ
6. 移行時にURLが変わるなら301リダイレクトを用意する
7. canonicalとサイトマップを移行後に確認する

Cloudflare Pagesのデプロイ履歴やGitの履歴は、外部フォームの送信内容や別サービスのデータまで保存してくれるものではありません。データごとにバックアップ範囲を確認します。

## まとめ：料金表を見る前に更新方法を決める

私のように、少人数で記事とコードをCodexに見てもらい、MarkdownとGitで公開するなら、Cloudflare Pagesは始めやすい選択肢です。

一方、管理画面、複数人の権限、予約投稿、プラグインが必要なら、WordPressの便利さには理由があります。

比較する順番は次のとおりです。

1. 誰がどこから記事を更新するか
2. 予約、承認、会員、決済など何が必要か
3. 自分で保守できる範囲はどこまでか
4. その条件で料金と無料枠を確認する

この順番なら、「無料だから選んだのに必要な機能が足りない」「WordPressを入れたけれど管理画面を使わなかった」というずれを減らせます。

## 公開前に再確認した公式情報

確認日：2026年8月13日

| 確認項目 | 確認先 |
|---|---|
| Compute Engine無料枠の対象リージョン、e2-micro、標準永続ディスク | [Google Cloud Free Tier](https://docs.cloud.google.com/free/docs/free-cloud-features#compute) |
| Compute Engineのディスク課金と見積もり方法 | [Google Cloud ディスクとイメージの料金](https://cloud.google.com/compute/disks-image-pricing) |
| 外部IPv4などのネットワーク料金 | [Google Cloud VPC料金](https://cloud.google.com/vpc/network-pricing#ipaddress) |
| Pagesのビルド、ファイル、独自ドメイン、プロジェクト上限 | [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/) |
| 静的アセットとPages Functionsの扱い | [Cloudflare Pages Functions Pricing](https://developers.cloudflare.com/pages/functions/pricing/) |
| Workers Freeのリクエスト・CPU時間 | [Cloudflare Workers Pricing](https://developers.cloudflare.com/workers/platform/pricing/) |
| WordPressのユーザー権限 | [WordPress Roles and Capabilities](https://wordpress.org/documentation/article/roles-and-capabilities/) |
| WordPressプラグインの更新 | [WordPress Manage Plugins](https://wordpress.org/documentation/article/manage-plugins/) |

料金や上限は変わる可能性があります。導入時には、公式ページと実際の管理画面で再確認してください。
