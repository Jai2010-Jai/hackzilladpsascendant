export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBase(href) {
  const base = BASE_PATH.replace(/\/$/, "");
  const rel = href.startsWith("/") ? href : `/${href}`;
  if (!base) return rel;
  if (rel === "/") return `${base}/`;
  return `${base}${rel}`;
}
