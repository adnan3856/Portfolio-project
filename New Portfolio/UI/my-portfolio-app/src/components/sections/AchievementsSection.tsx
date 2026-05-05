interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsProps) {
  return (
    <section id="achievements" className="py-16 md:py-24">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Achievements & Awards</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {achievements.map((ach) => (
          <div key={ach.id} className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg">{ach.title}</h3>
            <p className="text-sm text-primary font-medium mb-3">{ach.issuer} • {ach.date}</p>
            <p className="text-muted-foreground leading-relaxed">{ach.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}