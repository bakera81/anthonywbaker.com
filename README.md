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
Ideas are pulled from a Notion database. Notion only gives a temporary public URL for images, so each image is downloaded to `public/images/ideas`. The markdown is then corrected in `notionHelpers.js::getMarkdown`).

Currently, images are not downloaded at build time. Ensure that the image in Notion also exists with the same filename in `public/images/ideas`.

