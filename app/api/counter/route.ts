import { kv } from '@vercel/kv';

export async function GET() {
  try {
    const counter = (await kv.get<number>('counter-cover-letters')) || 0;
    return new Response(
      JSON.stringify({
        ok: true,
        data: counter,
      })
    );
  } catch (error) {
    // TODO: send logs to sentry or logflare
    console.log(error);
    return new Response(
      JSON.stringify({
        data: 0,
      }),
      {
        status: 500,
      }
    );
  }
}
