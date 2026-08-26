---
title: "VercelとWordPressは何が違う？併用前に知りたい仕組み・料金・判断基準"
description: "VercelとWordPressの役割の違い、Headless WordPressとして併用する仕組み、料金と運用上の注意点を、未接続の調査範囲を明示して初心者向けに整理します。"
personalLead: "WordPressとVercelを同じ種類のサービスだと思い、調べるほど分からなくなりました。私が混乱した順番から、役割の違いを整理します。"
publishedAt: "2026-08-11T09:05:00+09:00"
updatedAt: "2026-08-26T23:54:00+09:00"
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
readerState:
  - "WordPressは知っているが、Vercelが何をするサービスなのか分からない"
  - "WordPressの記事をVercelで表示できるのか知りたい"
  - "Headless WordPressを選ぶべきか、普通のWordPressで十分か迷っている"
quickAnswer: |-
  記事投稿が中心なら、まずはWordPress単体が分かりやすい。
  VercelとWordPressの併用は、WordPressの投稿画面を残しながらNext.jsで独自の表示やWebアプリ機能を作りたいときの選択肢。
  ただし、WordPress用サーバーは別に必要で、表示更新・プレビュー・SEO・保守も自分たちでつなぐ必要がある。
articleSteps:
  - "VercelとWordPressの役割の違いを知る"
  - "併用したときの記事表示までの流れを確認する"
  - "料金と保守範囲を含めて、自分に必要な構成を選ぶ"
experienceScope: "私はVercelとWordPressを実際には接続していません。この記事は、このブログをCloudflare Pagesで運営している経験を背景に、Codexとの壁打ちと2026年8月13日時点のVercel・Next.js・WordPress公式資料をもとに整理した調査記事です。"
factCheckedAt: "2026-08-13T00:00:00+09:00"
copyPrompt:
  label: "自分のサイト構成を整理するための指示"
  text: "私はWebサイト構築の初心者です。次の条件をもとに、WordPress単体と、WordPress＋Next.js＋Vercelのどちらが向いているか整理してください。条件：サイトの目的／収益化の有無／記事を更新する人／必要な独自機能／月額予算／保守できる人／更新を反映したい速さ。最初に結論を示し、理由、必要な費用項目、導入前に公式ページで確認すべき点、まだ不明な点を分けてください。料金や仕様は推測せず、確認日と公式URLを添えてください。"
faq:
  - question: "Vercelだけで普通のWordPressは動かせる？"
    answer: "一般的なPHPとデータベースで動くWordPress本体を、Vercelへそのまま設置する構成ではありません。併用する場合も、WordPress本体を動かす対応サーバーが別に必要です。"
  - question: "VercelのHobbyプランで収益ブログは公開できる？"
    answer: "2026年8月13日時点の公式案内では、Hobbyは個人の非商用利用向けです。広告掲載や、アフィリエイトが主目的のサイトなどは商用利用の例に含まれます。判断が曖昧なら、公開前にVercelへ確認するのが安全です。"
  - question: "Headless WordPressにすると必ず速くなる？"
    answer: "必ずではありません。静的生成やキャッシュを活用しやすい一方、WordPress APIの応答、画像、外部スクリプト、Next.jsの実装によって結果は変わります。公開後の計測が必要です。"
  - question: "WordPressで公開した記事はVercel側へすぐ反映される？"
    answer: "自動では決まりません。再ビルド、時間指定の再検証、Webhookを使ったオンデマンド再検証など、更新方法を実装します。方式によっては次のアクセス時に再生成されるため、公開後の確認も必要です。"
  - question: "初心者はどちらから始めればいい？"
    answer: "記事投稿が中心なら、まずWordPress単体から始めるほうが管理箇所を減らせます。独自画面や診断、会員機能などが必要になり、開発と保守を担当できる人がいる段階で併用を検討するのが現実的です。"
---

GCPでWordPressを作ろうとしたときの見積もりをきっかけに、[このブログをCloudflare Pagesで始めた経緯](/articles/gcp-wordpress-5776-cloudflare-pages/)を書いたあと、Vercelが気になりました。

「WordPressの代わりになるの？」

「記事だけWordPressで書いて、表示はVercelにできるの？」

## まず明記しておきたい、私が試した範囲

私はこのブログをCloudflare Pagesで公開していますが、**VercelとWordPressを実際に接続したことはありません**。

この記事で私がしたことは、次の範囲です。

- 自分が分からなかった点をCodexと整理した
- Vercel、Next.js、WordPressの公式資料を確認した
- どんな場合に併用が必要になりそうかを比較した

一方、次のことはまだ試していません。

- WordPress REST APIからNext.jsへ実データを取得する
- WordPressの公開操作をきっかけにVercel側を更新する
- 下書きプレビューや認証を設定する
- 実際の表示速度や月額費用を測る

