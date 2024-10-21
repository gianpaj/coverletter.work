// import { revalidatePath } from 'next/cache'
// import { kv } from '@vercel/kv'

export async function saveCoverLetter(coverLetter: CoverLetter) {
  // const session = await auth()
  // if (session && session.user) {
  // const pipeline = kv.pipeline();
  // pipeline.hmset(`chat:${coverLetter.id}`, coverLetter);
  // pipeline.zadd(`user:chat:${coverLetter.userId}`, {
  //   score: Date.now(),
  //   member: `chat:${coverLetter.id}`,
  // });
  // await pipeline.exec();
  // } else {
  //   return
  // }
}

export async function removeCoverLetter({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  // const session = await auth()
  // if (!session) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }
  // Convert uid to string for consistent comparison with session.user.id
  // const uid = String(await kv.hget(`chat:${id}`, 'userId'))
  // if (uid !== session?.user?.id) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }
  // await kv.del(`chat:${id}`)
  // await kv.zrem(`user:chat:${session.user.id}`, `chat:${id}`)
  // revalidatePath('/')
  // return revalidatePath(path)
}
