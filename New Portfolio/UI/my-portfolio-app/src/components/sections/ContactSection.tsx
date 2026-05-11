import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ContactProps {
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: Record<string, string>;
  username?: string;
}

export function ContactSection({ email, phone, location, socialLinks, username }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for the Message Inbox (Hook up apiClient.post('/contact/${username}/message', formData) here)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  // SVGs for different platforms to avoid missing exports
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github": return <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />;
      case "linkedin": return <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></>;
      case "facebook": return <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />;
      case "instagram": return <><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>;
      default: return <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />; // Generic Link
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="contact" className="py-8 md:py-12">
      <div className="space-y-3 text-center md:text-left mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Get In Touch
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto md:mx-0 mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        {/* Left Column: Contact Details */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-5 space-y-10"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              Available for new opportunities
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Let's work together!
            </h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              Whether you have a specific project idea, need a technical consultation, or just want to say hi, my inbox is always open.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            {[
              { id: 'email', icon: <><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><rect width="20" height="16" x="2" y="4" rx="2"/></>, value: email, label: "Email" },
              { id: 'phone', icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>, value: phone, label: "Phone" },
              { id: 'location', icon: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>, value: location, label: "Location" }
            ].filter(item => item.value).map((item) => (
              <div key={item.id} className="group flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 text-cyan-400 border border-white/10 shrink-0 group-hover:bg-cyan-500/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-slate-400">{item.label}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-foreground break-all">{item.value}</p>
                    {item.id !== 'location' && (
                      <button onClick={() => handleCopy(item.value as string, item.id)} className="text-slate-400 hover:text-cyan-400 transition-colors" title="Copy to clipboard">
                        {copiedField === item.id ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-in zoom-in"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {socialLinks && Object.values(socialLinks).some(Boolean) && (
            <motion.div variants={itemVariants} className="pt-4 space-y-4">
              <p className="text-sm font-medium text-slate-400">Follow my journey</p>
              <div className="flex flex-wrap gap-4">
                {Object.entries(socialLinks).filter(([_, url]) => url).map(([platform, url]) => (
                  <a 
                    key={platform} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="relative group p-3 rounded-full bg-white/5 text-slate-400 hover:text-cyan-400 border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {getSocialIcon(platform)}
                    </svg>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-semibold bg-popover text-popover-foreground px-2 py-1 rounded shadow-md capitalize pointer-events-none whitespace-nowrap">
                      {platform}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-7 bg-white/5 backdrop-blur border border-white/10 p-6 md:p-10 rounded-2xl shadow-xl relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 relative group">
                <label htmlFor="name" className="text-sm font-semibold text-foreground px-1">Full Name</label>
                <input 
                  id="name" required type="text" placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm transition-all focus:ring-2 focus:ring-cyan-500/50 outline-none text-white"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2 relative group">
                <label htmlFor="email" className="text-sm font-semibold text-foreground px-1">Email Address</label>
                <input 
                  id="email" required type="email" placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm transition-all focus:ring-2 focus:ring-cyan-500/50 outline-none text-white"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2 relative group">
              <label htmlFor="subject" className="text-sm font-semibold text-foreground px-1">Subject</label>
              <input 
                id="subject" required type="text" placeholder="How can I help you?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm transition-all focus:ring-2 focus:ring-cyan-500/50 outline-none text-white"
                value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            <div className="space-y-2 relative group">
              <label htmlFor="message" className="text-sm font-semibold text-foreground px-1">Message</label>
              <textarea 
                id="message" required rows={5} placeholder="Write your message here..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm transition-all focus:ring-2 focus:ring-cyan-500/50 outline-none text-white resize-none"
                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting || isSuccess}
              className={`w-full h-14 rounded-xl text-base font-bold shadow-lg transition-all duration-300 ${isSuccess ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Sending...
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Message Sent
                  </motion.div>
                ) : (
                  <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    Send Message
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
