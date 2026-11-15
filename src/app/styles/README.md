# styles

The global stylesheets, loaded once by the layout:

- `tokens.css`: the colours, fonts, shadows and sizes that more than one place uses. UnoCSS reads the
  colour and font names from here (`uno.config.ts`).
- `base.css`: the two global rules a utility cannot express (the Swiper element, link colour).
- `animations.css`: the keyframes that a utility class names.

Everything else is a UnoCSS utility class on the markup, or a shortcut in `uno.config.ts`.
