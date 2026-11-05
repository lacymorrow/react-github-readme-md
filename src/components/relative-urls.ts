/**
 * A README is written to be read on github.com, where `images/logo.png`
 * resolves against the repository. Rendered on any other origin it resolves
 * against that origin and 404s, so every relative image and link has to be
 * pointed back at GitHub before the markup reaches the DOM.
 */

const RAW_HOST = "raw.githubusercontent.com";

export interface ReadmeBase {
  /** Base for relative image refs, e.g. `images/logo.png`. */
  imageDir: string;
  /** Base for root-relative image refs, e.g. `/images/logo.png`. */
  imageRoot: string;
  /** Base for relative link targets, e.g. `docs/usage.md`. */
  linkDir: string;
  /** Base for root-relative link targets, e.g. `/CONTRIBUTING.md`. */
  linkRoot: string;
}

const directoryOf = (path: string): string =>
  path.slice(0, path.lastIndexOf("/") + 1);

const sameBaseEverywhere = (base: string): ReadmeBase => ({
  imageDir: base,
  imageRoot: base,
  linkDir: base,
  linkRoot: base,
});

/**
 * Work out where relative refs in a README point, given the URL the markdown
 * was downloaded from and its path inside the repository.
 *
 * The download URL from the GitHub API already carries the owner, repo and
 * ref (`.../{owner}/{repo}/{ref}/{path}`), so no extra lookup is needed. With
 * `path` we can also find the repository root and the matching `blob` URLs;
 * without it, relative refs resolve against the README's own directory and
 * nothing more.
 */
export const buildReadmeBase = (
  downloadUrl: string,
  path?: string
): ReadmeBase | undefined => {
  let parsed: URL;
  try {
    parsed = new URL(downloadUrl);
  } catch {
    return undefined;
  }

  const readmeDir = `${parsed.origin}${directoryOf(parsed.pathname)}`;
  const repoPath = path?.replace(/^\/+/, "");
  if (!repoPath || parsed.hostname !== RAW_HOST) {
    return sameBaseEverywhere(readmeDir);
  }

  const suffix = `/${repoPath}`;
  if (!parsed.pathname.endsWith(suffix)) return sameBaseEverywhere(readmeDir);

  const rootPath = `${parsed.pathname.slice(
    0,
    parsed.pathname.length - suffix.length
  )}/`;
  const [username, repo, ...ref] = rootPath.split("/").filter(Boolean);
  if (!username || !repo || ref.length === 0) {
    return sameBaseEverywhere(readmeDir);
  }

  const blobRoot = `https://github.com/${username}/${repo}/blob/${ref.join(
    "/"
  )}/`;

  return {
    imageDir: readmeDir,
    imageRoot: `https://${RAW_HOST}${rootPath}`,
    linkDir: `${blobRoot}${directoryOf(repoPath)}`,
    linkRoot: blobRoot,
  };
};

// `https:`, `mailto:`, `data:`, protocol-relative `//cdn.example.com`.
const ABSOLUTE_URL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

const needsResolving = (value: string): boolean => {
  const target = value.trim();
  if (!target) return false;
  if (target.startsWith("#")) return false; // in-page anchor
  return !ABSOLUTE_URL.test(target);
};

const resolveAgainst = (
  target: string,
  dirBase: string,
  rootBase: string
): string => {
  try {
    return target.startsWith("/")
      ? new URL(target.replace(/^\/+/, ""), rootBase).href
      : new URL(target, dirBase).href;
  } catch {
    return target;
  }
};

// Code spans and fenced blocks arrive HTML-escaped (`&lt;img`), so matching on
// a literal `<` only ever touches real markup.
const TAG = /<(img|a|source|video)\b([^>]*)>/gi;
const ATTR = /\b(src|href|poster)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'`=<>]+))/gi;

/**
 * Rewrite relative `src`, `href` and `poster` attributes in rendered README
 * markup so they resolve against GitHub. Absolute URLs and in-page anchors
 * are left alone.
 */
export const rewriteRelativeUrls = (html: string, base: ReadmeBase): string =>
  html.replace(TAG, (tag, name: string, attributes: string) => {
    const isLink = name.toLowerCase() === "a";
    const dirBase = isLink ? base.linkDir : base.imageDir;
    const rootBase = isLink ? base.linkRoot : base.imageRoot;

    const resolved = attributes.replace(
      ATTR,
      (
        attribute: string,
        attributeName: string,
        doubleQuoted?: string,
        singleQuoted?: string,
        unquoted?: string
      ) => {
        const value = doubleQuoted ?? singleQuoted ?? unquoted;
        if (value === undefined || !needsResolving(value)) return attribute;
        const quote = singleQuoted !== undefined ? "'" : '"';
        const href = resolveAgainst(value.trim(), dirBase, rootBase);
        return `${attributeName}=${quote}${href}${quote}`;
      }
    );

    return resolved === attributes ? tag : `<${name}${resolved}>`;
  });
