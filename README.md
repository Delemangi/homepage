# Delemangi

This is my personal homepage, which can currently be found [here](https://delemangi.com). It uses React and Material UI.

## Quick Setup

1. Install Docker
2. Grab the `compose.prod.yaml` file from the repository
3. Run `docker compose -f compose.prod.yaml up -d`

## Installation

1. Clone the repository: `git clone git@github.com:Delemangi/homepage.git` (or `https://github.com/Delemangi/homepage.git`)
2. Install dependencies: `npm i`

## Running

You can either run `npm run dev` to start a development server, or `npm run build` and `npm run preview` to build and deploy a server running the application, or check the quick setup from above to run it inside Docker painlessly.

## Deployment security

The Cloudflare Pages `_headers` file sets cache and security headers, including a report-only CSP. The inline theme and JSON-LD scripts are hash-allowed, and `npm run build` verifies those hashes against the built HTML.

CSP stays report-only while Cloudflare HTML/JS transforms are enabled. HSTS is configured at the Cloudflare zone/TLS layer; if the Docker image is exposed directly, add HSTS at the terminating proxy.

## License

This project is licensed under the terms of the MIT license.
