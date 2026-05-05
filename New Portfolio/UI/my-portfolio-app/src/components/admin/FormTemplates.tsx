export function AboutForm() {
  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Edit About</h2>
      <p className="text-muted-foreground">About form template. Implement using `useApi` and `portfolioService.getAbout`.</p>
    </div>
  );
}

export function SkillsForm() {
  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Manage Skills</h2>
      <p className="text-muted-foreground">Skills form template. Include options to POST new skills and DELETE existing ones.</p>
    </div>
  );
}

export function ExperienceForm() {
  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Manage Experience</h2>
      <p className="text-muted-foreground">Experience form template. Iterate through the array of jobs to edit.</p>
    </div>
  );
}

export function AchievementsForm() {
  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Manage Achievements</h2>
      <p className="text-muted-foreground">Achievements form template.</p>
    </div>
  );
}

export function ContactForm() {
  return (
    <div className="border rounded-lg p-6 bg-card shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Contact & Socials</h2>
      <p className="text-muted-foreground">Contact form template. Map over the social links dictionary here.</p>
    </div>
  );
}
