---
title: "GCPのWordPressとCloudflare Pagesを比較｜低コストな情報メディアに合うのはどちら？"
description: "GCP Compute Engine＋WordPressとCloudflare Pages＋Astro＋Markdownを、費用、保守、投稿、SEO、AIとの相性から比較します。"
publishedAt: "2026-08-11"
updatedAt: "2026-08-11"
category: "サイト構築"
tags:
  - "GCP"
  - "WordPress"
  - "Cloudflare Pages"
draft: true
---

# GCPのWordPressとCloudflare Pagesを比較｜低コストな情報メディアに合うのはどちら？

更新日：2026年8月11日

## タイトル案5個

1. GCPのWordPressとCloudflare Pagesを比較｜低コストな情報メディアに合うのはどちら？
2. WordPressは本当に必要？GCPとCloudflare Pagesの費用・運用を初心者向けに比較
3. 月5,776円のGCPか無料枠のCloudflare Pagesか｜情報メディアの作り方を比較
4. AIで記事を作るならどっち？Compute Engine＋WordPressとCloudflare Pages＋Astro
5. サーバー代を抑えてメディアを始める方法｜WordPressと静的サイトの選び方

## メタディスクリプション

GCP Compute Engine＋WordPressと、Cloudflare Pages＋Astro＋Markdownを初心者向けに比較。費用、無料枠、SEO、投稿、保守、複数人編集、AI・Codexとの相性を2026年8月11日時点の公式情報で解説します。

## 結論：AI中心の情報メディアなら、まずCloudflare Pagesが有力

新しい情報メディアで、記事作成やサイト更新をAI・Codexに任せ、固定費を抑えたいなら、最初は「Cloudflare Pages＋Astro＋Markdown」が有力です。静的な記事ページは高速に配信しやすく、サーバーやデータベースの更新作業もありません。

一方、ブラウザーの管理画面から非技術者が頻繁に投稿する、外部ライターごとに権限を分ける、標準機能で予約投稿する、といった運営にはWordPressが向きます。

ここで比べるのは「GCP全体」と「Cloudflare Pages」ではありません。具体的に次の2構成を比較します。

- A：GCP Compute Engineの1台の仮想マシンにWordPressを置く構成
- B：Cloudflare PagesでAstroなどが生成した静的ファイルを配信する構成

## GCPで月5,776円と表示されるまでの経緯

独自ドメイン「e-life.site」で「AIエージェントナレッジ」を扱う情報メディアを作るため、GCPプロジェクトを作成し、Google Click to DeployのWordPressデプロイ画面まで進みました。

選択したのは、東京リージョン、e2-medium、メモリ4GB、バランス永続ディスク30GBです。2026年8月11日に画面へ表示された月額見積もりは5,776円でした。内訳表示はVMが5,138円、ディスクが639円、Click to Deployの使用料が0円です。

これは全利用者共通の料金ではありません。リージョン、マシン、ディスク、為替、利用時間などで変わる、当該日時・構成の画面表示額です。内訳を単純合計すると総額と1円差がありますが、理由は確認できていないため、ここでは画面表示値をそのまま記載します。

