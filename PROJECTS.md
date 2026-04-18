# Managing Projects

Your projects are now centrally managed through a single **`data/projects.json`** file. This makes it easy to add, update, or remove projects without editing multiple HTML files.

## How to Add a Project

1. Open `data/projects.json`
2. Find the appropriate category: `featured`, `in-progress`, or `archive`
3. Add a new project object to the array:

```json
{
  "id": "unique-project-id",
  "title": "Project Title",
  "description": "A brief description of the project.",
  "link": "https://example.com",
  "tags": ["tag1", "tag2"]
}
```

## Field Reference

- **id**: Unique identifier (used internally, should be lowercase with hyphens)
- **title**: Project name (displayed as heading)
- **description**: Short project description (1-2 sentences)
- **link**: URL to the project (can be internal or external)
- **tags**: Array of keyword tags (displayed as badges)

## Example

```json
{
  "featured": [
    {
      "id": "portfolio-website",
      "title": "Portfolio Website",
      "description": "A modern, minimal portfolio site with light/dark theme support.",
      "link": "https://github.com/username/portfolio",
      "tags": ["web", "portfolio"]
    },
    {
      "id": "cli-tool",
      "title": "CLI Tool",
      "description": "A command-line utility for managing files.",
      "link": "https://example.com",
      "tags": ["cli", "node"]
    }
  ]
}
```

## How Projects Appear

- **Featured Projects Page**: Shows all projects from `featured` array
- **In Progress Page**: Shows all projects from `in-progress` array
- **Archive Page**: Shows all projects from `archive` array

Projects are automatically styled with project cards that include:

- Title and description
- Link to view the project
- Tag badges for quick categorization

## Styling

Project card styling is defined in `styles/projects.css`. Customize colors, spacing, and hover effects there.

## Moving Projects

To move a project between categories, cut it from one array and paste it into another in `data/projects.json`. The pages will automatically update.
