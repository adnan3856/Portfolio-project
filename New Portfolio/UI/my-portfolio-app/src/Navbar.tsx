import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <nav className="border-b px-6 py-3 flex items-center justify-between bg-background">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight">Portfolio</span>
      </div>
      
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
        <a href="#about" className="hover:text-foreground transition-colors">About</a>
        <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
        <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        <a href="/admin" className="text-primary font-bold hover:text-primary/80 transition-colors">Admin</a>
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <Button variant="default">Hire Me</Button>
      </div>
    </nav>
  );
}