# company

Who Eliza-K is and how to reach it: the "About us" page, the contacts and working hours, the awards carousel and the gallery
of completed projects. The contacts and the gallery are read from PocketBase at build time.

Slices:

- `about.ts` — the text of the "About us" page; `assets/about/` holds its photographs.
- `data.ts` — the static addresses, the footer headings, the working-hours title and the award list.
- `assets/awards/` — the award certificates (`award_N.jpg`, the highest number first); the build turns them into WebP.
- `api/` — `contacts.ts` and `gallery.ts`, the PocketBase reads.
- `ui/` — `AboutUs`, `Contacts`, `Awards`, `GalleryImages`.

Door (`index.ts`): `AboutUs`, `Contacts`, `Awards`, `GalleryImages`, `contacts`, `contactTitles`, `ContactPoint`,
`contactPage`, `galleryPage`, `aboutUsPage`, `aboutNav`, `galleryNav`, `contactNav`.
