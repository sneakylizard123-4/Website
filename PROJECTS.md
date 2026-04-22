# Managing Projects

Projects are centrally managed through `data/projects.json`, with one entry per project.

Each project can:

- link to its own detail page file
- appear in one or more sections (`featured`, `in-progress`, `archive`)
- be filtered by category and name on listing pages
- be sorted by tags on listing pages
- swap to a hover image with configurable animation speed

## How to Add a Project

1. Open `data/projects.json`
2. Add a new object inside the top-level `projects` array
3. Set `sections` to control where it appears (one or many sections)
4. Set `file` to the project detail page path

Example project object:

```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "description": "A brief description of the project.",
  "file": "/pages/projects/project-slug/index.html",
  "status": "In Progress",
  "date": "2026-04",
  "image": "/images/projects/project-slug.jpg",
  "imageAlt": "Screenshot of Project Title",
  "sections": ["featured", "in-progress"],
  "tags": ["tag1", "tag2"]
}
```

## Field Reference

- **id**: Unique identifier (used internally, should be lowercase with hyphens)
- **title**: Project name (displayed as heading)
- **description**: Short project description (1-2 sentences)
- **file**: Path to the project detail page (recommended, usually under `pages/projects/...`)
- **status**: Optional status badge text (examples: `In Progress`, `Prototype`, `Complete`)
- **date**: Optional date text shown next to status (examples: `2026-04`, `Apr 2026`)
- **image**: Optional image shown on the right side of the project card
- **imageAlt**: Optional accessible alt text for the image (recommended)
- **sections**: Array of section keys where this project should appear. Allowed values: `featured`, `in-progress`, `archive`
- **tags**: Array of keyword tags (displayed as badges)

Optional legacy field:

- **link**: External/internal URL fallback. Used only if `file` is missing.

## Example

```json
{
  "projects": [
    {
      "id": "portfolio-website",
      "title": "Portfolio Website",
      "description": "A modern, minimal portfolio site with light/dark theme support.",
      "file": "/pages/projects/portfolio-website/index.html",
      "status": "In Progress",
      "date": "2026-04",
      "image": "/images/projects/portfolio-website.jpg",
      "imageAlt": "Portfolio Website homepage preview",
      "sections": ["featured", "in-progress"],
      "tags": ["web", "portfolio"]
    },
    {
      "id": "cli-tool",
      "title": "CLI Tool",
      "description": "A command-line utility for managing files.",
      "file": "/pages/projects/cli-tool/index.html",
      "sections": ["archive"],
      "tags": ["cli", "node"]
    }
  ]
}
```

## How Projects Appear

- **Featured Projects Page**: Shows projects where `sections` includes `featured`
- **In Progress Page**: Shows projects where `sections` includes `in-progress`
- **Archive Page**: Shows projects where `sections` includes `archive`

If a project has multiple section values, it appears in all of them.

## Filters and Sorting

On project listing pages (`featured`, `in-progress`, `archive`), users can:

- filter by category (`All`, `Featured`, `In Progress`, `Archive`)
- filter by name (search by project title)
- sort by tags (`Default order`, `Tags A to Z`, `Tags Z to A`)

Projects are automatically styled with project cards that include:

- Title and description
- Link to view the project
- Tag badges for quick categorization

## Styling

Project card styling is defined in `styles/projects.css`. Customize colors, spacing, and hover effects there.

Image switch animation speed variables in `styles/projects.css`:

- `--project-image-fade-speed`
- `--project-image-transform-speed`
- `--project-image-hover-start-scale`
- `--project-image-base-end-scale`

## Creating a Project Detail Page

1. Create a folder such as `pages/projects/my-project/`
2. Add `index.html` inside it
3. Set the project's `file` field to `/pages/projects/my-project/index.html`

## Moving Projects Between Sections

Edit the project's `sections` array in `data/projects.json`.

Examples:

- Move from featured to archive: change `sections` from `["featured"]` to `["archive"]`
- Show in two sections: set `sections` to `["featured", "in-progress"]`
