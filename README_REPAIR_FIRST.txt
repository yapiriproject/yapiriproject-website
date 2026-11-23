YAPIRI FAVICON — SAFE MERGE PATCH

This is a patch, not a complete website.

It intentionally contains no HTML pages, CSS files, JavaScript files, fonts,
or visible site-logo files. Merge it into the existing full website repository;
do not replace the entire repository with this folder.

FIRST REPAIR THE CURRENT WEBSITE
Restore these folders/files from the last working website commit or backup:
- assets/css/
- assets/js/
- any assets/fonts/ folder
- assets/img/logo-mark.svg
- any other existing images used by the pages

The HTML pages expect assets/css/styles.css. If that file or folder is absent,
the pages will appear as plain unstyled HTML.

SAFE FAVICON UPDATE
1. Copy favicon.ico into the repository root.
2. Merge assets/img/ from this patch into the existing assets/img/ folder.
3. Replace manifest.webmanifest with the included version.
4. Apply HTML_HEAD_PATCH.txt to every root HTML page, or run:
   python apply_favicon_patch.py
5. Commit and push without deleting the existing asset folders.

IMPORTANT
Never use this patch folder as the complete website deployment.
