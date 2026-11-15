# typography

The site's text styles: nine looks, H1–H6 for headings and P1–P3 for text. Every text on the site has one
of them: a component (`<H2 as="h1">`), a class (`text-h2` on any element) or the element's own default (a
bare `<h4>` or `<p>`). A screen never sets a font size, weight or line height itself; a test checks it
(`src/app/tests/typography.test.ts`).

| Style | Size (desktop) | Breakpoints | Weight | Line height | Used for |
|---|---|---|---|---|---|
| H1 | 72px | ≤768 36px, ≤480 28px | 300 | 1.1 | the hero title |
| H2 | 48px | ≤600 24px | 700 | 1.2 | product and fabric titles, coming-soon title, collection tile labels |
| H3 | 28px | ≤600 24px | 700 | 1.2 | collection and sale group titles, product price, catalogue title, contact name |
| H4 | 20px | ≤600 18px | 700 | 1.2 | footer headings, components titles, collection card labels |
| H5 | 18px | — | 600 | 1.2 | sale prices, the sale event line |
| H6 | 16px | — | 600 | 1.2 | the hero button |
| P1 | 20px | ≤768 16px | 400 | 1.4 | lead text, product text, contact lines, buttons on product pages |
| P2 | 16px | — | 400 | 1.4 | body text (the default of `<p>` and of the body), landing names |
| P3 | 14px | ≤1400 12px | 400 | 1.3 | navigation, footer small print, language menu, tab bar |

The family is one token (`--text-family`, Avenir). The breakpoints are the old media queries, px for px.

Use: the tag says the meaning, the look is the style: `<H3 as="h2">` is an h2 that looks like H3.
A heading that is the page title is `as="h1"`; one page has exactly one h1.

Exceptions (text outside the nine styles): none. The test's exception list is empty; add an entry there and here
with its reason if one is ever needed.

Files: `typography.css` holds the variables, the classes and the element defaults (one definition). The
UnoCSS config carries no text utilities; the styles are plain CSS because a bare element must already look
right, which a utility class cannot do.
