import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { portfolioService } from "@/services/portfolioService";
import { useApi } from "@/hooks/useApi";
import { useAdmin } from "@/components/admin/AdminContext";

// ---------------------------------------------------------
// ABOUT FORM
// ---------------------------------------------------------
export function AboutForm() {
  const { username } = useAdmin();
  const { data, isLoading, error, execute } = useApi(portfolioService.getAbout);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [formData, setFormData] = useState({ name: "", title: "", workEmail: "", workPhone: "", profileImage: "", description: "" });

  useEffect(() => {
    if (username) execute(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "", title: data.title || "", workEmail: data.workEmail || "",
        workPhone: data.workPhone || "", profileImage: data.profileImage || "",
        description: data.description ? data.description.join("\n") : ""
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setSaveMessage(null);
    setIsSaving(true);
    try {
      const payload = { ...formData, description: formData.description.split("\n").filter((l: string) => l.trim() !== "") };
      await portfolioService.saveAbout(username, payload);
      setSaveMessage({ type: 'success', text: "About section saved successfully!" });
      setTimeout(() => setSaveMessage(null), 3000); // Clear toast after 3s
    } catch (err: any) { 
      setSaveMessage({ type: 'error', text: err.message });
    } finally { setIsSaving(false); }
  };

  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Edit About</h2>
        {isLoading && <span className="text-sm text-muted-foreground animate-pulse">Loading data...</span>}
      </div>
      
      {error && <div className="text-destructive text-sm font-bold">{error}</div>}
      {saveMessage && (
        <div className={`p-4 mb-6 rounded-md text-sm font-medium transition-all ${saveMessage.type === 'success' ? 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-400' : 'bg-destructive/10 text-destructive'}`}>
          {saveMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium">Name</label><input required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Title</label><input required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Work Email</label><input type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.workEmail} onChange={e => setFormData({...formData, workEmail: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Work Phone</label><input type="tel" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.workPhone} onChange={e => setFormData({...formData, workPhone: e.target.value})} /></div>
          <div className="space-y-2 col-span-2"><label className="text-sm font-medium">Profile Image URL</label><input type="url" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.profileImage} onChange={e => setFormData({...formData, profileImage: e.target.value})} /></div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description (Line separated paragraphs)</label>
          <textarea
            className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>
        <Button type="submit" disabled={!username || isSaving}>{isSaving ? "Saving..." : "Save About"}</Button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------
// SKILLS FORM
// ---------------------------------------------------------
export function SkillsForm() {
  const { username } = useAdmin();
  const { data: skills, isLoading, error, execute } = useApi(portfolioService.getSkills);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [formData, setFormData] = useState({ name: "", category: "", percentage: 0, proficiency: "", iconUrl: "", priority: 10 });

  useEffect(() => {
    if (username) execute(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setSaveMessage(null);
    setIsSaving(true);
    try {
      await portfolioService.saveSkill(username, formData);
      execute(username); // Refresh list
      setFormData({ name: "", category: "", percentage: 0, proficiency: "", iconUrl: "", priority: 10 }); // Reset form
      setSaveMessage({ type: 'success', text: "Skill added successfully!" });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) { 
      setSaveMessage({ type: 'error', text: err.message });
    } finally { setIsSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try { await portfolioService.deleteSkill(id); execute(username); } 
    catch (err: any) { setSaveMessage({ type: 'error', text: err.message }); }
  };

  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Manage Skills</h2>
        {isLoading && <span className="text-sm text-muted-foreground animate-pulse">Loading data...</span>}
      </div>
      {error && <div className="text-destructive text-sm font-bold">{error}</div>}
      {saveMessage && (
        <div className={`p-4 mb-6 rounded-md text-sm font-medium transition-all ${saveMessage.type === 'success' ? 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-400' : 'bg-destructive/10 text-destructive'}`}>
          {saveMessage.text}
        </div>
      )}

      {/* Existing Skills List */}
      {skills && Array.isArray(skills) && skills.length > 0 && (
        <div className="grid gap-3 mb-8">
          {skills.map((s: any) => (
            <div key={s.id} className="flex justify-between items-center p-3 border rounded-md">
              <div><p className="font-bold">{s.name} <span className="text-sm text-muted-foreground font-normal">({s.category})</span></p></div>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(s.id)}>Delete</Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Skill Form */}
      <h3 className="text-lg font-bold border-t pt-6">Add New Skill</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium">Skill Name</label><input required className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Category</label><input className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Proficiency</label><input placeholder="e.g. Expert" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.proficiency} onChange={e => setFormData({...formData, proficiency: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Percentage (0-100)</label><input type="number" min="0" max="100" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.percentage} onChange={e => setFormData({...formData, percentage: parseInt(e.target.value) || 0})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Icon URL</label><input type="url" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.iconUrl} onChange={e => setFormData({...formData, iconUrl: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">UI Priority (Sort Order)</label><input required type="number" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.priority} onChange={e => setFormData({...formData, priority: parseInt(e.target.value) || 0})} /></div>
        </div>
        <Button type="submit" disabled={!username || isSaving}>{isSaving ? "Saving..." : "Add Skill"}</Button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------
// EXPERIENCE FORM
// ---------------------------------------------------------
export function ExperienceForm() {
  const { username } = useAdmin();
  const { data: experiences, isLoading, error, execute } = useApi(portfolioService.getExperience);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    role: "", companyName: "", companyUrl: "", location: "", category: "",
    technologies: "", startDate: "", endDate: "", description: "", imageUrl: ""
  });

  useEffect(() => {
    if (username) execute(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setSaveMessage(null);
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        technologies: formData.technologies.split(",").map((t:string) => t.trim()).filter((t:string) => t !== ""),
        description: formData.description.split("\n").filter((l:string) => l.trim() !== ""),
        startDate: formData.startDate || null,
        endDate: formData.endDate || null // Allow ongoing jobs
      };
      await portfolioService.saveExperience(username, payload);
      execute(username);
      setFormData({ role: "", companyName: "", companyUrl: "", location: "", category: "", technologies: "", startDate: "", endDate: "", description: "", imageUrl: "" });
      setSaveMessage({ type: 'success', text: "Experience added successfully!" });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) { 
      setSaveMessage({ type: 'error', text: err.message });
    } finally { setIsSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try { await portfolioService.deleteExperience(id); execute(username); } catch (err: any) { setSaveMessage({ type: 'error', text: err.message }); }
  };

  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Manage Experience</h2>
        {isLoading && <span className="text-sm text-muted-foreground animate-pulse">Loading data...</span>}
      </div>
      {error && <div className="text-destructive text-sm font-bold">{error}</div>}
      {saveMessage && (
        <div className={`p-4 mb-6 rounded-md text-sm font-medium transition-all ${saveMessage.type === 'success' ? 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-400' : 'bg-destructive/10 text-destructive'}`}>
          {saveMessage.text}
        </div>
      )}

      {/* Existing Experience List */}
      {experiences && Array.isArray(experiences) && experiences.length > 0 && (
        <div className="grid gap-3 mb-8">
          {experiences.map((exp: any) => (
            <div key={exp.id} className="flex justify-between items-center p-3 border rounded-md">
              <div><p className="font-bold">{exp.role} <span className="text-sm font-normal">at {exp.companyName}</span></p></div>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(exp.id)}>Delete</Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Experience Form */}
      <h3 className="text-lg font-bold border-t pt-6">Add New Experience</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium">Role / Job Title</label><input required className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Company Name</label><input required className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Start Date</label><input required type="date" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">End Date (Leave blank if present)</label><input type="date" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Location</label><input className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Category</label><input className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} /></div>
          <div className="space-y-2 col-span-2"><label className="text-sm font-medium">Image URL</label><input type="url" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} /></div>
          <div className="space-y-2 col-span-2"><label className="text-sm font-medium">Technologies (Comma separated)</label><input className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="React, Java, Spring Boot" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} /></div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description (Line separated bullets)</label>
          <textarea className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>
        <Button type="submit" disabled={!username || isSaving}>{isSaving ? "Saving..." : "Add Experience"}</Button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------
// ACHIEVEMENTS FORM
// ---------------------------------------------------------
export function AchievementsForm() {
  const { username } = useAdmin();
  const { data: achievements, isLoading, error, execute } = useApi(portfolioService.getAchievements);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [formData, setFormData] = useState({ title: "", issuer: "", description: "", date: "", imageUrl: "", link: "" });

  useEffect(() => {
    if (username) execute(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setSaveMessage(null);
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        date: formData.date || null
      };
      await portfolioService.saveAchievement(username, payload);
      execute(username);
      setFormData({ title: "", issuer: "", description: "", date: "", imageUrl: "", link: "" });
      setSaveMessage({ type: 'success', text: "Achievement added successfully!" });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) { 
      setSaveMessage({ type: 'error', text: err.message });
    } finally { setIsSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try { await portfolioService.deleteAchievement(id); execute(username); } catch (err: any) { setSaveMessage({ type: 'error', text: err.message }); }
  };

  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Manage Achievements</h2>
        {isLoading && <span className="text-sm text-muted-foreground animate-pulse">Loading data...</span>}
      </div>
      {error && <div className="text-destructive text-sm font-bold">{error}</div>}
      {saveMessage && (
        <div className={`p-4 mb-6 rounded-md text-sm font-medium transition-all ${saveMessage.type === 'success' ? 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-400' : 'bg-destructive/10 text-destructive'}`}>
          {saveMessage.text}
        </div>
      )}

      {/* Existing Achievements List */}
      {achievements && Array.isArray(achievements) && achievements.length > 0 && (
        <div className="grid gap-3 mb-8">
          {achievements.map((ach: any) => (
            <div key={ach.id} className="flex justify-between items-center p-3 border rounded-md">
              <div><p className="font-bold">{ach.title}</p></div>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(ach.id)}>Delete</Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Form */}
      <h3 className="text-lg font-bold border-t pt-6">Add New Achievement</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium">Title</label><input required className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Issuer</label><input className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Date</label><input type="date" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Reference Link</label><input type="url" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} /></div>
          <div className="space-y-2 col-span-2"><label className="text-sm font-medium">Image URL</label><input type="url" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} /></div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea className="flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>
        <Button type="submit" disabled={!username || isSaving}>{isSaving ? "Saving..." : "Add Achievement"}</Button>
      </form>
    </div>
  );
}

// ---------------------------------------------------------
// CONTACT FORM
// ---------------------------------------------------------
export function ContactForm() {
  const { username } = useAdmin();
  const { data, isLoading, error, execute } = useApi(portfolioService.getContact);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [formData, setFormData] = useState({ location: "", phone: "", email: "", linkedin: "", github: "", facebook: "", instagram: "" });

  useEffect(() => {
    if (username) execute(username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (data) {
      setFormData({
        location: data.location || "", phone: data.phone || "", email: data.email || "",
        linkedin: data.linkedin || "", github: data.github || "", facebook: data.facebook || "", instagram: data.instagram || ""
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setSaveMessage(null);
    setIsSaving(true);
    try {
      await portfolioService.saveContact(username, formData);
      setSaveMessage({ type: 'success', text: "Contact details saved successfully!" });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) { 
      setSaveMessage({ type: 'error', text: err.message });
    } finally { setIsSaving(false); }
  };

  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Contact & Socials</h2>
        {isLoading && <span className="text-sm text-muted-foreground animate-pulse">Loading data...</span>}
      </div>
      {error && <div className="text-destructive text-sm font-bold">{error}</div>}
      {saveMessage && (
        <div className={`p-4 mb-6 rounded-md text-sm font-medium transition-all ${saveMessage.type === 'success' ? 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-400' : 'bg-destructive/10 text-destructive'}`}>
          {saveMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium">Public Email</label><input type="email" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Public Phone</label><input type="tel" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
          <div className="space-y-2 col-span-2"><label className="text-sm font-medium">Location</label><input className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" placeholder="e.g. New York, NY" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">LinkedIn URL</label><input type="url" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">GitHub URL</label><input type="url" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Facebook URL</label><input type="url" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Instagram URL</label><input type="url" className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} /></div>
        </div>
        <Button type="submit" disabled={!username || isSaving}>{isSaving ? "Saving..." : "Save Contact"}</Button>
      </form>
    </div>
  );
}
