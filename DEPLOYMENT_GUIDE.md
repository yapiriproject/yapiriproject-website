# Deploy yapiriproject.com with GitHub Pages

## 1. Create the repository

Create a public GitHub repository, preferably named `yapiriproject-website`.
Upload the **contents of this folder** to the root of the repository. `index.html` must be at the repository root.

## 2. Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/(root)` folder.
5. Save.

## 3. Set the custom domain

In **Settings → Pages → Custom domain**, enter:

`yapiriproject.com`

The included `CNAME` file already contains this value.

## 4. Change DNS at Hostinger

Delete the parked/default A or CNAME records for the website, but do not delete email-related MX/TXT records.

Add these four A records for the root domain:

| Type | Name | Points to |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Add this record for `www`:

| Type | Name | Points to |
|---|---|---|
| CNAME | www | yapiriscript.github.io |

If your GitHub account or organisation name is not `yapiriscript`, replace the CNAME target with `<your-account>.github.io`.

## 5. Enable HTTPS

After GitHub confirms the DNS configuration, return to **Settings → Pages** and enable **Enforce HTTPS**.

## 6. Before announcing the launch

- Add the official Yapiri webfont privately to your deployment and define it with `@font-face` so PUA characters render.
- Verify every demonstration Kokborok word and sentence.
- Clearly label prototype tools that are not yet production-ready.
- Test all pages on desktop and mobile.
- Submit `https://yapiriproject.com/sitemap.xml` to Google Search Console after launch.