Googleは、Compute EngineへのWordPressのワンクリック展開を「低〜中程度のトラフィック」向けとして案内しています（[Google Cloud公式](https://cloud.google.com/wordpress)）。ただし、無料なのはWordPress本体やClick to Deployの使用料であり、稼働するVMまで無条件に無料になるわけではありません。

見積額を見て「WordPressは本当に必要か」「無料ではできないか」と疑問を持ち、Cloudflare Pagesも候補に加えました。

## 比較対象となる2つの構成

### A：GCP Compute Engine＋WordPress

Compute EngineはGoogle Cloud上で仮想サーバーを借りるサービスです。その中でWordPressとデータベースを動かし、管理画面から記事を投稿します。

### B：Cloudflare Pages＋Astro＋Markdown

Astroは、Markdownで書いた原稿から公開用HTMLを生成できる静的サイトジェネレーターです。Markdownは、見出しを`#`、箇条書きを`-`で表す軽量な文章形式です。

生成済みのHTML、CSS、画像をCloudflare Pagesへ配置します。記事閲覧では通常、サーバー処理やデータベース照会を行いません。GitHubへの変更を自動公開でき、プルリクエストのプレビューも使えます（[Cloudflare公式](https://developers.cloudflare.com/pages/configuration/git-integration/)）。

## 比較一覧表

| 比較項目 | GCP Compute Engine＋WordPress | Cloudflare Pages＋Astro＋Markdown |
|---|---|---|
| 初期・月額費用 | WordPress本体は無料。VM、ディスク、外部IPv4、通信、バックアップ等は課金対象になり得る | 静的配信は無料枠で月額0円運用が可能。ドメイン代や外部サービスは別 |
| 無料枠 | 条件が狭い。東京・e2-medium・バランスディスクは常時無料枠の組み合わせではない | [月500ビルド、2万ファイル、1ファイル25MiBまで](https://developers.cloudflare.com/pages/platform/limits/) |
| 表示速度 | キャッシュやCDN設定で高速化できるが、未調整ではPHP・DB処理の影響を受ける | 静的ファイルをCloudflareの分散ネットワークから配信 |
| セキュリティ | OS、WordPress、テーマ、プラグイン、管理画面を継続管理 | 公開部分にDBやWordPress管理画面がなく、攻撃対象を減らしやすい |
| サーバー保守 | OS更新、監視、障害対応、容量管理が必要 | 配信サーバーのOS保守は不要 |
| バックアップ | DB、アップロード画像、設定、ディスクを設計して保存 | 原稿・コードはGitで履歴化。過去の本番デプロイへロールバック可能 |
| 記事投稿 | ブラウザーの管理画面 | Markdownを編集してGitへ反映 |
| 複数人編集 | ユーザーと権限を管理画面で設定しやすい | GitHubのブランチ、レビュー、権限で管理 |
| 予約・承認 | 予約投稿、下書き、レビュー待ち、役割が標準で使いやすい | GitHub Actions等で自作。標準の編集画面はない |
| プラグイン | SEO、フォーム、ECなど豊富 | WordPressプラグインは使えない。機能をコードや外部サービスで追加 |
| SEO | プラグインで設定しやすい | title、canonical、構造化データ、サイトマップ等を実装・自動生成 |
| 問い合わせ | フォーム系プラグインを利用可能 | 外部フォームまたはPages Functionsで処理 |
| サイト内検索 | WordPress標準検索や検索プラグイン | 小規模ならビルド時索引、大規模なら外部検索サービス |
| アクセス増加 | VM増強、キャッシュ、CDN、DB分離などを検討 | 静的閲覧は自動的に分散配信。動的処理は別途上限管理 |
| 移行 | DB・テーマ・プラグイン依存の整理が必要 | Markdownと画像を保持すれば他環境へ移しやすい |
| AI・Codex | REST APIや管理画面自動化が可能だが、認証と本番更新に注意 | テキストとコードの差分をAIが編集・テストしやすい |

## GCP＋WordPressのメリット・デメリット

最大のメリットは、完成度の高いCMS（コンテンツ管理システム）をすぐ使えることです。編集者、投稿者、寄稿者などの権限を分け（[WordPress公式](https://wordpress.org/documentation/article/roles-and-capabilities/)）、予約投稿やレビュー待ちも管理画面から設定できます（[WordPress公式](https://wordpress.org/documentation/article/page-post-settings-sidebar/)）。

SEO、キャッシュ、フォーム、ECなどをプラグインで追加できる点も強みです。ただし、プラグインは機能追加と同時に更新対象にもなります。WordPress公式も、セキュリティと性能のためプラグインを最新に保つよう案内しています（[WordPress公式](https://wordpress.org/documentation/article/manage-plugins/)）。

Compute Engineでは、VM内部の運用は利用者側に残ります。長期間動かすVMには定期的なOS更新が必要です（[Google Cloud公式](https://docs.cloud.google.com/compute/vm-manager/docs/patch)）。WordPress、テーマ、プラグイン、PHP、データベース、バックアップ、障害復旧も管理します。

料金面では、ディスク容量は未使用部分を含む確保容量に課金され、スナップショットには別料金が発生します（[Google Cloud公式](https://cloud.google.com/compute/disks-image-pricing)）。標準VMで使用中の外部IPv4は2026年8月11日時点で1時間0.005米ドルです（[Google Cloud公式](https://cloud.google.com/vpc/network-pricing#ipaddress)）。通信量も条件により課金されます。

## Cloudflare Pagesのメリット・デメリット

静的な記事、カテゴリ、タグ、著者ページ、パンくず、RSS、サイトマップ、構造化データ、関連記事まで作れます。記事を読むだけならPages Functionsを動かす必要はありません。Cloudflare公式では、Functionsを呼ばない静的アセットへのリクエストは無料かつ無制限です（[Cloudflare公式](https://developers.cloudflare.com/pages/functions/pricing/#static-asset-requests)）。

配信ファイルは標準でTiered Cacheから提供され、GzipやBrotli圧縮にも対応します（[Cloudflare公式](https://developers.cloudflare.com/pages/configuration/serving-pages/#caching-and-performance)）。静的閲覧では1台のサーバー負荷を心配しにくい構成です。

反面、投稿管理画面は標準ではありません。非技術者が投稿するには、GitHubでMarkdownを編集する、Git対応CMSを加えるなどの準備が必要です。予約投稿や承認もGitHub Actions、ブランチ保護、プルリクエストで設計します。

お問い合わせ、ログイン、コメント、会員情報の保存は「動的機能」です。Pages Functionsならフォーム処理や認証を追加できます（[Cloudflare公式](https://developers.cloudflare.com/pages/functions/)）が、そのリクエストはWorkers枠として数えます。静的配信の無制限枠とは別です。

## WordPressが必須になるケース

次の条件が多いなら、WordPressを選ぶ理由があります。

- 非技術者がブラウザーだけで記事や画像を投稿したい
- 外部ライターが多く、寄稿者・編集者・管理者の権限を分けたい
- 予約投稿、下書き、承認待ち、リビジョン復元をすぐ使いたい
- 既存のWordPressテーマやプラグインが運営要件になっている
- コメント、会員、決済、ECなどをプラグイン中心で構築したい
- エンジニアを介さず管理画面で設定変更したい

逆に、記事更新をAI・Codexと少人数で行い、公開前にGitの差分を確認できるなら、WordPressは必須ではありません。

## Cloudflare Pages無料枠でできること

2026年8月11日時点のFreeプランは、月500ビルド、同時ビルド1件、1ビルド最大20分、プロジェクトごとに独自ドメイン100件です。1サイトは最大2万ファイル、1ファイルは最大25MiBです（[Cloudflare公式](https://developers.cloudflare.com/pages/platform/limits/)）。

1回の記事公開で1ビルドすると仮定すれば、月500回、平均約16回/日の更新余地があります。ただし、プレビューや記事以外の更新もビルドを消費します。

記事数は公式に決まっていません。1記事につきHTML 1点と固有画像3点なら、共有ファイルを除く理論値は約5,000記事です。実際にはカテゴリ、CSS、JavaScript、OGP画像なども含むため、設計により変わります。

25MiBを超える動画や配布ファイルはPagesへ直接置けません。公式は大容量ファイルにR2を案内していますが、別途料金・上限の確認が必要です。画像はWebPやAVIFへ最適化し、動画は外部へ分離します。

Pages FunctionsはWorkers Free枠を共有し、無料枠は1日10万リクエスト、HTTPリクエスト当たりCPU時間10ms、メモリ128MBです（[Cloudflare公式](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits)）。静的記事の閲覧数にはこの10万件/日は適用されません。フォームや認証など、Functionsを呼ぶ動的リクエストだけを分けて見積もります。

## 読者タイプ別のおすすめ

- **費用0円を最優先する人**：Cloudflare Pages。ドメイン、AI API、外部フォーム、R2等は別料金です。
- **WordPress管理画面を使いたい人**：GCP＋WordPress。初心者は保守込みのWordPress専用ホスティングも比較します。
- **複数の外部ライターで運営する人**：管理画面派ならWordPress、GitHubを使えるならPagesです。
- **AIやCodex中心で更新する人**：Pages＋Markdown。AIが記事ファイル、内部リンク、構造化データ、テストを一つの変更として扱えます。
- **将来、会員サイトやECへ発展させる人**：プラグイン中心ならWordPress。Pagesでは動的機能の別設計が必要です。
- **月間アクセス増加を想定する人**：閲覧中心ならPages。WordPressはCDN、キャッシュ、VM・DBの増強で対応します。

## e-life.siteの「AIエージェントナレッジ」に適した構成

現段階では、Cloudflare Pages＋Astro＋Markdownを推奨します。

記事はMarkdownで保存し、タイトル、説明文、公開日、更新日、著者、カテゴリ、タグをフロントマター（本文冒頭の機械可読な記事情報）として持たせます。

公開フローは「AIが下書き → Codexが出典・SEOを検査 → 人がプレビュー確認 → mainへ反映 → 公開」です。PagesはプルリクエストごとにプレビューURLを作れます（[Cloudflare公式](https://developers.cloudflare.com/pages/configuration/preview-deployments/)）。

検索はビルド時に作る軽量な索引から始めます。問い合わせは外部フォーム、または`/api/contact`だけをFunctionsで動的にします。

## 将来WordPressへ移行できる設計

移行しやすさは、最初のデータ設計で決まります。

1. 記事本文は装飾専用HTMLを増やさず、標準的なMarkdownで保存する
2. slug、公開日、更新日、著者、カテゴリ、タグ、要約、OGP画像を全記事で統一する
3. URLを`/articles/slug/`などに固定し、移行後も同じURLを使う
4. 画像のファイル名と代替テキストを記事データで管理する
5. 独自の短縮コードに依存しすぎない
6. WordPressへ移す際はREST APIで記事・画像・分類を投入し、差分を検証する
7. URLが変わる場合だけ301リダイレクトを作り、canonicalとサイトマップを更新する

Pagesは過去の本番デプロイへ即時に戻せます（[Cloudflare公式](https://developers.cloudflare.com/pages/configuration/rollbacks/)）。ただし、Git外のフォームデータや外部サービスは個別にバックアップします。

## まとめ

WordPress本体が無料でも、Compute Engineで動かせばVM、ディスク、外部IPv4、通信、バックアップなどに費用が発生し得ます。GCPの常時無料枠は、米国の`us-west1`、`us-central1`、`us-east1`にある非プリエンプティブルe2-micro 1台相当、標準永続ディスク30GB・月、北米からの下り通信1GB・月などが条件です（[Google Cloud公式](https://docs.cloud.google.com/free/docs/free-cloud-features#compute)）。東京リージョンのe2-medium＋バランスディスク30GBは、この無料構成には該当しません。

Cloudflare Pagesは、情報を読むための静的サイトを無料枠内でかなり大きく育てられます。ただし、管理画面、予約投稿、細かな権限、会員・EC機能は自動では付いてきません。

e-life.siteでは、まずPages＋Astro＋MarkdownでAIエージェントナレッジを公開し、運営人数や動的機能が増えた時点でWordPressまたは別のCMSを再評価するのが、固定費と移行余地のバランスがよい選択です。

## 事実確認チェックリスト

確認日：2026年8月11日

| 変動し得る項目 | 記事で使用した値・条件 | 公式出典 |
|---|---|---|
| GCP画面見積もり | 東京、e2-medium、4GB、バランスディスク30GBで総額5,776円/月。VM 5,138円、ディスク639円、Click to Deploy 0円 | 当日の本人確認画面。一般料金としては不使用。構成説明は[Google Cloud WordPress](https://cloud.google.com/wordpress) |
| Google Cloud無料トライアル | 新規対象者は300米ドル、90日 | [Google Cloud Free Program](https://docs.cloud.google.com/free/docs/free-cloud-features) |
| Compute Engine常時無料枠 | 米国3リージョンのe2-micro 1台相当、標準永続ディスク30GB・月、北米発の下り1GB・月など | [Google Cloud Free Tier](https://docs.cloud.google.com/free/docs/free-cloud-features#compute) |
| 外部IPv4 | 標準VMで使用中は0.005米ドル/時。無料使用は月1時間/アカウント | [Google Cloud VPC料金](https://cloud.google.com/vpc/network-pricing#ipaddress) |
| ディスク・スナップショット | 確保したディスク容量に課金。スナップショットは別料金 | [Google Cloudディスク料金](https://cloud.google.com/compute/disks-image-pricing) |
| Pagesビルド | Freeは月500回、同時1件、最大20分 | [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/#builds) |
| Pages独自ドメイン | Freeは1プロジェクト100件 | [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/#custom-domains) |
| Pagesファイル | Freeは1サイト2万ファイル、1ファイル25MiB | [Cloudflare Pages Limits](https://developers.cloudflare.com/pages/platform/limits/#files) |
| Pages静的リクエスト | Functionsを呼ばない静的配信は無料・無制限 | [Cloudflare Pages Functions Pricing](https://developers.cloudflare.com/pages/functions/pricing/#static-asset-requests) |
| Pages Functions | Workers Free枠と共有して1日10万リクエスト。午前0時UTCにリセット | [Cloudflare Pages Functions Pricing](https://developers.cloudflare.com/pages/functions/pricing/#free-plan) |
| Workers Free実行上限 | HTTP 1リクエスト当たりCPU 10ms、メモリ128MB、サブリクエスト50件 | [Cloudflare Workers Limits](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits) |

料金や上限は変更される可能性があります。導入時には、上表の公式ページと実際の管理画面で再確認してください。
