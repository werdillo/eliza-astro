# features

Cross-cutting pieces every domain may use, and no domain owns: the languages and their switcher, the
analytics tag, the placeholder page. Features import `core/`, `components/` and each other, through
doors.

Boxes:
- `i18n/` — translations, `t()`, `langPath`, `LanguageDropdown`.
- `analytics/` — the Google tag.
- `coming-soon/` — the placeholder page for a section not yet open.
