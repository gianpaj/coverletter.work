# CoverLetter.work

Free AI-powered cover letter generator that helps you create professional cover letters tailored to your dream job.

**🔗 Live Demo:** [coverletter.work](https://coverletter.work)

## About

CoverLetter.work is an AI-powered web application that generates personalized cover letters for job applications. Simply input your job details and experience, and get a professionally written cover letter in seconds.

## Features

- **AI-Powered Generation**: Uses advanced AI to create tailored cover letters
- **Free to Use**: No payment required - completely free service
- **Professional Templates**: Well-structured, professional format
- **Quick & Easy**: Generate cover letters in seconds
- **Job-Specific**: Customized content based on job descriptions

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **AI Integration**: OpenAI API, Vercel AI SDK
- **Deployment**: Vercel (frontend), Fly.io (backend services)
- **Web Scraping**: Puppeteer with Browserless

## Getting Started

### Prerequisites

1. [OpenAI API Key](https://platform.openai.com/account/api-keys)
2. Node.js 18+ installed
3. (Optional) [Vercel Blob Store](https://vercel.com/docs/storage/vercel-blob) for file attachments

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/gianpaj/coverletter.work.git
   cd coverletter.work
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API keys
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Frontend (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgianpaj%2Fcoverletter.work&env=OPENAI_API_KEY&project-name=coverletter-work&repository-name=coverletter-work)

### Backend Services (Fly.io)

For the Puppeteer headless browser service:

```bash
# Install Fly.io CLI
brew install fly

# Deploy the service
fly launch  # First time setup
fly deploy  # Subsequent deployments
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Resources

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Radix UI Components](https://www.radix-ui.com/primitives)
- [Browserless Docker Setup](https://docs.browserless.io/docker/quickstart)

## Roadmap

- Advanced text editor similar to ChatGPT Canvas
- Multiple cover letter templates
- Export to different formats (PDF, DOCX)
- Resume analysis integration

For more planned features, see [todo.txt](./todo.txt)

## Learning Opportunity

> **Want to build similar AI applications?**  
> Contact me at [gianfranco@escuela.dev](mailto:gianfranco@escuela.dev) for one-on-one mentoring.  
> Visit [escuela.dev](https://escuela.dev) to learn more.

## License

Open source - feel free to use and modify.