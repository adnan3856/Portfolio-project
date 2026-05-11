import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { portfolioService } from "@/services/portfolioService";
import { Navbar } from "@/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export function Home() {
  const { username } = useParams<{ username: string }>();
  const [data, setData] = useState<{
    about: any;
    skills: any[];
    experience: any[];
    achievements: any[];
    contact: any;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) {
      setError("No username provided in the URL.");
      setIsLoading(false);
      return;
    }

    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [aboutRes, skillsRes, expRes, achRes, contactRes] = await Promise.allSettled([
          portfolioService.getAbout(username),
          portfolioService.getSkills(username),
          portfolioService.getExperience(username),
          portfolioService.getAchievements(username),
          portfolioService.getContact(username)
        ]);

        setData({
          about: aboutRes.status === 'fulfilled' && aboutRes.value ? aboutRes.value : null,
          skills: skillsRes.status === 'fulfilled' && Array.isArray(skillsRes.value) ? skillsRes.value : [],
          experience: expRes.status === 'fulfilled' && Array.isArray(expRes.value) ? expRes.value : [],
          achievements: achRes.status === 'fulfilled' && Array.isArray(achRes.value) ? achRes.value : [],
          contact: contactRes.status === 'fulfilled' && contactRes.value ? {
            email: contactRes.value.email,
            phone: contactRes.value.phone,
            location: contactRes.value.location,
            socialLinks: {
              github: contactRes.value.github,
              linkedin: contactRes.value.linkedin,
              facebook: contactRes.value.facebook,
              instagram: contactRes.value.instagram
            }
          } : null
        });
      } catch (err: any) {
        setError("Failed to load portfolio data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [username]);

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-destructive">{error}</h2>
        </main>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <h2 className="text-2xl font-medium animate-pulse text-primary tracking-widest uppercase">Loading Portfolio...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Navbar />
      
      <main className="w-full">
        <HeroSection username={username} />
        <div className="container mx-auto px-6 max-w-4xl flex flex-col gap-12 md:gap-16 py-12">
          {data.about && <AboutSection {...data.about} />}
          
          {data.skills && data.skills.length > 0 && (
            <>
              <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <SkillsSection skills={data.skills} />
            </>
          )}

          {data.experience && data.experience.length > 0 && (
            <>
              <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <ExperienceSection experiences={data.experience} />
            </>
          )}

          {data.achievements && data.achievements.length > 0 && (
            <>
              <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <AchievementsSection achievements={data.achievements} />
            </>
          )}

          {data.contact && (
            <>
              <div className="h-px w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <ContactSection {...data.contact} username={username} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
