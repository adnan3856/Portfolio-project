import { useState } from "react";
import { Navbar } from "@/Navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import { ProfileForm } from "@/components/admin/ProfileForm";
import { AboutForm, SkillsForm, ExperienceForm, AchievementsForm, ContactForm } from "@/components/admin/FormTemplates";

export function Admin() {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderForm = () => {
    switch (activeTab) {
      case "Profile": return <ProfileForm />;
      case "About": return <AboutForm />;
      case "Skills": return <SkillsForm />;
      case "Experience": return <ExperienceForm />;
      case "Achievements": return <AchievementsForm />;
      case "Contact": return <ContactForm />;
      default: return <ProfileForm />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Dashboard</h1>
            {renderForm()}
          </div>
        </main>
      </div>
    </div>
  );
}
