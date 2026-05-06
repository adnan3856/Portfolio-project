import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { portfolioService } from "@/services/portfolioService";
import { useApi } from "@/hooks/useApi";

export function ProfileForm() {
  const { data, isLoading, error, execute } = useApi(portfolioService.getProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [searchUsername, setSearchUsername] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    resumeUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    portfolioUrl: ""
  });

  useEffect(() => {
    if (data) {
      setFormData({
        username: data.username || "",
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        bio: data.bio || "",
        resumeUrl: data.resumeUrl || "",
        githubUrl: data.githubUrl || "",
        linkedinUrl: data.linkedinUrl || "",
        portfolioUrl: data.portfolioUrl || ""
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoad = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchUsername.trim()) {
      execute(searchUsername.trim());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);
    try {
      if (data && data.username) {
        // Update existing
        await portfolioService.updateProfile(formData.username, formData);
        setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        // Create new
        await portfolioService.createProfile(formData);
        setSaveMessage({ type: 'success', text: 'Profile created successfully!' });
      }
    } catch (err: any) {
      setSaveMessage({ type: 'error', text: err.message || 'Failed to save profile' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Edit Profile</h2>
        {isLoading && <span className="text-sm text-muted-foreground animate-pulse">Loading data...</span>}
      </div>

      <form onSubmit={handleLoad} className="flex gap-4 mb-8 pb-8 border-b">
        <input
          type="text"
          placeholder="Enter existing username to load..."
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        <Button type="submit" variant="secondary" disabled={isLoading}>Load Profile</Button>
      </form>
      
      {/* Show network/API errors as a banner instead of hiding the form */}
      {error && (
        <div className="p-4 mb-6 rounded-md text-sm font-medium bg-destructive/10 text-destructive">
          <p className="font-bold mb-1">Backend Connection Error:</p>
          <p>{error}</p>
        </div>
      )}

      {saveMessage && (
        <div className={`p-4 mb-6 rounded-md text-sm font-medium ${saveMessage.type === 'success' ? 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-400' : 'bg-destructive/10 text-destructive'}`}>
          {saveMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Resume URL</label>
            <input
              type="url"
              name="resumeUrl"
              value={formData.resumeUrl}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Portfolio URL</label>
            <input
              type="url"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">GitHub URL</label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">LinkedIn URL</label>
            <input
              type="url"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving Changes..." : "Save Profile"}
        </Button>
      </form>
    </div>
  );
}
