# Ebony Memo - Frontend

This application provides the visitor-facing frontend GUI for [Ebony Memo](https://ebonymemo.com/), an arthouse videogame curator website for smartphones. For the remaining components:
* [View the backend source](https://github.com/JunoNgx/ebonymemo-backend-nodejs).
* [View the content management application source](https://github.com/JunoNgx/ebonymemo-admin-reactjs).

## Current deployment

This application is currently deployed for production via [Vercel](https://vercel.com/) at [EbonyMemo.com](https://ebonymemo.com/).

## Tech stack

This application is powered by [NextJS](https://nextjs.org/) and [SASS](https://sass-lang.com/) for optimal user experience and SEO. The vast majority of the content are server-side rendered, saving for on-demand frontend fetching by users and newly created pages, which are generated on request. For more information, see [`fallback`](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required) and [Incremental Static Regeneration](https://arunoda.me/blog/what-is-nextjs-issg) at NextJS documentation.

## Environment variables

`NEXT_PUBLIC_API_URL`: url to backend API.

This is setup in `next.config.js`; however, .env.local` is necessary for local deployment.

## NextJS

For more information on the framework, visit [NextJS documentation](https://nextjs.org/docs/getting-started).

## Local deployment

First, clone the repository and move into the directory:
```
git clone https://github.com/JunoNgx/ebonymemo-frontend-next.git
cd ebonymemo-frontend-next
```
Then, setup the environment variables in `.env.local` and run the developement server:
```
npm run dev
```
[http://localhost:3000](http://localhost:3000) should then be accessible from your browser.

## Contribution

For suggestions and  criticism, please feel free to open an issue for this repository.