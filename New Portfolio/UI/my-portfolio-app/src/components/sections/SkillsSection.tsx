import { motion } from "framer-motion";

interface Skill {
  id: string;
  name: string;
  category?: string;
  percentage?: number;
  iconUrl?: string;
}

interface SkillsProps {
  skills: Skill[];
}

// Reusable SkillBar Component
function SkillBar({ skill }: { skill: Skill }) {
  // Fallback percentage to 0 if not provided to avoid NaN errors
  const percent = skill.percentage || 0;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="group relative bg-white/5 backdrop-blur border border-white/10 p-5 rounded-2xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-500"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {skill.iconUrl ? (
            <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8 object-contain drop-shadow-md" />
          ) : (
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold shadow-inner">
              {skill.name.charAt(0)}
            </div>
          )}
          <h3 className="text-lg font-semibold text-foreground tracking-tight">{skill.name}</h3>
        </div>
        <span className="text-sm font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">
          {percent}%
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative backdrop-blur-sm">
        {/* Animated Progress Fill */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
        />
      </div>
    </motion.div>
  );
}

export function SkillsSection({ skills }: SkillsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <section id="skills" className="py-8 md:py-12">
      <div className="space-y-3 text-center md:text-left mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Technical Skills
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto md:mx-0 mt-4" />
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {skills.map((skill) => (
          <SkillBar key={skill.id} skill={skill} />
        ))}
      </motion.div>
    </section>
  );
}