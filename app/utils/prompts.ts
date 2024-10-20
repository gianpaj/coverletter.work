/**

*/
export const createCoverLetter = (
  JOB_DESCRIPTION: string,
  COVER_TYPE: string,
) => `You are tasked with creating a tailored cover letter based on a given job description. Your goal is to craft a compelling and relevant cover letter that highlights the applicant's qualifications and enthusiasm for the position.

First, carefully read and analyze the following job description:

<job_description>
${JOB_DESCRIPTION}
</job_description>

The cover letter you create should be {{COVER_TYPE}}. Keep this requirement in mind throughout the writing process.

To create an effective cover letter:

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

Write your cover letter inside <cover_letter> tags. Remember to tailor the content to the specific job description and maintain the ${COVER_TYPE} style throughout.`;
