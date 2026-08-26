import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const articlesDir = new URL("../dist/articles/", import.meta.url);
const articleRoot = articlesDir.pathname;

if (!existsSync(articleRoot)) {
  throw new Error("dist/articles がありません。先にAstroのビルドを実行してください。");
}

const slugs = readdirSync(articleRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

if (slugs.length === 0) {
  throw new Error("公開記事が1件も生成されていません。");
}

const failures = [];

for (const slug of slugs) {
  const file = join(articleRoot, slug, "index.html");
  const html = readFileSync(file, "utf8");
  const guidePosition = html.indexOf('class="article-guide"');
  const coverPosition = html.indexOf('class="article-cover"');
  const breadcrumbsPosition = html.indexOf('class="breadcrumbs"');
  const toc = html.match(/<nav class="article-toc"[\s\S]*?<\/nav>/)?.[0] ?? "";
  const tocTargets = [...toc.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  const conclusion = html.match(/<div class="article-guide__answers">[\s\S]*?<\/div>/)?.[0] ?? "";
  const conclusionParagraphs = conclusion.match(/class="article-guide__answer"/g)?.length ?? 0;
  const checks = [
    [html.includes('class="article-hero__lead"'), "H1直下の実体験導入がありません"],
    [html.includes('class="article-author"'), "著者表示がありません"],
    [html.includes('class="article-guide"'), "結論・目次のガイドがありません"],
    [html.includes("先に、私の結論"), "結論の見出しがありません"],
    [!html.includes("先に、私の結論です"), "結論の旧見出しが残っています"],
    [conclusionParagraphs >= 2, "結論が適切に改行されていません"],
    [!/(?:です|ます|でした|ました)。/.test(conclusion), "結論がです・ます調のままです"],
    [html.includes('class="article-toc"'), "目次がありません"],
    [tocTargets.length >= 1, "目次に本文見出しへのリンクがありません"],
    [tocTargets.every((target) => html.includes(`id="${target}"`)), "目次リンクの移動先がありません"],
    [!html.includes("こんな人に向けて書きました"), "旧『こんな人』ブロックが残っています"],
    [!html.includes("この記事では、ここを順番に見ます"), "旧『順番に見ます』ブロックが残っています"],
    [coverPosition >= 0 && breadcrumbsPosition > coverPosition, "記事画像がページ最上部へ配置されていません"],
    [guidePosition > coverPosition, "記事画像が結論・目次より後に配置されています"],
    [html.includes('class="copy-prompt"'), "コピペ用の指示がありません"],
    [html.includes('class="article-faq"'), "FAQがありません"],
    [html.includes('"@type":"FAQPage"'), "FAQの構造化データがありません"],
    [html.includes("公式資料確認："), "公式資料の確認日が表示されていません"],
    [!html.includes("この記事の範囲："), "編集用の体験範囲が定型文のまま表示されています"],
    [(html.match(/<h1(?:\s|>)/g) ?? []).length === 1, "h1が1件ではありません"],
    [(html.match(/class="article-faq__item"/g) ?? []).length >= 3, "質問項目が3件未満です"],
    [(html.match(/href="https:\/\//g) ?? []).length >= 1, "外部の根拠リンクがありません"],
  ];

  for (const [passed, message] of checks) {
    if (!passed) failures.push(`${slug}: ${message}`);
  }

  for (const match of html.matchAll(/href="\/articles\/([^"#?]+)\/?(?:[#?][^"]*)?"/g)) {
    const target = match[1].replace(/\/$/, "");
    if (!existsSync(join(articleRoot, target, "index.html"))) {
      failures.push(`${slug}: 内部リンク /articles/${target}/ の生成先がありません`);
    }
  }
}

if (failures.length > 0) {
  throw new Error(`記事QAで問題が見つかりました:\n- ${failures.join("\n- ")}`);
}

console.log(`記事QA: ${slugs.length}件すべて合格`);
