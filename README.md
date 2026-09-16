# iHomepage

A bilingual, single-page academic and developer homepage for GitHub Pages.

The site uses GitHub Pages' built-in Jekyll build to turn Markdown content into
static HTML. It has no npm packages, client-side frameworks, remote fonts, or
runtime dependencies.

## Branch workflow

- `dev`: active development
- `main`: stable, publishable releases

## Content

- `_profile/profile.md`: sidebar identity, short biography, links, and structured-person data
- `_sections/*.md`: section headings, order, visibility, and navigation labels
- `_education/*.md`: education timeline entries
- `_publications/*.md`: compact publication entries
- `_experiences/*.md`: working experience timeline entries
- `_projects/*.md`: visual project cards
- `_prototypes/*.md`: reserved prototype entries
- `_awards/*.md`: awards

The legacy `_news` and `_service` content is retained but is not rendered by the
current one-page layout.

Change a section's `order` value to move it everywhere, including the navigation.
Set `enabled: false` to hide it. English and Chinese copy live together so the
language switch never opens another page.

## Preview

Install the project gems once, then start the local preview server:

```powershell
bundle install
bundle exec jekyll serve --livereload
```

Open `http://localhost:4000`. GitHub Pages also builds the site automatically
after a push to the configured publishing branch.

Before publishing, update `url` and `baseurl` in `_config.yml` if the repository
name or Pages address changes.
