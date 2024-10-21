const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a cover letter? ',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '<p>A cover letter lets you introduce yourself to potential employers and describe why you’re a good fit for an open role. Unlike a résumé, which summarizes your work history and skills in more of a list format, a cover letter provides space for you to illustrate how your prior experience applies to the role for which you’re applying. It also allows you to showcase your soft skills and explain why you’re excited about the company and role. Employers use cover letters to help gauge if you’re a good fit for a position and their culture and values.</p>',
      },
    },
    {
      '@type': 'Question',
      name: 'What info should a cover letter include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '<p>Your résumé’s cover letter should start with an introduction that includes the job title and a summary of why you’re interested in the job and the company. If someone at the company has referred you to this role, you should also mention that person’s name in your introduction.</p><p></p><p>Next, include one to two paragraphs about your qualifications and skills and your interest in the company. Opt for a narrow focus, highlighting your most applicable skills and explaining how they will help you succeed in the role. When you talk about the company, show you’re familiar with its mission and values and explain how its goals align with your own.</p><p></p><p>Wrap up your cover letter with a paragraph that restates your interest in the company and the role. You may also wish to thank the reader for their time and for considering your application.</p><p></p><p>If you want to speed up the writing process, use Custom Cover Letter generator. It will help you squash writer’s block instantly.</p>',
      },
    },
    {
      '@type': 'Question',
      name: 'How should a cover letter start?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '<p>When writing a cover letter for your résumé, start with a greeting, like “Dear hiring manager,” and then launch into a short introduction. In the introduction, include the job title you’re applying for and write a summary of why you’re interested in the position and the company. If someone at the company referred you to the role, mention their name here too.</p><p></p><p>Some people also include a brief header at the top of their cover letter. Headers typically contain your name and contact information, links to your website or online résumé, and the date.</p>',
      },
    },
    {
      '@type': 'Question',
      name: 'To whom should I address a cover letter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '<p>If possible, address your cover letter to the hiring manager. (You can sometimes find their name on the job application.) For example, if the hiring manager is Anita Kawfee, start your letter with “Dear Anita Kawfee.” To avoid misgendering, use the hiring manager&#39;s full name without adding a title like Mr., Ms., or Mx.</p><p></p><p>If you don’t know the hiring manager’s name, use a general salutation such as “Dear hiring manager.”</p>',
      },
    },
    {
      '@type': 'Question',
      name: 'How should a cover letter end?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '<p>Wrap up your cover letter with a short paragraph that thanks the reader for their time and reaffirms your interest in the role and company. Follow this paragraph with a short sign-off—such as “Sincerely,” “Thank you,” or “Best”—followed by your full name. Some people choose to add their contact information (email, phone number, and website) under their name instead of putting it in a header at the top of the cover letter.</p>',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I write a cover letter if it’s optional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '<p>It’s a good idea to write a cover letter even if a job post lists it as optional. This shows you’re willing to put in the extra effort and gives you a place to tell the hiring manager why you’re a good fit for the company and the role. Additionally, writing a cover letter provides an opportunity to show off a bit of your personality, which can help you stand out from other applicants.</p><p></p><p>If writing isn’t your forte or you’re wondering how to write a cover letter, you may want to use a cover letter generator.</p>',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a cover letter generator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '<p>A cover letter generator is a tool that can make applying for jobs much simpler and more streamlined. A cover letter generator uses AI-powered assistance to help you create a professional, personalized cover letter in a few quick steps. </p><p></p><p>You don’t need to know how to write a cover letter or the standard cover letter format to use a cover letter generator. You just need to input some basic information about yourself and the details you’d like included—then your personalized cover letter is ready in seconds. </p>',
      },
    },
    {
      '@type': 'Question',
      name: 'What information should I include in my prompt for a stellar cover letter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '<p>When using Custom Cover Letter’s assistance to help you craft cover letters, it’s best to provide a significant amount of information. The more detailed your prompts are, the clearer and more engaging your cover letter will be. To start, be sure to include the following information in your prompt: </p><p></p><p>\n\n• Specific details about your past work experience</p><p> • Specific details about the role you’re applying for</p><p>• The tone you’d like your cover letter to have</p><p> • The information you’d like to include in the header or footer of your cover letter, such as your name and email, the date, and the company’s name and address. </p>',
      },
    },
  ],
};

export const JSONSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
);
