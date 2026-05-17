import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription?: string;
  techStack?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  imageUrl?: string;
  projectType?: string;
  architectureNotes?: string;
  keyHighlights?: string[];
  startDate?: string;
  endDate?: string;
  featured?: boolean;
}

interface ProjectsProps {
  projects: Project[];
}

// Reusable Compact Project Row
function ProjectRow({ project, isExpanded, onToggle }: { project: Project; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <div 
        className="flex items-center gap-4 p-4 md:p-5 cursor-pointer hover:bg-white/[0.03] transition-colors"
        onClick={onToggle}
      >
        {/* Icon / Thumbnail */}
        {project.imageUrl ? (
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover rounded-md opacity-90" />
          </div>
        ) : (
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
          </div>
        )}
        
        {/* Header Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="text-base md:text-lg font-bold text-foreground truncate">{project.title}</h3>
            {project.projectType && (
              <span className="hidden sm:inline-block text-[0.65rem] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-400/20 shrink-0">
                {project.projectType}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 truncate mt-0.5">{project.shortDescription}</p>
        </div>

        {/* Toggle Button */}
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

      {/* Expandable Body */}
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
              
              {/* Tech Stack Tags */}
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[0.7rem] font-medium text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Detailed Description */}
              {project.detailedDescription && <p className="mb-4 text-slate-400">{project.detailedDescription}</p>}

              {/* Architecture Notes (If applicable) */}
              {project.architectureNotes && (
                <div className="mb-4 bg-black/20 p-3.5 rounded-lg border border-white/5">
                  <strong className="text-cyan-400 text-xs uppercase tracking-widest block mb-1.5 font-bold">Architecture & Design</strong>
                  <p className="text-slate-400 leading-relaxed text-sm">{project.architectureNotes}</p>
                </div>
              )}

              {/* Key Highlights */}
              {project.keyHighlights && project.keyHighlights.length > 0 && (
                <ul className="list-disc pl-5 mb-4 space-y-1.5 text-slate-400">
                  {project.keyHighlights.map((highlight, i) => (
                    <li key={i}><span className="text-slate-300">{highlight}</span></li>
                  ))}
                </ul>
              )}
              
              {/* Footer Links & Dates */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/link" onClick={(e) => e.stopPropagation()}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
                      Source Code
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/link" onClick={(e) => e.stopPropagation()}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      Live Demo
                    </a>
                  )}
                </div>
                
                {(project.startDate || project.endDate) && (
                  <div className="text-xs font-medium text-slate-500 bg-white/5 px-2.5 py-1 rounded-md">
                    {project.startDate || 'Unknown'} - {project.endDate || 'Present'}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProjectsSection({ projects }: ProjectsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-8 md:py-12 relative z-10">
      <div className="space-y-3 text-center md:text-left mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Engineering Projects
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
        {projects.map((proj) => (
          <ProjectRow 
            key={proj.id} 
            project={proj} 
            isExpanded={expandedId === proj.id}
            onToggle={() => setExpandedId(expandedId === proj.id ? null : proj.id)}
          />
        ))}
      </motion.div>
    </section>
  );
}