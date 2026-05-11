import { motion } from "framer-motion";

interface AboutProps {
  profileImage?: string;
  name?: string;
  title?: string;
  email?: string;
  workEmail?: string;
  phone?: string;
  workPhone?: string;
  description?: string[];
}

export function AboutSection({ profileImage, name, title, email, workEmail, phone, workPhone, description }: AboutProps) {
  // Safely fallback to either API field standard
  const displayEmail = email || workEmail;
  const displayPhone = phone || workPhone;

  // Framer motion variants for smooth scroll reveal

  return (
    <section id="about" className="py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center bg-white/5 backdrop-blur border border-white/10 p-8 md:p-12 rounded-2xl shadow-xl"
      >
        
        {/* Left Column - Image & Personal Details */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-8 relative">
          <div className="relative">
            {/* Floating Profile Image */}
            <div className="relative group w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt={name || "Profile"} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Experience / Professional Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 md:-right-8 bg-slate-900 border border-white/10 shadow-xl rounded-2xl p-3 flex items-center gap-3 z-10"
            >
              <div className="bg-cyan-500/20 p-2.5 rounded-xl text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <div className="text-sm font-bold leading-tight pr-2">
                <span className="block text-foreground">Dedicated</span>
                <span className="text-slate-400 text-xs font-medium">Professional</span>
              </div>
            </motion.div>
          </div>

          {/* Details Card */}
          <div className="w-full space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 text-center lg:text-left mt-4">
            {(name || title) && (
              <div className="border-b border-border pb-4 mb-4">
                {name && <h3 className="text-2xl font-bold tracking-tight text-foreground">{name}</h3>}
                {title && <p className="text-cyan-400 font-medium mt-1">{title}</p>}
              </div>
            )}
            
            {displayEmail && (
              <a href={`mailto:${displayEmail}`} className="flex items-center justify-center lg:justify-start gap-3 text-slate-400 hover:text-cyan-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span className="text-sm font-medium truncate">{displayEmail}</span>
              </a>
            )}
            
            {displayPhone && (
              <a href={`tel:${displayPhone}`} className="flex items-center justify-center lg:justify-start gap-3 text-slate-400 hover:text-cyan-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span className="text-sm font-medium">{displayPhone}</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column - Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              About Me
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto lg:mx-0 mt-4" />
          </div>
          
          <div className="space-y-5 text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {description && description.length > 0 ? (
              description.map((paragraph, index) => (
                <p key={index} className="text-justify lg:text-left">{paragraph}</p>
              ))
            ) : (
              <p>I am a software engineer with a passion for building scalable web applications. Currently exploring new technologies and best practices.</p>
            )}
          </div>
        </div>
        
      </motion.div>
    </section>
  );
}