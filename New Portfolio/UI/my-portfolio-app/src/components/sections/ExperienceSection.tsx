import { motion } from "framer-motion";

interface Experience {
  id: string;
  role: string;
  companyName: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  technologies?: string[];
  imageUrl?: string;
}

interface ExperienceProps {
  experiences: Experience[];
}

// Reusable Experience Card Component
function ExperienceCard({ exp }: { exp: Experience }) {
  const cardVariants = {
    hidden: { opacity: 0, x: -30, y: 20 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div variants={cardVariants} className="relative pl-8 md:pl-16 group">
      {/* Glowing Timeline Dot */}
      <div className="absolute left-[2px] md:left-[6px] top-10 md:top-12 w-3 h-3 bg-cyan-400 rounded-full z-10 group-hover:scale-125 transition-transform duration-300" />

      {/* Glassmorphic Card Body */}
      <div className="bg-white/5 backdrop-blur border border-white/10 p-6 md:p-8 rounded-2xl shadow-lg hover:-translate-y-0.5 hover:shadow-cyan-500/10 transition-all duration-500 relative overflow-hidden">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 relative z-10">
          <div className="flex items-center gap-4">
            {exp.imageUrl && (
              <div className="w-14 h-14 rounded-2xl bg-white/5 p-2 flex items-center justify-center border border-white/10 shrink-0">
                <img src={exp.imageUrl} alt={exp.companyName} className="w-full h-full object-contain" />
              </div>
            )}
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">{exp.role}</h3>
              <p className="text-lg font-medium text-slate-400 mt-1">
                {exp.companyName}
              </p>
            </div>
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 text-sm font-semibold text-cyan-400 shrink-0 h-fit">
            {exp.startDate} - {exp.endDate || "Present"}
          </div>
        </div>

        {/* Bullet Points */}
        <ul className="space-y-3 mb-6 relative z-10 text-slate-300 text-[0.95rem] md:text-base leading-relaxed">
          {exp.description.map((desc, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-cyan-500/50 shrink-0" />
              <span className="flex-1">{desc}</span>
            </li>
          ))}
        </ul>

        {/* Technologies List */}
        {exp.technologies && exp.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10 relative z-10">
            {exp.technologies.map((tech, i) => (
              <span key={i} className="bg-white/5 text-slate-300 border border-white/10 rounded-full px-3 py-1 text-xs font-semibold hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300 cursor-default">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function ExperienceSection({ experiences }: ExperienceProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <section id="experience" className="py-8 md:py-12">
      <div className="space-y-3 text-center md:text-left mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Professional Experience
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto md:mx-0 mt-4" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Main Timeline Line */}
        <div className="absolute left-[7px] md:left-[11px] top-10 md:top-12 bottom-10 w-[2px] bg-white/10" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-10 md:space-y-12"
        >
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}