# Security Policy

## Reporting a vulnerability

`react-github-readme-md` renders user-supplied Markdown — XSS and injection are the highest-priority concerns.

If you've found a security issue, please report it privately:

➔ https://github.com/lacymorrow/react-github-readme-md/security/advisories/new

Or email **lacy@lacymorrow.com** with `[react-github-readme-md security]` in the subject.

Expect an acknowledgement within 72 hours.

## Supported versions

Only the latest published version on npm receives security updates.

## Scope

In scope:
- HTML/JS injection in rendered Markdown output
- Path traversal via the `src` prop
- Anything that lets an attacker-controlled README execute script in a host page

Out of scope:
- Issues in [marked](https://github.com/markedjs/marked) — report upstream
- Issues in [marked-alert](https://github.com/bent10/marked-extensions) or other plugins — report to those repos
