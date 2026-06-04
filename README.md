# Jantodec Home Website

Static B2B website for Shenzhen Loughborough Trading Co., Ltd / Jantodec Home.

## Project Type

This is a pure HTML/CSS/JavaScript static website.

It is not a Vite/React project and it is not a Next.js project.

## Local Build

Run:

```bash
npm run build
```

The build command regenerates the static pages and copies only deployable files into:

```text
public/
```

Preview the Cloudflare output locally:

```bash
npm run preview
```

Then open:

```text
http://127.0.0.1:5174/
```

## Cloudflare Pages Settings

Use these exact settings in Cloudflare Pages:

```text
Framework preset: None
Build command: npm run build
Build output directory: public
Root directory: /
Node.js version: 20 or later
```

## Inquiry Form Email Setup

The contact, quote, sample request, and catalog forms submit to a Cloudflare Pages Function:

```text
/api/inquiry
```

The function sends form submissions to:

```text
admin@jantodechome.com
```

Email delivery uses the Resend API. In Cloudflare Pages, add these environment variables:

```text
RESEND_API_KEY=your_resend_api_key
INQUIRY_TO_EMAIL=admin@jantodechome.com
INQUIRY_FROM_EMAIL=Jantodec Home <your-verified-sender@yourdomain.com>
```

`RESEND_API_KEY` is required.

`INQUIRY_FROM_EMAIL` should use a sender domain verified in Resend. For testing only, Resend may allow:

```text
Jantodec Home <onboarding@resend.dev>
```

After setting environment variables, redeploy the Cloudflare Pages project.

Do not set the build output directory to the repository root.

The repository root contains source files, product source images, scripts, and `.git`. Cloudflare Pages must only upload the final static build folder:

```text
public
```

This repository also includes `wrangler.toml`:

```toml
name = "jantodechome"
compatibility_date = "2026-06-01"
pages_build_output_dir = "public"
```

That config tells Cloudflare that the deployable static assets are in `public/`.

## Deploy From Cloudflare.com

Recommended option: connect the GitHub repository to Cloudflare Pages.

Use:

```text
Framework preset: None
Build command: npm run build
Build output directory: public
Root directory: /
```

If using Cloudflare Pages Direct Upload in the dashboard, do not upload the repository root. Upload the generated `public/` folder only.

Steps for Direct Upload:

```bash
npm run build
```

Then upload:

```text
public/
```

Do not upload:

```text
website/
```

The `website/` root contains `.git/`, source images, scripts, and local files that are not deployable assets.

## Deploy With Wrangler

If Wrangler is available, run:

```bash
npm run deploy:cloudflare
```

This command builds the site and deploys only:

```text
public/
```

## Why `.cfignore` Exists

Cloudflare Workers assets have a 25 MiB asset limit. If the repository root is uploaded directly, Cloudflare may try to upload files such as:

```text
.git/objects/pack/*.pack
```

This project includes `.cfignore` to exclude repository metadata, dependencies, logs, env files, design source files, and large raw media from Cloudflare uploads.

The main fix is still the Cloudflare Pages output directory:

```text
public
```

## Deployable Files

The build script copies these files and folders into `public/`:

```text
index.html
about/
assets/
contact/
data/
products/
resources/
series/
script.js
styles.css
_headers
_redirects
```

Source-only folders such as `picture/`, `product picture/`, `.git/`, and `scripts/` are not part of the deployed output.

Cloudflare Pages Functions are deployed from:

```text
functions/
```
