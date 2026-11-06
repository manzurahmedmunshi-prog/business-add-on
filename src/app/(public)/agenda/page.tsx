export default function AgendaPage() {
  const days = [
    {
      day: 'Day 1',
      title: 'The Inspiration Day',
      theme: 'Learn from the Best',
      items: [
        'Inauguration & Opening Ceremony',
        'Keynote Sessions',
        'Entrepreneur & Industry Leader Talks',
        'Celebrity / Public Figure Conversations',
        'Panel Discussions & Fireside Chats',
        'Networking Sessions',
        'Opening Business Challenge Rounds',
        'Evening Artist Performance',
      ],
    },
    {
      day: 'Day 2',
      title: 'The Challenge Day',
      theme: 'Beat the Clock',
      items: [
        'Business Innovation Challenge',
        'Brand & Marketing Challenge',
        'Startup Sprint',
        'Financial / Budget Challenge',
        'Business Crisis Simulation',
        'Mentor Interactions',
        'Startup & Brand Expo',
        'Evening Entertainment',
      ],
    },
    {
      day: 'Day 3',
      title: 'The Opportunity Day',
      theme: 'Turn Ideas into Reality',
      items: [
        'Final Business Pitches',
        'Investor / Entrepreneur Interactions',
        'Startup & Sponsor Exhibition',
        'Networking',
        'Awards Ceremony',
        'Closing Ceremony',
        'Closing Artist Performance',
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="section-heading text-center mb-4">Event Agenda</h1>
      <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
        Proposed programme structure. Timings, stages and confirmed sessions will be updated
        in the admin dashboard and published once locked.
      </p>

      <div className="space-y-10">
        {days.map((d) => (
          <div key={d.day} className="card">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-4">
              <span className="text-brand-gold font-semibold">{d.day}</span>
              <h2 className="text-2xl font-display text-white">{d.title}</h2>
            </div>
            <p className="text-white/50 text-sm mb-6">Theme: {d.theme}</p>
            <ul className="grid sm:grid-cols-2 gap-2">
              {d.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/80 text-sm">
                  <span className="text-brand-gold mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
