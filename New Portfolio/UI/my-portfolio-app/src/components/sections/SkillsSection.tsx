interface Skill {
  id: string;
  name: string;
  category: string;
}

interface SkillsProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-16 md:py-24">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span key={skill.id} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
}