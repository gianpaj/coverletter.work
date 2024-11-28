const buttons = [
  {
    emoji: '🤡',
    text: 'Clown',
    cl: `Dear Ringmaster,

HONK HONK! 🤡 (That's "Hello" in clown-speak)

When I saw your posting for a circus clown position, I nearly fell off my unicycle with excitement! With 5 years of professional pie-throwing experience and a PhD in Silly Walks from the Prestigious Institute of Pratfalls, I believe I'm the perfect candidate to join your circus family.

My qualifications include:
- Ability to fit 47 fellow clowns in a single tiny car (a personal record!)
- Expert-level balloon animal creation, including rarely attempted species like the giraffe-octopus hybrid
- Advanced degree in Water Squirting Flower Technology
- Certified in Advanced Juggling (can keep chainsaws, rubber chickens, and my dignity in the air simultaneously)

During my previous role at Chuckles & Co. Circus, I developed a revolutionary slip-on-banana-peel technique that increased audience laughter by 200%. I also pioneered the "Triple Cream Pie Combo" which became our most requested act.

My red nose has never failed a squeaking inspection, and my oversized shoes are always polished to perfection. I'm also fluent in mime and can communicate effectively with silent colleagues.

I would love to demonstrate my skills in person - just follow the trail of confetti to my house. I look forward to discussing how I can contribute to your circus's legacy of laughter.

Seriously unseriously yours,
[Your Name]`,
  },
  // { emoji: '✍️', text: 'Personal blog' },
  // { emoji: '⏰', text: 'Waitlist site' },
  // { emoji: '💪', text: 'Workout tracker' },
  // { emoji: '🤖', text: 'AI debate app' },
];

export default function DefaultCLButtons({
  onClick,
}: {
  onClick: (text: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map(item => (
        <button
          key={item.text}
          type="button"
          onClick={() => onClick(item.cl)}
          className="text-sans-14 font-400 hover:bg-almost-black text-dark-gray max-w-full rounded-md border border-[color-mix(in_srgb,currentColor_20%,transparent)] bg-transparent px-2 py-1 transition-colors duration-150 ease-in-out"
        >
          <span className="flex max-w-full items-center justify-center gap-2 overflow-hidden text-left">
            <span>{item.emoji}</span>
            <span className="w-full truncate">{item.text}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
