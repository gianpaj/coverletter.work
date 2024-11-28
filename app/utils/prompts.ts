export const SYSTEM_MESSAGE = `You're an export copy writer and recruiter...`;

const addOptionalCL = (COVER_LETTER: string) =>
  COVER_LETTER
    ? `Adapt a previous cover letter of mine:
<cover_letter>
${COVER_LETTER}
</cover_letter>`
    : '';

export const createCoverLetter = (
  JOB_DESCRIPTION: string,
  COVER_LETTER: string,
  COVER_TYPE = 'short'
) => `You are tasked with ${COVER_LETTER ? 'adapting' : 'creating'} a tailored cover letter based on a given job description. Your goal is to craft a compelling and relevant cover letter that highlights the applicant's qualifications and enthusiasm for the position.

First, carefully read and analyze the following job description:

<job_description>
${JOB_DESCRIPTION}
</job_description>

${addOptionalCL(COVER_LETTER)}

${COVER_LETTER ? 'The cover letter you create should' : 'The cover letter you adapte should'} be ${COVER_TYPE}. Keep this requirement in mind throughout the writing process.

To ${COVER_LETTER ? 'adapt' : 'create'} an effective cover letter:

1. Analyze the job description:
   - Identify key skills, qualifications, and experiences required for the position
   - Note any specific technologies, methodologies, or industry knowledge mentioned
   - Pay attention to the company culture and values, if mentioned

2. Craft the cover letter:
   - Begin with a strong opening paragraph that expresses enthusiasm for the position and company
   - In the body paragraphs, address 2-3 key qualifications or experiences that directly relate to the job requirements
   - Provide specific examples of how your skills and experiences align with the job description
   - Demonstrate knowledge of the company and explain why you're interested in working there
   - Conclude with a call to action, expressing your interest in further discussion and thanking the reader for their consideration

3. Ensure the tone and style match the ${COVER_TYPE} requirement

4. Keep the cover letter concise, typically no more than one page in length

5. Proofread for grammar, spelling, and clarity

Do not write an address

Only return the cover letter, do not return anything else. Remember to tailor the content to the specific job description and maintain the ${COVER_TYPE} style throughout.

Add some fun facts about yourself, like hobbies or interests, and how they relate to the job you're applying for - like creativity or problem-solving.

${COVER_LETTER ? "Make sure to use the '<cover_letter>' provided as a source of inspiration." : ''}
`;

export const INITIAL_COVER_LETTER = `Dear [Hiring Manager],

I am excited about the possibility of joining Replit because of the seamless developer experience you offer. The idea of building software collaboratively, from anywhere, without the hassle of setup, perfectly aligns with my belief in streamlining workflows for developers. I am particularly drawn to Replit’s commitment to innovation and the significant investment in AI, which I see as a game changer in boosting productivity and enhancing creativity in coding.

If given the opportunity, I would love to contribute to expanding Replit’s collaborative tools and AI-powered features, making development even more intuitive and accessible for developers at all skill levels.

Thank you for considering my application.`;
