# Yapiri Project website

A responsive static multi-page prototype for **yapiriproject.com**.

## Pages
- Home
- Dictionary
- Grammar
- Sentence corpus
- Learn
- Tools
- About / roadmap

## Run locally
Open `index.html`, or run a local server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Important Yapiri font note
The interface uses the official Yapiri PUA codepoints supplied for the project. To render the glyphs, add the Yapiri font to your deployed website and define it as `font-family: Yapiri`. The prototype deliberately does not bundle or distribute a font file.

## Production next steps
1. Connect dictionary, grammar, and corpus pages to a real database/CMS.
2. Add contributor, reviewer, source, dialect, and version-status fields.
3. Replace sample content with verified Kokborok data.
4. Implement the complete Roman-to-Yapiri orthography engine.
5. Add authentication and editorial review workflows.
6. Add accessibility testing, analytics, backups, and deployment configuration.
