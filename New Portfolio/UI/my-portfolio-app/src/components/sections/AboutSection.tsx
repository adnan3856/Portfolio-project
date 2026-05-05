interface AboutProps {
  description: string[];
}

export function AboutSection({ description }: AboutProps) {
  return (
    <section id="about" className="py-16 md:py-24">
      <h2 className="text-3xl font-bold tracking-tight mb-8">About Me</h2>
      <div className="space-y-4 text-lg text-muted-foreground">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}