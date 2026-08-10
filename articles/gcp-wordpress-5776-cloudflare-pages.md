---
title: "GCPでWordPressを作ろうとしたら月5,776円。Cloudflare Pagesと比較して見直した話"
description: "GCP Compute EngineでWordPressを作ろうとしたところ、東京リージョン・e2-medium・30GBディスクで月5,776円と表示されました。Cloudflare Pagesと比較し、AI中心の情報メディアに必要な構成を考え直した経緯を紹介します。"
publishedAt: "2026-08-11"
updatedAt: "2026-08-11"
category: "サイト構築"
tags:
  - "GCP"
  - "WordPress"
  - "Cloudflare Pages"
  - "Astro"
  - "Codex"
draft: false
---

新しく「AIエージェントナレッジ」をテーマにした情報メディアを作ろうと考えています。

取得したドメインは「e-life.site」です。まずCloudflareにドメインを登録し、次にGoogle CloudでWordPressを動かす構成を検討しました。

当初イメージしていた構成は、次のとおりです。

- Cloudflareでドメイン、SSL、CDN、セキュリティを管理する
- GCPのCompute EngineでWordPressを運用する
- 独自ドメイン「e-life.site」で公開する

構成としては実現できます。ただし、実際に設定を進めてデプロイ画面まで来たところで、「WordPressは本当に必要なのか」という別の疑問が出てきました。

今回はWordPressをデプロイしていません。この記事では、デプロイ前に表示された見積額をもとに、Cloudflare Pagesと比較して考え直した経緯をまとめます。

## GCPでWordPressのデプロイ画面まで進めてみた

GCPで「e-life-site」というプロジェクトを作成し、請求先アカウントを設定しました。

Google Cloud Marketplaceには「Click to Deploy WordPress」という仕組みがあります。WordPressの実行環境を、画面上の操作でCompute Engineへ配置できるものです。Googleも、Compute Engineへのワンクリック展開を低〜中程度のトラフィック向けとして案内しています。

