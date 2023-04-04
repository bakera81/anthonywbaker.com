This site is powered by NextJS.

## Quick start

1. `npm i`
2. `npm run develop`

## Deploy
Commit to the `prod` branch to trigger a new build on [Netlify](https://app.netlify.com/teams/bakera81/overview).  

Locally, run `npm run build` then `npm run start` to test a built version of the site.



## Env vars
- For local development, set environment variables in `.env.local` in the root. You can access them using `process.env.VARIABLE`.
- For production, use the Netlify UI (Build & Deploy -> Environment). You may also need to update `next.config.js`.

## Recipes
Recipes are pulled from a Notion database.

## Ideas
Ideas are pulled from a Notion database. For each image uploaded in a Notion page, be sure to include an exact copy (with matching filename, including file extension) in `public/images/ideas`.

Notion only gives a temporary public URL for images, so there is a WIP script to download each image at build time in `utils/ideas.js::downloadAllIdeasImages`. Currently, images are not downloaded at build time. 

