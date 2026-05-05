import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { portfolioService } from "@/services/portfolioService";
import { useApi } from "@/hooks/useApi";

export function ProfileForm({ username = "adnan" }: { username?: string }) {
  const { data, isLoading, error, execute } = useApi(portfolioService.getProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    bio: ""
  });

  useEffect(() => {
    execute(username);
  }, [username, execute]);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        headline: data.headline || "",
        bio: data.bio || ""
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);
    try {
      await portfolioService.updateProfile(username, formData);
      setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err: any) {
      setSaveMessage({ type: 'error', text: err.message || 'Failed to update profile' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <p className="text-muted-foreground animate-pulse">Loading profile data...</p>;
  if (error) return <p className="text-destructive font-medium">{error}</p>;

  return (
    <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
      <h2 className="text-2xl font-bold mb-6 tracking-tight">Edit Profile</h2>
      
      {saveMessage && (
        <div className={`p-4 mb-6 rounded-md text-sm font-medium ${saveMessage.type === 'success' ? 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-400' : 'bg-destructive/10 text-destructive'}`}>
          {saveMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Headline</label>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            required
          />
        </div>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving Changes..." : "Save Profile"}
        </Button>
      </form>
    </div>
  );
}
