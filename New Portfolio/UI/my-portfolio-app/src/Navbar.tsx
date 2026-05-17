import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

interface NavbarProps {
  userName?: string;
}

export function Navbar({ userName = "Adnan Anjum" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll logic for Navbar background and active links
  useEffect(() => {
    const handleScroll = () => {
      // Trigger when user scrolls past ~30% of the viewport height (Hero section out of view)
      setScrolled(window.scrollY > window.innerHeight * 0.3);

      // Detect active section
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      let current = "";
      
      // If we are at the very top, clear active section to highlight the logo/home
      if (window.scrollY < 100) {
        setActiveSection("");
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 300) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Fire once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-xl border-b shadow-sm dark:shadow-primary/5" 
          : "bg-transparent border-transparent"
      }`}
    >
      <nav 
        className={`relative flex items-center justify-between w-full max-w-7xl mx-auto px-6 transition-all duration-500 ${
          scrolled ? "py-3 md:py-4" : "py-5 md:py-6"
        }`}
      >
        {/* Left Column: Branding (Hidden initially, appears on scroll) */}
        <div className="flex-1 flex justify-start">
          <AnimatePresence>
            {scrolled && (
              <motion.a 
                key="branding"
                href="#hero" 
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground hover:text-cyan-500 transition-colors whitespace-nowrap drop-shadow-sm"
              >
                {userName}
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex flex-none items-center justify-center gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full hover:text-cyan-400 ${
                  isActive ? "text-cyan-500 dark:text-cyan-400" : "text-muted-foreground"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-400/10 rounded-full -z-10 border border-cyan-500/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex-1 flex items-center justify-end gap-3 md:gap-4">
          <div className="hidden md:block">
            <ModeToggle />
          </div>
          <a href="/admin" className="hidden md:inline-flex text-sm font-bold text-muted-foreground hover:text-cyan-500 transition-colors">
            Admin
          </a>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center justify-center h-10 px-6 rounded-full bg-foreground text-background text-sm font-bold tracking-wide hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-0.5"
          >
            Hire Me
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground bg-secondary/50 rounded-full hover:bg-secondary transition-colors"
          >
            <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}>
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 w-full p-6 bg-card/95 backdrop-blur-2xl border-b border-primary/10 shadow-xl flex flex-col gap-4 lg:hidden overflow-hidden rounded-b-3xl"
            >
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
              
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center p-4 rounded-2xl text-lg font-bold transition-all duration-300 ${
                      isActive 
                        ? "bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20" 
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              
              <div className="h-px w-full bg-border/50 my-2" />
              
              <div className="flex items-center justify-between px-4 pb-2">
                <span className="text-sm font-semibold text-muted-foreground">Theme</span>
                <ModeToggle />
              </div>

              <a
                href="/admin"
                className="flex items-center justify-center w-full h-12 rounded-2xl bg-secondary text-secondary-foreground text-base font-bold transition-all active:scale-95"
              >
                Admin Dashboard
              </a>

              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full h-14 rounded-2xl bg-cyan-600 text-white text-lg font-bold tracking-wide hover:bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-95"
              >
                Let's Talk
              </a>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </motion.header>
  );
}