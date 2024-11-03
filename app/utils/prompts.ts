export const SYSTEM_MESSAGE = `You're an export copy writer and recruiter...`;

const addOptionalCL = (COVER_LETTER: string) =>
  COVER_LETTER
    ? `Example cover letter:
<cover_letter>
${COVER_LETTER}
</cover_letter>`
    : '';

export const createCoverLetter = (
  JOB_DESCRIPTION: string,
  COVER_LETTER: string,
  COVER_TYPE = 'short'
) => `You are tasked with creating a tailored cover letter based on a given job description. Your goal is to craft a compelling and relevant cover letter that highlights the applicant's qualifications and enthusiasm for the position.

First, carefully read and analyze the following job description:

<job_description>
${JOB_DESCRIPTION}
</job_description>

${addOptionalCL(COVER_LETTER)}

The cover letter you create should be ${COVER_TYPE}. Keep this requirement in mind throughout the writing process.

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

Do not write an address

Only return the cover letter, do not return anything else. Remember to tailor the content to the specific job description and maintain the ${COVER_TYPE} style throughout.`;

export const INITIAL_JOB_DESCRIPTION = `Minimum qualifications:
- Bachelor's degree or equivalent practical experience.
- 5 years of coding experience in one or more general purpose languages.
- 5 years of experience with security assessments, security design reviews, or threat modeling.
- 5 years of experience with security engineering, computer and network security, and security protocols.
- 1 year of experience leading teams in a technical capacity or leading technical risk analysis in an enterprise environment.

Preferred qualifications:

- 4 years of experience in data analysis, hazard assessment, risk and fraud investigation, security vulnerabilities, or ethical hacking.
- Ability to comprehend and review code in one or more general purpose languages.
- Excellent communication skills, with the ability to influence others.

About the job:

Our Security team works to create and maintain the safest operating environment for Google's users and developers. Security Engineers work with network equipment and actively monitor our systems for attacks and intrusions. In this role, you will also work with software engineers to proactively identify and fix security flaws and vulnerabilities.

Product Security Engineering is the team within the Cloud CISO organization responsible for helping ensure every product Cloud ships is as secure as it can be and increasing the assurance levels of security in the infrastructure underlying all our products. This team will also focus on increasing the capabilities of each product team to develop more secure products by design and by default, from patterns, tools and frameworks to increasing the skill level of embedded security leads. As a Senior Information Security Engineer, you will help to ensure that our software and systems are designed and implemented to the highest security standards. You will perform technical security assessments, code reviews and vulnerability testing to highlight risk, helping Google teams and partners to improve security, and work on a wide variety of software designs and technology stacks.

Google Cloud accelerates every organization’s ability to digitally transform its business and industry. We deliver enterprise-grade solutions that leverage Google’s cutting-edge technology, and tools that help developers build more sustainably. Customers in more than 200 countries and territories turn to Google Cloud as their trusted partner to enable growth and solve their most critical business problems.

Responsibilities:

- Identify security issues and implement and design security controls, tools, and services to improve security systems and processes.
- Perform security reviews, research and reproduce vulnerabilities, design secure protocols and systems, and write tests and fuzzers.
- Review and develop secure operational practices, and provide security guidance for engineers and support staff.
- Review designs and look for vulnerabilities, both with one-time reviews and longer term engagements, surface vulnerability patterns, and design them out.
- Look for vulnerabilities with techniques including reverse engineering, fuzzing, and static analysis. Respond to vulnerabilities with repos, mitigations, and hardening.`;

export const INITIAL_COVER_LETTER = `Dear [Hiring Manager],

I am excited about the possibility of joining Replit because of the seamless developer experience you offer. The idea of building software collaboratively, from anywhere, without the hassle of setup, perfectly aligns with my belief in streamlining workflows for developers. I am particularly drawn to Replit’s commitment to innovation and the significant investment in AI, which I see as a game changer in boosting productivity and enhancing creativity in coding.

If given the opportunity, I would love to contribute to expanding Replit’s collaborative tools and AI-powered features, making development even more intuitive and accessible for developers at all skill levels.

Thank you for considering my application.`;
