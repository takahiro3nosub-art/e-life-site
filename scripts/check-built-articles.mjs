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
  const checks = [
    [html.includes('class="article-guide"'), "読者・結論・手順のガイドがありません"],
    [html.includes('class="copy-prompt"'), "コピペ用の指示がありません"],
    [html.includes('class="article-faq"'), "FAQがありません"],
    [html.includes('"@type":"FAQPage"'), "FAQの構造化データがありません"],
    [html.includes("根拠確認："), "根拠確認日が表示されていません"],
    [(html.match(/<h1(?:\s|>)/g) ?? []).length === 1, "h1が1件ではありません"],
    [(html.match(/<details>/g) ?? []).length >= 3, "FAQが3件未満です"],
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
