/** Append an external-site indicator while generating Markdown HTML. */
export default function externalLinks({ site }) {
  const origin = new URL(site).origin;
  return {
    name: "external-link-icons",
    element: { filter: ["a"], visit(node, ctx) {
      if (node.type === "element" && node.tagName === "a" && node.properties?.href) {
        let url;
        try { url = new URL(String(node.properties.href), site); } catch { return; }
        if (["http:", "https:"].includes(url.protocol) && url.origin !== origin) {
          const classes = node.properties.className ?? [];
          ctx.setProperty(node, "className", [...new Set([...(Array.isArray(classes) ? classes : String(classes).split(/\s+/)), "external-link"])]);
          if (!node.children.some((child) => child.properties?.className?.includes("external-link-icon"))) {
            ctx.appendChild(node, [
              { type: "element", tagName: "span", properties: { className: ["sr-only"] }, children: [{ type: "text", value: "（外部サイト）" }] },
              { type: "element", tagName: "svg", properties: { className: ["external-link-icon"], xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: 14, height: 14, fill: "none", stroke: "currentColor", strokeWidth: 2, "stroke-linecap": "round", "stroke-linejoin": "round", ariaHidden: "true", focusable: "false" }, children: [
                { type: "element", tagName: "path", properties: { d: "M14 3h7v7M21 3l-9 9M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" }, children: [] },
              ] },
            ]);
          }
        }
      }
    } },
  };
}
