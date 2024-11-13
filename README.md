# CoverLetter.work - Generate a cover letter for your next job for FREE

<https://coverletter.work>

> [!TIP]
> Do you want to learn how to build a similar AI web application? Contact me at [gianfranco@escuela.dev](mailto:gianfranco@escuela.dev) and I'll help you get started.
> Visit [escuela.dev](https://escuela.dev) to learn more about one-on-one mentoring classes.

## Deploy the front-end

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=ai-sdk-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fai%2Ftree%2Fmain%2Fexamples%2Fnext-openai&env=OPENAI_API_KEY&project-name=ai-sdk-next-openai&repository-name=ai-sdk-next-openai)

## Deploy the Puppeteer headless browser

- [browserless/chromium](https://github.com/browserless/browserless/pkgs/container/chromium) Docker image
- on Fly.io

Install the fly.io CLI and Docker Desktop (it's needed to build the Docker image). Maybe there is no need if you set Fly.io to use an Docker image that's already available (<https://fly.io/docs/reference/configuration/#specify-a-docker-image>).
```bash
brew install fly docker
fly launch # create a new app on Fly.io (the first time)
# then
fly deploy
```

## How to use

To run the example locally you need to:

1. Sign up at [OpenAI's Developer Platform](https://platform.openai.com/signup).
2. Go to [OpenAI's dashboard](https://platform.openai.com/account/api-keys) and create an API KEY.
3. If you choose to use external files for attachments, then create a [Vercel Blob Store](https://vercel.com/docs/storage/vercel-blob).
4. Set the required environment variable as the token value as shown [the example env file](./.env.local.example) but in a new file called `.env.local`
5. `npm install` to install the required dependencies.
6. `npm dev` to launch the development server.

## Learn More

To learn more about OpenAI, Next.js, and the AI SDK take a look at the following resources:

- [Vercel AI SDK docs](https://sdk.vercel.ai/docs)
- [Vercel AI SDK Playground](https://sdk.vercel.ai/playground)
- [Browserless.io Docker Quick Start](https://docs.browserless.io/docker/quickstart)

## Resouces

- [Achromatic - UI Components](https://www.radix-ui.com/docs/primitives/components/accordion)
- [Radix UI - Primitives](https://www.radix-ui.com/primitives)
- [React Component Library](https://makerkit.dev/blocks/marketing/newsletter)

## TODO

- Add advance text editor like OpenAI's [ChatGPT Canvas](https://openai.com/index/introducing-canvas/) ([docs](https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it)
- [more](./todo.txt)
