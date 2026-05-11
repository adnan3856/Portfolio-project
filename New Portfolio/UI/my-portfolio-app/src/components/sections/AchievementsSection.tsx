import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl?: string;
  link?: string;
  category?: string;
}

interface AchievementsProps {
  achievements: Achievement[];
}

// Reusable Compact Achievement Row
function AchievementRow({ achievement, isExpanded, onToggle }: { achievement: Achievement; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <div 
        className="flex items-center gap-4 p-4 md:p-5 cursor-pointer hover:bg-white/[0.03] transition-colors"
        onClick={onToggle}
      >
        {achievement.imageUrl ? (
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shrink-0">
            <img src={achievement.imageUrl} alt={achievement.title} className="max-h-full object-contain drop-shadow-sm" />
          </div>
        ) : (
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-foreground truncate">{achievement.title}</h3>
          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mt-0.5">
            <span className="truncate">{achievement.issuer}</span>
            {achievement.date && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                <span className="shrink-0">{achievement.date}</span>
              </>
            )}
          </div>
        </div>

        <button 
          className="shrink-0 ml-4 text-xs md:text-sm font-semibold text-cyan-400 flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          aria-expanded={isExpanded}
        >
          <span className="hidden sm:inline">{isExpanded ? "Close" : "Details"}</span>
          <motion.svg 
            animate={{ rotate: isExpanded ? 180 : 0 }} 
            transition={{ duration: 0.3, ease: "easeInOut" }}
            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </motion.svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 md:p-5 pt-0 md:pt-0 pl-16 md:pl-20 text-slate-300 text-sm leading-relaxed border-t border-white/5">
              <div className="pt-4 space-y-4">
                <p>{achievement.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                  {achievement.category ? (
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md">
                      {achievement.category}
                    </span>
                  ) : <div />}
                  
                  {achievement.link && (
                    <a 
                      href={achievement.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/link" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      Verify Credential
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AchievementsSection({ achievements }: AchievementsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-8 md:py-12 relative z-10">
      <div className="space-y-3 text-center md:text-left mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Achievements & Awards
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto md:mx-0 mt-4" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl shadow-sm overflow-hidden"
      >
        {achievements.map((ach) => (
          <AchievementRow 
            key={ach.id} 
            achievement={ach} 
            isExpanded={expandedId === ach.id}
            onToggle={() => setExpandedId(expandedId === ach.id ? null : ach.id)}
          />
        ))}
      </motion.div>
    </section>
  );
}