ここから先は、実体験の結果ではなく、**2026年8月13日時点の公式情報をもとにした導入前の整理**として読んでください。

## 併用を考えるのは、独自機能が必要なとき

記事投稿が中心のブログなら、最初はWordPress単体のほうが分かりやすいです。

WordPressには、記事を書く管理画面と、読者へページを見せる仕組みの両方があります。テーマやプラグインも使えるので、管理する場所を一つにできます。

Vercelとの併用を考えたいのは、次のような場合です。

- 記事を書く人にはWordPressの管理画面を使ってもらいたい
- 読者が見る画面はNext.jsで自由に作りたい
- 記事と一緒に、診断、会員画面、料金計算、AI機能などを提供したい
- WordPressとNext.jsの両方を保守できる人がいる

併用は「簡単にする方法」ではなく、**必要な自由度と引き換えに管理する範囲を増やす方法**だと理解すると、選びやすくなりました。

## VercelとWordPressは何が違う？

Vercelは、Next.jsなどで作ったWebサイトやアプリをビルドし、公開・配信するためのプラットフォームです。

Gitリポジトリを接続した場合、ブランチへの変更やプルリクエストをきっかけにデプロイできます。公開前に確認できるPreview環境と、本番用のProduction環境も用意されています。

[Vercel公式：Deploying to Vercel](https://vercel.com/docs/deployments/overview)

WordPressは、記事、固定ページ、画像、カテゴリーなどを管理するCMSです。一般的な使い方では、管理画面だけでなく、読者が見るページもWordPressが生成します。

| 比べる点 | Vercel | WordPress |
|---|---|---|
| 主な役割 | Webサイトやアプリのビルド・公開・配信 | 記事や画像などの管理とページ生成 |
| 得意なこと | Next.jsとの連携、独自画面、Webアプリ、確認用デプロイ | 管理画面からの投稿、権限、テーマ、プラグイン |
| 記事投稿の管理画面 | 標準では用意されない | 用意されている |
| 一般的なWordPress本体 | そのまま置く構成ではない | PHPとデータベースに対応するサーバーで動かす |

<img src="/images/articles/vercel-wordpress/roles.webp" alt="Webサイトの公開基盤と記事管理システムが別の役割を持ち、連携できることを示すイラスト" width="1200" height="658" loading="lazy" decoding="async">

つまり、Vercelを契約すればWordPress用サーバーが不要になる、という話ではありません。

## Headless WordPressとして併用する流れ

WordPressを記事管理に使い、読者が見る画面をNext.jsなどで別に作る構成は、Headless WordPressと呼ばれます。

大まかな流れは次のとおりです。

1. WordPressの管理画面で記事を書く
2. Next.jsがWordPress REST APIから記事データを取得する
3. VercelがNext.jsのサイトを公開する
4. 読者はVercel側のページを見る

WordPressのREST APIでは、投稿、固定ページ、カテゴリー、タグ、メディアなどの情報を取得できます。

[WordPress公式：REST API Reference](https://developer.wordpress.org/rest-api/reference/)

構成を一行にすると、こうなります。

> WordPress用サーバー（記事・画像・管理画面） → REST API → Next.js → Vercel（読者が見るサイト）

<img src="/images/articles/vercel-wordpress/headless-flow.webp" alt="WordPressの記事データがAPIを通り、Vercel側のWebサイトとしてパソコンやスマートフォンへ届く流れ" width="1200" height="658" loading="lazy" decoding="async">

ここで私が最初に見落としていたのが、記事を取得するだけでは完成しない点です。

タイトルや本文だけでなく、画像、著者、カテゴリー、公開日時、SEO用の情報をどう受け渡すか。WordPressで記事を更新したあと、Next.js側をいつ更新するか。下書きを誰がどう確認するか。

この「間をつなぐ部分」を自分たちで決める必要があります。

## 併用でできること

<img src="/images/articles/vercel-wordpress/benefits.webp" alt="WordPressで記事を管理しながら、自由な画面やAI機能を持つサイトを利用者へ届けるイラスト" width="1200" height="800" loading="lazy" decoding="async">

### 記事を書く場所はWordPressのままにできる

記事を書く人はWordPressの管理画面を使えます。

表側をNext.jsで作っても、記事制作までGitやコードへ変える必要はありません。複数人で記事を作る場合に、WordPressの権限や下書き管理を残せるのは分かりやすい利点です。

ただし、WordPress側で使える機能が、すべてVercel側へ自動で出るわけではありません。

### 読者が見る画面を自由に作れる

Next.js側では、WordPressテーマの見た目に縛られず画面を設計できます。

独自のLP、診断、料金シミュレーター、会員画面など、記事以外の機能を同じサイトへ組み込みたいときは、この自由度が生きそうです。

### 静的生成やキャッシュを使った設計ができる

Next.jsには、静的なページを配信しながら、一定時間後や必要なタイミングで内容を再検証する仕組みがあります。

[Next.js公式：Incremental Static Regeneration](https://nextjs.org/docs/app/guides/incremental-static-regeneration)

読者がページを開くたびにWordPressのPHPとデータベースを動かさない構成にできるため、表示を安定させやすくなります。

ただし、Headlessにしただけで必ず速くなるわけではありません。WordPress APIの応答、画像サイズ、外部スクリプト、Next.jsの実装によって結果は変わります。導入後の計測なしに「高速化できた」とは言えません。

## 併用前に知っておきたい負担

<img src="/images/articles/vercel-wordpress/cautions.webp" alt="WordPress側とVercel側の2つの環境を見比べながら、連携やキャッシュの問題を調べるイラスト" width="1200" height="800" loading="lazy" decoding="async">

### WordPressとNext.jsの両方を保守する

WordPress側では、本体、プラグイン、テーマ、PHP、データベース、バックアップを管理します。

WordPress公式は、更新前にファイルとデータベースをバックアップし、復元できる状態を用意するよう案内しています。

[WordPress公式：Backups](https://developer.wordpress.org/advanced-administration/security/backup/)

[WordPress公式：Upgrading WordPress](https://developer.wordpress.org/advanced-administration/upgrade/upgrading/)

Vercel側では、Next.js、利用パッケージ、API連携、環境変数、キャッシュなどを管理します。

不具合が出たときも、「WordPressからデータが返っていない」「Next.jsで変換できていない」「古いキャッシュが残っている」のように、原因を切り分けなければなりません。

### プラグインを入れただけでは表示されないことがある

WordPress単体なら、目次、関連記事、フォーム、サイト内検索、SEO設定などをプラグインで追加できます。

Headless構成では、プラグインが持つデータをAPIで取得し、Next.js側にも表示処理を作らなければ反映されない場合があります。特にテーマの見た目やWordPress上で動く機能は、そのまま使えるとは限りません。

契約や開発を始める前に、「今使っている機能を、どちら側で再現するのか」を一覧にしたほうがよさそうです。

### 下書きプレビューは連携が必要

Next.jsには、静的な公開ページとは別に下書き内容を確認するDraft Modeがあります。

[Next.js公式：Draft Mode](https://nextjs.org/docs/app/api-reference/functions/draft-mode)

ただし、WordPressのプレビューボタンを押せば自動で完成するわけではありません。WordPress側の認証、プレビューURL、Next.js側のRoute Handlerなどを安全につなぐ必要があります。

### 公開した記事がすぐ反映されるとは限らない

記事の更新方法には、サイトの再ビルド、時間指定の再検証、Webhookをきっかけにしたオンデマンド再検証などがあります。

Next.jsの`revalidatePath`は対象パスのキャッシュを無効化しますが、公式資料では、実際の再生成は次回アクセス時に行われると説明されています。タグを使う方法も、設定によっては古い内容を返しながら背景で更新します。

[Next.js公式：revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)

そのため、公開ボタンを押したら終わりではなく、Vercel側の公開ページで新しいタイトル、本文、画像、URLを確認する工程が必要です。

### SEO情報もNext.js側へ出す

タイトル、メタディスクリプション、canonical、OGP、構造化データ、パンくず、サイトマップ、リダイレクトなどは、最終的に読者や検索エンジンが見るNext.js側へ出力します。

Next.jsにはMetadata APIやサイトマップ用の仕組みがありますが、WordPressのSEOプラグインへ入力した情報を使うなら、そのデータを取得して対応する項目へ渡す実装が必要です。

[Next.js公式：Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)

## Vercelの料金は「無料」だけで決めない

2026年8月13日に公式料金ページを確認したところ、Hobbyは月額0ドル、Proは月額20ドルと表示されています。Proには20ドル分の利用クレジットが含まれますが、対象リソースの利用量によって追加料金が発生します。

[Vercel公式：Pricing](https://vercel.com/pricing)

ここで重要なのは、Hobbyの利用目的です。

Vercelの公式案内では、Hobbyは個人の非商用利用に限定されています。広告の掲載、商品の販売、制作や運用への報酬、アフィリエイトがサイトの主目的である場合などは、商用利用の例として挙げられています。

[Vercel公式：Hobby Plan](https://vercel.com/docs/plans/hobby)

[Vercel公式：Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage)

収益化の線引きが曖昧なら、自分で都合よく判断せず、Vercelへ確認するのが安全です。

また、月額20ドルだけで構成全体の費用は決まりません。

- Proの基本料金と利用量に応じた料金
- WordPress用サーバー
- ドメイン
- 画像配信や外部サービス
- 開発、監視、障害対応にかかる時間

税、地域、為替、契約条件も含め、申し込み直前に公式画面で見積もる必要があります。

## WordPress用サーバーは何を見て選ぶ？

WordPressをCMSとして使う場合も、最初からGCPやAWSで細かく構築する必要があるとは限りません。

<img src="/images/articles/vercel-wordpress/hosting-options.webp" alt="レンタルサーバー、マネージドWordPress、クラウドの3つの選択肢を比較するイラスト" width="1200" height="800" loading="lazy" decoding="async">

| 選択肢 | 向いている場面 | 確認したいこと |
|---|---|---|
| WordPress対応レンタルサーバー | 小さく始めたい | REST API、Webhook、WAF、バックアップ |
| マネージドWordPress | 保守の負担を減らしたい | 月額料金、通信量、ステージング、制限 |
| GCP・AWSなどのクラウド | 特別な構成や細かな管理が必要 | 構築、監視、復旧を担当できるか |

Headless用途なら、私は次を契約前チェックに入れます。

- WordPress REST APIへ外部から安定してアクセスできるか
- SSLを設定できるか
- WAFやアクセス制限がVercelからの通信を止めないか
- WordPressからWebhookを送れるか
- ファイルとデータベースのバックアップ、復元方法があるか
- ステージング環境を使えるか
- APIの応答と通信量の上限はどうなっているか
- 障害時にどこまでサポートしてもらえるか

WordPress公式も、初心者にはWordPress運用の経験があるホスティング事業者を検討する考え方を案内しています。

[WordPress公式：Hosting WordPress](https://wordpress.org/documentation/article/hosting-wordpress/)

サービス名や月額料金は変わりやすいため、この記事では順位を付けません。候補を決めたら、「Headless WordPressで外部のVercelからREST APIへアクセスする予定」と伝え、サポートへ確認するのが確実です。

## 私なら、この3段階で決める

### 1. 記事だけで目的を達成できるか

記事、固定ページ、問い合わせフォームが中心なら、WordPress単体で足りる可能性が高いです。

まず管理箇所を増やさず、必要になった機能を見てから考えます。

### 2. Next.jsでなければ困る機能があるか

独自の診断、会員画面、複雑な検索、AI機能など、テーマやプラグインでは作りにくい要件があるかを確認します。

「なんとなく新しそう」「速そう」だけなら、私にはまだ併用する理由として弱く感じます。

### 3. 公開後の保守を誰が続けるか

作れる人がいることと、保守を続けられることは別です。

WordPress更新、Next.js更新、バックアップ、公開確認、不具合の切り分けまで担当を決められるなら、ようやく併用が現実的になります。

## 導入前に使える、Codexへのコピペ用指示

自分の条件を整理するときは、記事末の「自分のサイト構成を整理するための指示」に、次の情報を足すと判断しやすくなります。

- サイトの目的
- 収益化の有無
- 月に公開する記事数
- 記事を更新する人数
- 必要な独自機能
- 月額予算
- 保守を担当する人
- 記事公開から反映まで許容できる時間

AIの回答だけで契約を決めず、最後に料金と利用条件の公式URLを自分でも開くことが大切です。

## 公開前に確認した公式情報

この記事では、2026年8月13日に次を公式資料で再確認しました。

- VercelのHobby、Proの料金表示と利用目的
- Hobbyにおける商用利用の考え方
- VercelのGit連携、Preview、Productionの役割
- WordPress REST APIで扱える主なデータ
- Next.jsのISR、オンデマンド再検証、Draft Mode
- WordPressの更新とバックアップの考え方

確認できていないのは、私の構成での実料金、実測速度、サーバーごとのAPI相性、下書きプレビューの使い勝手です。ここは実際に接続して試すまで結論を出せません。

## まとめ：役割の違いが分かると、無理に併用しなくてよくなった

調べる前の私は、VercelとWordPressのどちらを選ぶのかで迷っていました。

整理したあとの答えは、もっと単純でした。

- Vercelは、Next.jsなどのサイトやアプリを公開・配信する基盤
- WordPressは、記事や画像を管理し、通常はページも生成するCMS
- WordPressを記事管理、Next.jsとVercelを表示側として併用できる
- 併用してもWordPress用サーバーは別に必要
- 更新反映、下書き、SEO、プラグイン機能、保守をつなぐ必要がある
- Vercel Hobbyは、公式上は個人の非商用利用向け
- 記事中心なら、WordPress単体のほうが分かりやすい場合が多い

私自身はまだ接続していないので、「この構成がおすすめ」と実体験のようには言えません。

ただ、**誰が記事を書き、どんな独自機能が必要で、誰が二つの環境を保守するのか**を先に決めれば、流行だけで構成を選ぶ失敗は減らせそうです。

※料金、上限、利用条件、Next.jsの仕様は変更される可能性があります。導入時は各公式ページの最新情報をご確認ください。
