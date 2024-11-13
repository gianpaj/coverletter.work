import JSON5 from 'json5';
import z from 'zod';

const JOB_RELATED_EN_KEYWORDS = [
  'job',
  'career',
  'employment',
  'vacancy',
  'hiring',
  'recruitment',
];

export function isJobContent(content: string): boolean {
  const contentLower = content.toLowerCase();
  const keywordCounts = JOB_RELATED_EN_KEYWORDS.reduce(
    (counts, keyword) => {
      const matches = (
        contentLower.match(new RegExp(keyword.toLowerCase(), 'g')) || []
      ).length;
      if (matches > 0) {
        counts[keyword] = matches;
      }
      return counts;
    },
    {} as Record<string, number>
  );

  const totalCount = Object.values(keywordCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  console.debug('Job keyword counts:', keywordCounts);
  console.debug('Total job keyword count:', totalCount);
  // Return true if there are sufficient job-related keywords
  return totalCount >= 3; // Adjust threshold as needed
}

const listSchema = z.array(z.string()).default([]);
const blockList = listSchema.parse(
  JSON5.parse(process.env.WEBSEARCH_BLOCKLIST || '[]')
);

export function isBlockListed(url: string) {
  const thisUrl = new URL(url);
  return blockList.includes(thisUrl.host.replace('www.', ''));
}
