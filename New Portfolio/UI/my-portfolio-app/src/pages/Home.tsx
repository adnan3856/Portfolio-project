import { Navbar } from "@/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export function Home() {
  // Mock data representing the DTOs from your Spring Boot backend
  const mockProfile = {
    name: "Adnan",
    headline: "Full Stack Java & React Developer",
    bio: "Building robust backend services with Spring Boot and dynamic frontends with React.",
  };
  
  const mockAbout = ["I am a software engineer with a passion for building scalable web applications.", "When I'm not coding, I'm exploring new technologies and best practices."];
  
  const mockSkills = [
    { id: "1", name: "Java 21", category: "Backend" },
    { id: "2", name: "Spring Boot 3", category: "Backend" },
    { id: "3", name: "React", category: "Frontend" },
    { id: "4", name: "Tailwind CSS", category: "Frontend" },
    { id: "5", name: "PostgreSQL", category: "Database" },
  ];

  const mockExperience = [
    {
      id: "1", jobTitle: "Software Engineer", companyName: "Tech Corp",
      startDate: "Jan 2023", endDate: null,
      description: ["Developed RESTful APIs using Spring Boot.", "Integrated frontend utilizing React and Tailwind."]
    }
  ];

  const mockAchievements = [
    { id: "1", title: "AWS Certified Developer", issuer: "Amazon Web Services", date: "2023", description: "Earned certification demonstrating proficiency in developing modern cloud applications." }
  ];

  const mockContact = {
    email: "adnan@example.com",
    socialLinks: { github: "https://github.com", linkedin: "https://linkedin.com", twitter: "https://twitter.com" }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Navbar />
      <main className="container mx-auto px-6 max-w-4xl space-y-10">
        <HeroSection {...mockProfile} />
        <AboutSection description={mockAbout} />
        <SkillsSection skills={mockSkills} />
        <ExperienceSection experiences={mockExperience} />
        <AchievementsSection achievements={mockAchievements} />
        <ContactSection {...mockContact} />
      </main>
    </div>
  );
}
