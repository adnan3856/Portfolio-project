import { Button } from "@/components/ui/button";

interface HeroProps {
  name: string;
  headline: string;
  bio: string;
}

export function HeroSection({ name, headline, bio }: HeroProps) {
  return (
    <section id="hero" className="py-24 text-center flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        Hi, I'm <span className="text-primary">{name}</span>
      </h1>
      <h2 className="mt-4 text-2xl font-semibold text-muted-foreground sm:text-3xl">
        {headline}
      </h2>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{bio}</p>
      
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button size="lg" asChild><a href="#contact">Contact Me</a></Button>
        <Button variant="outline" size="lg" asChild><a href="#projects">View Projects</a></Button>
      </div>
    </section>
  );
}