# company

Who Eliza-K is and how to reach it: the contacts and working hours, the awards carousel and the gallery
of completed projects. The contacts and the gallery are read from PocketBase at build time.

Slices:

- `data.ts` — the static addresses, the footer headings, the working-hours title and the award list.
- `assets/awards/` — the award certificates (`award_N.jpg`, the highest number first); the build turns them into WebP.
- `api/` — `contacts.ts` and `gallery.ts`, the PocketBase reads.
- `ui/` — `Contacts`, `Awards`, `GalleryImages`.

Door (`index.ts`): `Contacts`, `Awards`, `GalleryImages`, `contacts`, `contactTitles`, `ContactPoint`,
`contactPage`, `galleryPage`, `aboutUsPage`, `galleryNav`, `contactNav`.
