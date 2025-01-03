import puppeteer from 'puppeteer-core';
import type { Page, Browser, HTTPResponse } from 'puppeteer-core';
// import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';

import { onExit } from '@/lib/server/exitHandler';
import { timeout } from '@/lib/utils';
import { spatialParser } from '@/lib/server/websearch/scrape/parser';
import { htmlToMarkdownTree } from '@/lib/server/websearch/markdown/tree';

// const blocker =
//   process.env.PLAYWRIGHT_ADBLOCKER === 'true'
//     ? await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch)
//         .then(blker => {
//           const mostBlocked = blker
//             .blockFonts()
//             .blockMedias()
//             .blockFrames()
//             .blockImages();
//           if (process.env.WEBSEARCH_JAVASCRIPT === 'false')
//             return mostBlocked.blockScripts();
//           return mostBlocked;
//         })
//         .catch(err => {
//           logger.error(
//             err,
//             'Failed to initialize PlaywrightBlocker from prebuilt lists'
//           );
//           return PlaywrightBlocker.empty();
//         })
//     : PlaywrightBlocker.empty();

let browserSingleton: Promise<Browser> | undefined;

async function getBrowser() {
  const browser = await puppeteer.connect({
    browserWSEndpoint: `ws://${process.env.PUPPETEER_HOST}?token=${process.env.PUPPETEER_TOKEN}`,
  });
  onExit(() => browser.close());
  browser.on('disconnected', () => {
    console.warn('Browser closed');
    browserSingleton = undefined;
  });
  return browser;
}

async function getPuppeteerCtx() {
  if (!browserSingleton) browserSingleton = getBrowser();
  const browser = await browserSingleton;

  // const device = devices['Desktop Chrome'];
  // const options = {
  //   ...device,
  //   // Increasing width improves spatial clustering accuracy
  //   screen: {
  //     width: 3840,
  //     height: 1080,
  //   },
  //   viewport: {
  //     width: 3840,
  //     height: 1080,
  //   },
  //   reducedMotion: 'reduce',
  //   acceptDownloads: false,
  //   timezoneId: 'America/New_York',
  //   locale: 'en-US',
  // };
  return browser.createBrowserContext();
}

export async function withPage<T>(
  url: string,
  callback: (page: Page, response?: HTTPResponse) => Promise<T>
): Promise<T> {
  const ctx = await getPuppeteerCtx();

  try {
    const page = await ctx.newPage();
    // process.env.PLAYWRIGHT_ADBLOCKER === "true" && (await blocker.enableBlockingInPage(page));

    const timeout = parseInt(process.env.WEBSEARCH_TIMEOUT ?? '3500');
    // await page.route('**', async route => {
    //   const response = await route.fetch({ maxRedirects: 3 });
    //   let headers = response.headers();
    //   delete headers['location'];
    //   delete headers['Location'];
    //   return route.fulfill({
    //     response,
    //     headers,
    //   });
    // });

    // Headless mode doesn't support navigation to a PDF document. See the upstream issue. <https://bugs.chromium.org/p/chromium/issues/detail?id=761295>
    const res = await page
      .goto(url, { waitUntil: 'load', timeout })
      .catch(e => {
        if (e.message.includes('TimeoutError')) {
          console.warn(`Failed to load page within ${timeout / 1000}s: ${url}`);
        } else {
          console.warn(`Failed to load page: ${url}`);
        }
        // TODO: send logs to sentry or logflare
        console.log(e);
      });

    // await needed here so that we don't close the context before the callback is done
    return await callback(page, res ?? undefined);
  } finally {
    ctx.close();
  }
}

export const scrape = async (link: string) => {
  // async function* (
  //   source: WebSearchSource
  // ): AsyncGenerator<
  //   MessageWebSearchUpdate,
  //   WebSearchScrapedSource | undefined,
  //   undefined
  // > {
  try {
    const startTime = Date.now();
    // MetricsServer.getMetrics().webSearch.pageFetchCount.inc();

    const maxCharsPerElem = 1000;
    console.log('Scraping webpage', link);
    const page = await scrapeUrl(link, maxCharsPerElem);

    // MetricsServer.getMetrics().webSearch.pageFetchDuration.observe(Date.now() - startTime);

    console.info(`Scraped ${link} in ${Date.now() - startTime}ms`);

    // yield makeGeneralUpdate({
    // 	message: "Browsing webpage",
    // 	args: [source.link],
    // });
    return { page };
  } catch (e) {
    // MetricsServer.getMetrics().webSearch.pageFetchCountError.inc();
    console.error(e, `Error scraping webpage: ${link}`);
    throw e;
  }
};

export async function scrapeUrl(url: string, maxCharsPerElem: number) {
  return withPage(url, async (page, res) => {
    if (!res) throw Error('Failed to load page');

    // Check if it's a non-html content type that we can handle directly
    // TODO: direct mappings to markdown can be added for markdown, csv and others
    const contentType = res.headers()['content-type'] ?? '';

    if (
      contentType.includes('text/plain') ||
      contentType.includes('text/markdown') ||
      contentType.includes('application/json') ||
      contentType.includes('application/xml') ||
      contentType.includes('text/csv')
    ) {
      const title = await page.title();
      const content = await page.content();
      return {
        title,
        content,
        locale: '',
        markdownTree: htmlToMarkdownTree(
          title,
          [{ tagName: 'p', attributes: {}, content: [content] }],
          maxCharsPerElem
        ),
      };
    }

    const scrapedOutput = await timeout(page.evaluate(spatialParser), 2000)
      .then(({ elements, ...parsed }) => ({
        ...parsed,
        title: parsed.title ?? 'Untitled',
        locale: parsed.locale,
        markdownTree: htmlToMarkdownTree(
          parsed.title,
          elements,
          maxCharsPerElem
        ),
      }))
      .catch(cause => {
        throw Error('Parsing failed', { cause });
      });
    return scrapedOutput;
  });
}