[Google Cloud：WordPress on Google Cloud](https://cloud.google.com/wordpress)

必要なAPIを有効化し、新しいWordPressのデプロイ画面まで進みました。

選択した構成は次のとおりです。

| 項目 | 選択内容 |
|---|---|
| リージョン | 東京 |
| マシンシリーズ | E2 |
| マシンタイプ | e2-medium |
| メモリ | 4GB |
| ディスク | バランス永続ディスク30GB |
| WordPress | Google Click to Deploy |

この構成で画面に表示された見積もりは、次のとおりでした。

- Click to Deploy WordPressの使用料：0円
- VMインスタンス：月5,138円
- バランス永続ディスク30GB：月639円
- 月間推定合計額：5,776円

これは2026年8月11日に、私が選択した構成で表示された見積額です。すべての利用者に共通する固定料金ではありません。

なお、VMとディスクの個別表示を単純に足すと5,777円となり、画面の合計額と1円差があります。理由は確認できていないため、この記事では各欄に表示された金額をそのまま記載しています。

実際の運用では、外部IPv4アドレス、通信量、バックアップなどの費用が加わる可能性があります。たとえば、標準VMで使用中の外部IPv4は、2026年8月11日時点で1時間0.005米ドルです。

[Google Cloud：外部IPアドレス料金](https://cloud.google.com/vpc/network-pricing#ipaddress)

WordPress本体やClick to Deployの使用料が0円でも、WordPressを動かし続けるVMやディスクまで無条件に無料になるわけではありません。この段階で、その違いがはっきりしました。

## 「無料ではできないのか」と考え直した

月5,776円が高すぎると判断したわけではありません。今回選んだのは、東京リージョン、メモリ4GB、バランス永続ディスク30GBの構成です。

ただし、今回作ろうとしているのは、まだ記事もアクセスもない新しい情報メディアです。

そこで、次の疑問が出てきました。

> 立ち上げ時点から、毎月6,000円前後のサーバーが本当に必要なのだろうか。

GCPにはCompute Engineの常時無料枠があります。ただし、対象は米国の`us-west1`、`us-central1`、`us-east1`で動かす非プリエンプティブルのe2-micro 1台相当などです。標準永続ディスクは30GB・月、北米からの下り通信は1GB・月などの条件があります。

[Google Cloud：無料枠](https://docs.cloud.google.com/free/docs/free-cloud-features#compute)

今回選んだ東京リージョン、e2-medium、バランス永続ディスクは、この無料構成には該当しません。

e2-microのメモリは1GBです。WordPressを動かせるかどうかだけでなく、管理画面、テーマ、プラグイン、アクセス数を含めて余裕を判断する必要があります。

[Google Cloud：E2マシンタイプ](https://docs.cloud.google.com/compute/docs/general-purpose-machines)

「WordPressを使いながら、東京リージョンで今回の構成を完全無料にする」という条件ではないことが分かりました。

## そもそもWordPressは必須なのか

ここで、料金だけでなく、WordPressが必要になる状況から考え直しました。

WordPressが便利なのは、次のようなケースです。

- 管理画面から記事を投稿したい
- 複数の編集者や外部ライターで運営したい
- 下書き、予約投稿、承認、権限管理を使いたい
- WordPress専用テーマやプラグインを使いたい
- 会員サイトやECへ発展させたい
- コードやファイルを触らずに更新したい

反対に、記事作成やサイト更新をAIやCodexへ依頼する場合、WordPressの管理画面が必須とは限りません。

記事をMarkdownファイルとして保存し、変更のたびにサイト全体を自動生成する方法もあります。Markdownとは、見出しや箇条書きを簡単な記号で記述できる文章形式です。

今回作りたいのは「AIエージェントナレッジ」の情報メディアです。記事制作からサイト更新までAIを活用するなら、WordPress以外の構成も候補になります。

## Cloudflare Pagesという選択肢

そこで候補になったのがCloudflare Pagesです。

Cloudflare Pagesでは、Astroなどの静的サイトジェネレーターで作ったHTML、CSS、画像をCloudflareのネットワークから配信できます。

WordPressのように、記事が読まれるたびにPHPとデータベースを動かす必要はありません。静的ファイルを分散配信するため、常時稼働するWordPressサーバーの費用をなくし、表示も高速化しやすい構成です。

2026年8月11日時点のFreeプランには、主に次の範囲があります。

- Functionsを呼ばない静的ファイルへのリクエストは無料・無制限
- 月500回までビルド可能
- 1サイト最大20,000ファイル
- 1ファイル最大25MiB
- 1プロジェクト最大100件の独自ドメイン
- Pages Functionsの動的リクエストは、Workers Free枠と合算で1日100,000件

[Cloudflare Pages：制限](https://developers.cloudflare.com/pages/platform/limits/)

[Cloudflare Pages Functions：料金](https://developers.cloudflare.com/pages/functions/pricing/)

[Cloudflare Workers：無料枠の上限](https://developers.cloudflare.com/workers/platform/limits/#account-plan-limits)

静的な記事の閲覧数と、Pages Functionsの1日100,000件は別に考える必要があります。記事、画像、CSSなどをそのまま配信するだけなら、Functionsのリクエスト枠を消費しません。

1記事の公開につき1回ビルドすると仮定すれば、毎日数本を公開しても月500回には余裕があります。ただし、プレビューや記事以外の更新もビルド回数に含まれます。

記事、カテゴリー、タグ、サイトマップ、RSS、構造化データ、GA4、広告、アフィリエイトリンクなども実装できます。

お問い合わせや認証など、サーバー側の処理が必要な機能はPages Functionsや外部サービスを組み合わせます。サイト内検索は、小規模ならビルド時に検索索引を作り、大規模になったら外部検索サービスを検討できます。

一方で、WordPressのような完成された投稿管理画面は最初から用意されていません。ここが両者の大きな違いです。

## 比較すべきなのはサービス名より更新方法だった

正確に比較するなら、「GCP全体」と「Cloudflare Pages」ではなく、次の2構成です。

- GCP Compute Engine＋WordPress
- Cloudflare Pages＋Astroなどの静的サイトジェネレーター＋Markdown

主な違いを簡単にまとめると、次のようになります。

| 比較項目 | Compute Engine＋WordPress | Cloudflare Pages＋Astro＋Markdown |
|---|---|---|
| 月額費用 | VM、ディスク、IP、通信、バックアップ等 | 無料枠内なら静的ホスティング0円。外部サービス等は別 |
| 記事投稿 | WordPress管理画面 | MarkdownとGit |
| 複数人編集 | WordPressのユーザー権限 | GitHubの権限とレビュー |
| 予約・承認 | 標準機能で対応しやすい | GitHub Actions等で設計 |
| プラグイン | WordPress向けを利用可能 | コードまたは外部サービスで追加 |
| サーバー保守 | OS、PHP、DB、WordPress等 | OS、PHP、DB、WordPressの保守は不要 |
| AI・Codex | REST API等で連携可能 | テキストとコードの差分を直接編集しやすい |

WordPressは、管理画面から人が更新する運用に向いています。

Cloudflare Pagesは、ファイル、Git、AIを使って更新する運用に向いています。

判断基準になるのは、アクセス数だけではありません。

> 誰が、どの画面から、どのように記事を更新するのか。

この違いが、必要な仕組みと費用を決めます。

## 現時点ではCloudflare Pagesが有力

今回の「AIエージェントナレッジ」では、現時点でCloudflare Pagesが有力だと考えています。

理由は次のとおりです。

- Freeプランの範囲内なら静的ホスティング費用0円で始められる
- 新規メディアなので既存のWordPress資産がない
- AIやCodexによる記事制作と相性がよい
- OS、PHP、データベース、WordPressの保守が不要
- 静的ファイルのため表示を高速化しやすい
- Markdownで保存すれば将来の移行もしやすい

ここでいう0円はCloudflare Pagesの静的ホスティング部分です。独自ドメインの更新料、AI API、R2、外部フォーム、検索サービスなどは別に費用が発生する可能性があります。

また、PagesでもAstroやnpmパッケージなど、サイトを生成するためのソフトウェアは更新が必要です。「何も保守しなくてよい」という意味ではありません。

まだ、将来にわたってWordPressを使わないと決めたわけではありません。

外部ライターが増えたり、WordPress専用プラグインや会員機能が必要になったりすれば、WordPressを再検討できます。そのため、記事を特定サービスだけに閉じ込めず、Markdownなどの移行しやすい形式で管理します。

## まとめ

WordPress本体の使用料が0円でも、GCPのCompute Engineで動かすにはVMやディスクなどの費用が発生します。今回選んだ構成では、2026年8月11日に月5,776円の見積もりが表示されました。

一方、Cloudflare Pagesなら、静的な情報メディアをFreeプランから始められます。

- 管理画面、プラグイン、複数人編集を重視するならWordPress
- 静的ホスティング費用、表示速度、サーバー保守の少なさを重視するならCloudflare Pages
- AIやCodexを中心に更新するなら、Markdown＋Gitとの相性がよい
- 将来の変更に備え、記事データは移行しやすい形式で保存する

「情報メディアを作るなら、まずWordPress」と決めるのではなく、誰がどのように更新するかから必要な仕組みを選ぶ。

今回、デプロイ前に立ち止まって比較したことで、e-life.siteはCloudflare Pagesを有力候補として設計を進めることにしました。
