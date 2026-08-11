---
title: "VercelとWordPressは何が違う？併用方法とサーバー選びをCodexと整理した"
description: "VercelとWordPressの違い、Headless WordPressとして併用する仕組み、メリット・デメリット、WordPress用サーバーの選び方を初心者目線で整理します。"
publishedAt: "2026-08-11T09:05:00+09:00"
updatedAt: "2026-08-11T09:05:00+09:00"
category: "サイト構築"
tags:
  - "Vercel"
  - "WordPress"
  - "Next.js"
  - "Headless CMS"
  - "Codex"
image: "/og/vercel-wordpress-headless.png"
imageAlt: "VercelとWordPressの違いをCodexと整理する40代男性のイラスト"
draft: false
---

前回、GCPでWordPressを作ろうとしたときの見積もりをきっかけに、[このブログをCloudflare Pagesで始めた経緯](/articles/gcp-wordpress-5776-cloudflare-pages/)を書きました。

その後、次に気になったのがVercelです。

「VercelとWordPressは何が違うのか」

「WordPressの記事をVercelで表示することはできるのか」

「その場合、WordPressはどのサーバーに置けばよいのか」

この3点をCodexと壁打ちして整理しました。

なお、今回はVercelとWordPressを実際に接続し、運用まで試した記事ではありません。私がCodexへ相談した内容と、公式情報で確認できた範囲を分けてまとめています。

先に結論を言うと、VercelとWordPressは同じ種類のサービスではありません。どちらか一方を選ぶだけでなく、役割を分けて併用する方法もあります。

ただし、併用すれば必ず速く、安く、簡単になるわけではありません。普通のブログならWordPress単体のほうが運営しやすい場合もあります。

## VercelとWordPressは、そもそも役割が違う

Vercelは、Next.jsなどで作ったWebサイトやアプリをビルドし、公開するためのプラットフォームです。Gitへ変更を反映すると自動でデプロイでき、公開前の確認用URLも作れます。

