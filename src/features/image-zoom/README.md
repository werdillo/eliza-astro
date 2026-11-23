# image-zoom

A fullscreen viewer for photos: the whole original, with zoom, pan, swipe and keyboard.

Door: `ImageZoom`. Render it once on a page, then mark up what it opens:
- `data-zoom-group` on the wrapper; its photos are what the arrows walk through.
- `data-zoom-src="<original url>"` on each `<img>`; a click on it opens the viewer.
- `data-zoom-open` on an optional button: it opens the photo inside it, or else the current one.

If the group holds a `swiper-container`, the button opens its active slide. On closing, the group receives a
`zoom-closed` event whose `detail` is the index of the last photo viewed.
