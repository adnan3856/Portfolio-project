interface Experience {
  id: string;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string | null;
  description: string[];
}

interface ExperienceProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-16 md:py-24">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Experience</h2>
      <div className="space-y-12">
        {experiences.map((exp) => (
          <div key={exp.id} className="border-l-2 border-primary pl-6 pb-2 relative">
            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2"></div>
            <h3 className="text-xl font-bold">{exp.jobTitle}</h3>
            <div className="text-muted-foreground mb-4 font-medium">
              {exp.companyName} • {exp.startDate} - {exp.endDate || "Present"}
            </div>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}