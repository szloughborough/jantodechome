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

Do not set the build output directory to the repository root.

The repository root contains source files, product source images, scripts, and `.git`. Cloudflare Pages must only upload the final static build folder:

```text
public
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
```

Source-only folders such as `picture/`, `product picture/`, `.git/`, and `scripts/` are not part of the deployed output.
