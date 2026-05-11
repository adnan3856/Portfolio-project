import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ArrowDown } from "lucide-react";
import { portfolioService } from "@/services/portfolioService";

interface HeroProfile {
  name: string;
  roles: string[];
  resumeLink: string;
  backgroundImageUrl?: string;
  // Fallbacks mapped from standard Spring Boot DTOs
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

// Reusable component for the smooth typing animation
function TypingText({ roles }: { roles: string[] }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!roles || roles.length === 0) return;
    
    const typingSpeed = isDeleting ? 40 : 80;
    const timeout = setTimeout(() => {
      const fullText = roles[currentRoleIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          // Pause at the end of the word before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  return (
    <span className="inline-flex items-center">
      <span className="min-w-[2px] min-h-[1.5em]">
        {currentText || "\u00A0"}
      </span>
      <motion.span
        animate={{ opacity: [0, 1] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1.2em] bg-primary ml-1 rounded-full"
      />
    </span>
  );
}

export function HeroSection({ username }: { username?: string }) {
  const [profile, setProfile] = useState<HeroProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!username) return;
    portfolioService.getProfile(username)
      .then(data => {
        // Map data from API to our Hero component needs, providing clean fallbacks
        setProfile({
          name: data.name || data.fullName || "Portfolio Owner",
          roles: data.roles || ["Software Engineer", "Full Stack Developer", "Tech Enthusiast"],
          resumeLink: data.resumeLink || data.resumeUrl || "#",
          backgroundImageUrl: data.backgroundImageUrl,
          bio: data.bio || "Building robust applications and seamless web experiences.",
          githubUrl: data.githubUrl,
          linkedinUrl: data.linkedinUrl
        });
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message || "Failed to load profile data.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-xl font-medium tracking-widest text-primary uppercase"
        >
          Loading...
        </motion.div>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <h2 className="text-2xl font-bold text-destructive">Unable to fetch profile</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Retry Connection</Button>
      </section>
    );
  }

  // Framer motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      
      {/* Animated Subtle Background layer */}
      {profile.backgroundImageUrl && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20 dark:opacity-10"
          style={{ backgroundImage: `url(${profile.backgroundImageUrl})` }}
        />
      )}
      <div className="absolute inset-0 z-0 bg-background/80 backdrop-blur-sm" />

        <motion.div 
          className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center pt-[15vh] md:pt-[20vh]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-lg md:text-xl font-medium text-primary mb-4 tracking-wide">
            Hello, I’m
          </motion.p>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              {profile.name}
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="text-2xl md:text-4xl font-semibold text-muted-foreground mb-8">
            I'm a <TypingText roles={profile.roles} />
          </motion.div>

          {profile.bio && (
            <motion.p variants={itemVariants} className="max-w-xl text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
              {profile.bio}
            </motion.p>
          )}

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 mt-4 mb-16">
            <Button size="lg" className="h-12 px-8 rounded-full bg-white text-slate-950 hover:bg-slate-200 hover:-translate-y-0.5 transition-all duration-300 shadow-none font-semibold" asChild>
              <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
            <Button variant="secondary" size="lg" className="h-12 px-8 rounded-full bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white hover:-translate-y-0.5 transition-all duration-300 shadow-none font-semibold" asChild>
              <a href="#experience">
                View Work
              </a>
            </Button>
          </motion.div>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-slate-400 hover:text-cyan-400 transition-colors flex flex-col items-center gap-2 cursor-pointer"
              >
                <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
                <ArrowDown className="h-6 w-6 opacity-70" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}