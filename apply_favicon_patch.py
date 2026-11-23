from pathlib import Path
import re

root = Path(".")
old_pattern = re.compile(
    r'^[ \t]*<link\s+rel=["\']icon["\']\s+href=["\']assets/img/logo-mark\.svg["\']\s+type=["\']image/svg\+xml["\']\s*>\s*$',
    re.MULTILINE,
)

new_block = """  <link rel="icon" type="image/png" sizes="48x48" href="/assets/img/favicon-48x48.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16x16.png">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple-touch-icon.png">"""

changed = []
for path in sorted(root.glob("*.html")):
    text = path.read_text(encoding="utf-8")
    updated, count = old_pattern.subn(new_block, text, count=1)

    updated = updated.replace(
        '<link rel="manifest" href="manifest.webmanifest">',
        '<link rel="manifest" href="/manifest.webmanifest">'
    )

    if 'rel="manifest"' not in updated:
        updated = updated.replace(
            new_block,
            new_block + '\n  <link rel="manifest" href="/manifest.webmanifest">',
            1,
        )

    if count:
        path.write_text(updated, encoding="utf-8")
        changed.append(path.name)

print("Updated:", ", ".join(changed) if changed else "No matching HTML files found")
print("CSS and JavaScript files were not touched.")