[Vercel公式：Deploying to Vercel](https://vercel.com/docs/deployments/overview)

WordPressは、記事、固定ページ、画像、カテゴリーなどを管理するCMSです。一般的な使い方では、管理画面だけでなく、読者が見るページもWordPressが生成します。

簡単に分けると、次のようになります。

| 項目 | Vercel | WordPress |
|---|---|---|
| 主な役割 | Webサイトやアプリのビルド・公開・配信 | 記事や画像などの管理 |
| 得意なこと | Next.jsとの連携、独自画面、Webアプリ、プレビュー | 管理画面からの投稿、権限管理、プラグイン |
| 記事管理画面 | 標準ではない | ある |
| PHP・MySQL型のWordPress | そのままは設置できない | 別途、対応サーバーが必要 |

<img src="/images/articles/vercel-wordpress/roles.webp" alt="Webサイトの公開基盤と記事管理システムが別の役割を持ち、連携できることを示すイラスト" width="1200" height="658" loading="lazy" decoding="async">

つまり、VercelはWordPress向けレンタルサーバーの代わりではありません。

通常のWordPressを使う場合は、PHPとMySQLが動くサーバーが必要です。Vercelと併用するときも、WordPress本体を置く場所は別に用意します。

## VercelとWordPressを併用する「Headless WordPress」とは

WordPressを記事管理だけに使い、読者が見るサイトをNext.jsなどで作る方法を、Headless WordPressと呼びます。

役割分担は次のとおりです。

1. ライターや管理者がWordPressの管理画面で記事を書く
2. Next.jsがWordPress REST APIから記事データを取得する
3. VercelがNext.jsのサイトを公開する
4. 読者はVercel側のページを見る

WordPressには、投稿、固定ページ、カテゴリー、タグ、画像などをJSON形式で取得できるREST APIがあります。

[WordPress公式：REST API Reference](https://developer.wordpress.org/rest-api/reference/)

構成を一行で表すと、次のようになります。

> WordPress用サーバー（記事・画像・管理画面） → REST API → Next.js → Vercel（読者が見るサイト）

<img src="/images/articles/vercel-wordpress/headless-flow.webp" alt="WordPressの記事データがAPIを通り、Vercel側のWebサイトとしてパソコンやスマートフォンへ届く流れ" width="1200" height="658" loading="lazy" decoding="async">

記事を公開したあと、Vercel側へ変更を反映する仕組みも必要です。サイト全体を再ビルドする方法のほか、WebhookとNext.jsのキャッシュ再検証を組み合わせ、変更したページだけを更新する方法もあります。

## VercelとWordPressを併用するメリット

<img src="/images/articles/vercel-wordpress/benefits.webp" alt="WordPressで記事を管理しながら、自由な画面やAI機能を持つサイトを利用者へ届けるイラスト" width="1200" height="800" loading="lazy" decoding="async">

### WordPressの管理画面を残せる

記事を書く人は、使い慣れたWordPress管理画面を利用できます。下書き、予約投稿、ユーザー権限、リビジョンなども使えます。

表側をNext.jsで作っても、記事制作までGitやコードに変える必要はありません。

### 表示側を自由に作れる

WordPressテーマの構造に縛られず、Next.js側で画面を設計できます。

独自のLP、料金シミュレーター、診断コンテンツ、会員画面、AI機能など、記事以外の機能を組み込みたいときに向いています。

### 高速化しやすい

記事を事前にHTMLとして生成したり、必要なページだけキャッシュしたりできます。読者がページを開くたびにWordPressのPHPとデータベースを動かさない構成にできるため、表示を安定させやすくなります。

ただし、Headless WordPressにしただけで自動的に速くなるわけではありません。WordPress APIの応答、Next.jsの表示方式、画像サイズ、外部スクリプトなどの設計は必要です。

### WordPressの公開範囲を分けやすい

読者が見るサイトとWordPressの管理画面を分けられます。WordPressが生成する通常の表側ページを使わず、管理画面やAPIへのアクセスを必要な範囲に絞る設計もできます。

ただし、WordPress本体がなくなるわけではありません。WordPress、プラグイン、PHP、データベースの更新、認証、バックアップは引き続き必要です。

## 併用するデメリット

一番大きなデメリットは、WordPress単体より構成が複雑になることです。

<img src="/images/articles/vercel-wordpress/cautions.webp" alt="WordPress側とVercel側の2つの環境を見比べながら、連携やキャッシュの問題を調べるイラスト" width="1200" height="800" loading="lazy" decoding="async">

### 2つの環境を保守する必要がある

WordPress側では、本体、プラグイン、PHP、データベースを管理します。

WordPress公式も、本体やプラグインを最新に保ち、更新前にバックアップするよう案内しています。

[WordPress公式：Updating WordPress](https://wordpress.org/documentation/article/updating-wordpress/)

[WordPress公式：Manage Plugins](https://wordpress.org/documentation/article/manage-plugins/)

Vercel側では、Next.js、npmパッケージ、API連携、環境変数、キャッシュなどを管理します。問題が起きたときも、どちら側が原因かを切り分けなければなりません。

### プラグインの表示機能をそのまま使えない

WordPress単体なら、目次、関連記事、人気記事、フォーム、サイト内検索、SEO設定などをプラグインで追加できます。

Headless構成では、プラグインを入れただけでVercel側の画面に機能が出るとは限りません。プラグインが持つデータをAPIで取得し、Next.js側で表示を作る必要があります。

特に、テーマの見た目を変えるプラグインや、WordPressの画面内で動く機能は、そのまま移せないと考えたほうが安全です。

### 下書きプレビューに設定が必要

WordPressの「プレビュー」ボタンを押しただけでは、Vercel側の下書き画面が自動で開くとは限りません。

Next.jsにはHeadless CMSの下書きを確認するDraft Modeがありますが、WordPressの認証やプレビューURLとの連携を実装する必要があります。

[Next.js公式：Draft Mode](https://nextjs.org/docs/app/api-reference/functions/draft-mode)

### 記事更新とキャッシュのずれが起きることがある

WordPressで公開したのにVercel側が古いまま、という状態も起こり得ます。

Webhook、再ビルド、キャッシュ再検証が正しく動いているかを確認し、失敗時に気づけるようにする必要があります。

### SEOもNext.js側で実装する

タイトル、メタディスクリプション、canonical、OGP、構造化データ、パンくず、サイトマップ、リダイレクトなどは、読者が見るNext.js側へ正しく出力します。

WordPressのSEOプラグインへ入力した情報も、APIから取得してNext.js側に反映する処理がなければ、公開ページには表示されません。

## Vercelの料金で見落としやすい点

Vercelには無料のHobbyプランがありますが、公式案内では非商用の個人利用向けです。

Vercelの基準では、広告を掲載するサイト、商品を販売するサイト、報酬を受けて制作・運用するサイト、アフィリエイトを主目的とするサイトなどは商用利用に当たります。商用利用にはProまたはEnterpriseプランが必要です。

[Vercel公式：Hobby Plan](https://vercel.com/docs/plans/hobby)

[Vercel公式：Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage)

「Vercelなら無料」と決めつけず、サイトの目的と最新の利用条件を確認することが大切です。Vercelの費用に加えて、WordPress用サーバー、ドメイン、画像配信、外部サービスの費用も考えます。

## WordPress用サーバーはどう選ぶ？

WordPressをCMSとして使うだけなら、最初からGCPのようなクラウドを自分で構築する必要はありません。

<img src="/images/articles/vercel-wordpress/hosting-options.webp" alt="レンタルサーバー、マネージドWordPress、クラウドの3つの選択肢を比較するイラスト" width="1200" height="800" loading="lazy" decoding="async">

GCP、AWSなどでも運用できますが、仮想マシン、データベース、バックアップ、監視、障害対応まで自分たちで設計する範囲が増えます。

小〜中規模のブログやメディアなら、まずWordPress対応のレンタルサーバーやマネージドWordPressを比較するほうが分かりやすいです。

候補の種類は、次の3つに分けられます。

| 選択肢 | 向いているケース | 注意点 |
|---|---|---|
| 国内レンタルサーバー | 小さく始めたい、費用を抑えたい | REST API、Webhook、WAFの相性を確認 |
| マネージドWordPress | 保守や障害対応の負担を減らしたい | 月額料金、アクセス・通信量の上限を確認 |
| GCP・AWSなどのクラウド | 特別なネットワーク要件や細かな構成管理が必要 | 構築・監視・復旧を行う知識と時間が必要 |

具体的なサービス名では、国内レンタルサーバーに[エックスサーバー](https://www.xserver.ne.jp/)、[ConoHa WING](https://www.conoha.jp/wing/)、[さくらのレンタルサーバ](https://rs.sakura.ad.jp/)、[mixhost](https://mixhost.jp/)などがあります。マネージドWordPressには[Kinsta](https://kinsta.com/jp/wordpress-hosting/)、[WP Engine](https://wpengine.com/)などがあります。

これは順位ではなく、比較候補の例です。料金や機能は変わるため、契約時に公式情報を確認します。

Headless WordPress用として確認したいポイントは、次のとおりです。

- WordPress REST APIへ外部から安定してアクセスできるか
- SSLを簡単に設定できるか
- WAFや海外アクセス制限がVercelからのAPI通信を止めないか
- WordPressからWebhookを送信できるか
- Web、画像、データベースの自動バックアップと復元があるか
- ステージング環境を作れるか
- APIの応答が遅すぎないか
- アクセス増加時の上限や追加料金が分かりやすいか

REST APIはWordPressの標準機能ですが、サーバーのWAFやセキュリティ設定によっては通信が止まる場合があります。契約前に、利用予定の構成をサポートへ確認すると安心です。

## 結局、どの構成を選べばよい？

記事投稿とSEO運用が中心なら、最初はWordPress単体で十分です。

管理画面、テーマ、プラグインをそのまま使えるため、開発する部分を減らせます。

一方、次の条件が多いなら、VercelとWordPressの併用を検討する価値があります。

- ライターはWordPressで記事を書きたい
- 表側はNext.jsで自由に作りたい
- 記事とWebアプリを同じサイトで提供したい
- 独自のLP、診断、AI機能を組み込みたい
- 複数のサイトやアプリへ同じ記事データを配信したい
- WordPressとNext.jsの両方を保守できる人がいる

大切なのは、「VercelとWordPressのどちらが優れているか」ではありません。

> 誰が記事を書き、どこまで独自機能が必要で、誰が2つの環境を保守するのか。

ここを先に決めると、選びやすくなります。

## まとめ：普通のブログなら、最初から併用しなくてもよい

Codexと壁打ちして分かったのは、VercelとWordPressは競合というより、役割の違うサービスだということです。

- VercelはNext.jsなどのサイトやアプリを公開する基盤
- WordPressは記事や画像を管理するCMS
- WordPressをCMS、Vercelを表示側として併用できる
- 併用時もWordPress用サーバーは別に必要
- Headless構成では、プレビュー、キャッシュ、SEO、プラグイン機能の連携が必要
- Vercelの無料Hobbyプランは非商用の個人利用向け
- 普通のブログならWordPress単体のほうが簡単な場合も多い

最初から複雑な構成にせず、必要な機能に合わせて小さく始めるのが現実的です。

記事運用だけならWordPress単体。独自画面やWebアプリ機能が必要になったら、Vercelとの併用を検討する。この順番なら、目的が曖昧なまま開発コストだけが増えるのを避けやすいと感じました。

※この記事は、2026年8月11日時点の公式情報と、Codexとの壁打ち内容をもとに整理しています。料金、上限、利用条件は変更される可能性があるため、導入前に各サービスの公式ページをご確認ください。
