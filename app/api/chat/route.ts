import { convertToCoreMessages, Message, streamText } from 'ai';
import { kv } from '@vercel/kv';

import { customModel } from '@/ai';
// import { auth } from "@/app/(auth)/auth";
// import { deleteChatById, getChatById, saveChat } from "@/db/queries";
import { SYSTEM_MESSAGE } from '@/app/utils/prompts';

export async function POST(request: Request) {
  const { id, messages }: { id: string; messages: Array<Message> } =
    await request.json();

  // const session = await auth();

  // if (!session) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  const coreMessages = convertToCoreMessages(messages);

  const result = await streamText({
    model: customModel,
    system: SYSTEM_MESSAGE,
    messages: coreMessages,
    maxSteps: 5,
    // tools: {
    //   getWeather: {
    //     description: "Get the current weather at a location",
    //     parameters: z.object({
    //       latitude: z.number(),
    //       longitude: z.number(),
    //     }),
    //     execute: async ({ latitude, longitude }) => {
    //       const response = await fetch(
    //         `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`,
    //       );

    //       const weatherData = await response.json();
    //       return weatherData;
    //     },
    //   },
    // },
    // onFinish: async ({ responseMessages }) => {
    //   if (session.user && session.user.id) {
    //     try {
    //       await saveChat({
    //         id,
    //         messages: [...coreMessages, ...responseMessages],
    //         userId: session.user.id,
    //       });
    //     } catch (error) {
    //       console.error("Failed to save chat");
    //     }
    //   }
    // },
    experimental_telemetry: {
      isEnabled: true,
      functionId: 'stream-text',
    },
    onFinish: async ({ responseMessages }) => {
      // if (session.user && session.user.id) {
      try {
        if (process.env.NODE_ENV === 'production') {
          await kv.incr('counter-cover-letters');
        } else {
          console.log('COUNTER inc (dev)');
        }
      } catch (error) {
        console.error('Failed to count generated cover letters');
        console.error(error);
      }
    },
  });

  return result.toDataStreamResponse({});
}

// export async function DELETE(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");

//   if (!id) {
//     return new Response("Not Found", { status: 404 });
//   }

//   const session = await auth();

//   if (!session || !session.user) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   try {
//     const chat = await getChatById({ id });

//     if (chat.userId !== session.user.id) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     await deleteChatById({ id });

//     return new Response("Chat deleted", { status: 200 });
//   } catch (error) {
//     return new Response("An error occurred while processing your request", {
//       status: 500,
//     });
//   }
// }
