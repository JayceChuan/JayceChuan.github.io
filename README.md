# iHomepage

A bilingual, single-page academic and developer homepage for GitHub Pages.

The site uses GitHub Pages' built-in Jekyll build to turn Markdown content into
static HTML. It has no npm packages, client-side frameworks, remote fonts, or
runtime dependencies.

## Branch workflow

- `dev`: active development
- `main`: stable, publishable releases

## Content

- `_profile/profile.md`: identity, biography, links, and structured-person data
- `_sections/*.md`: section headings, order, visibility, and navigation labels
- `_news/*.md`: news entries
- `_publications/*.md`: publication cards
- `_experiences/*.md`: education and work history
- `_projects/*.md`: project cards
- `_service/*.md`: service and teaching entries
- `_awards/*.md`: awards

Change a section's `order` value to move it everywhere, including the navigation.
Set `enabled: false` to hide it. English and Chinese copy live together so the
language switch never opens another page.

## Preview

GitHub Pages builds the site automatically after a push. A local Jekyll install
is optional and is intentionally not required by the current development setup.

Before publishing, update `url` and `baseurl` in `_config.yml` if the repository
name or Pages address changes.
