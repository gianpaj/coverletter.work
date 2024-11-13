import { kv } from '@vercel/kv';

import { isValidHttpUrl } from '@/lib/utils';
import { getURLWithoutQueryParams } from '@/lib/server/websearch/scrape/parser';
import { stringifyMarkdownElementTree } from '@/lib/server/websearch/markdown/utils/stringify';
import {
  isJobContent,
  isBlockListed,
} from '@/lib/server/websearch/scrape/filter';
import { CachedPage } from '@/lib/server/websearch/scrape/types';
import { scrape } from '@/lib/server/websearch/scrape/scrape';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.url) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing url' }), {
      status: 400,
    });
  }

  // TODO allow to not putting http or https
  // const url =

  // check if url is valid
  if (!isValidHttpUrl(body.url)) {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid url' }), {
      status: 400,
    });
  }

  if (isBlockListed(body.url)) {
    return new Response(JSON.stringify({ ok: false, error: 'Blocked' }), {
      status: 403,
    });
  }

  try {
    const urlWithoutQueryParams = getURLWithoutQueryParams(body.url);

    const cachedPage = await kv.json.get<CachedPage>(
      `job:${urlWithoutQueryParams}`
    );
    if (cachedPage) {
      return new Response(
        JSON.stringify({
          ok: true,
          page: JSON.parse(cachedPage.page),
        })
      );
    }

    const {
      page: { title, markdownTree, locale },
    } = await scrape(body.url);
    const page = {
      title,
      text: stringifyMarkdownElementTree(markdownTree),
      locale,
    };
    console.dir(page, { depth: null });

    if (locale?.startsWith('en') && !isJobContent(page.text)) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: 'URL does not appear to be job-related',
        }),
        { status: 403 }
      );
    }

    await kv.json.set(`job:${urlWithoutQueryParams}`, '$', {
      page: JSON.stringify(page),
      timestamp: Date.now(),
    });

    return new Response(JSON.stringify({ ok: true, page }));
  } catch (e) {
    console.error(e);
    // @ts-expect-error TODO: fix type
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 400,
    });
  }
}
