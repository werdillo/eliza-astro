# pdf-viewer

A fullscreen PDF reader with page navigation, zoom and download. PDF.js loads only when a document is opened.

Door: `PdfViewer`. Render it once on a page, then mark up plain links to PDFs:
- `data-pdf="<id>"` opens the link in the reader; the id is kept in the URL (`#<id>-<page>`).
- `data-title` is the heading of the reader.
- `data-pdf-book` is for printed books: facing pages on a wide screen, two-page sheets split in half on a phone.

Without scripts the links still open the PDF. A file on another host must allow cross-origin requests.
