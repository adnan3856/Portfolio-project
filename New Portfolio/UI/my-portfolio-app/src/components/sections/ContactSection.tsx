import { Button } from "@/components/ui/button";

interface ContactProps {
  email: string;
  socialLinks: Record<string, string>;
}

export function ContactSection({ email, socialLinks }: ContactProps) {
  return (
    <section id="contact" className="py-24 text-center">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Get In Touch</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
        I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open!
      </p>
      <div className="flex flex-col items-center gap-6">
        <Button size="lg" asChild>
          <a href={`mailto:${email}`}>Say Hello</a>
        </Button>
        <div className="flex gap-6 mt-6">
          {Object.entries(socialLinks).map(([platform, url]) => (
            <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors capitalize font-medium">
              {platform}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}