import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { portfolioService } from "@/services/portfolioService";
import { useApi } from "@/hooks/useApi";
import { useAdmin } from "@/components/admin/AdminContext";

export function ProjectsForm() {
  const { username } = useAdmin();
  const { data, isLoading, error, execute } = useApi(portfolioService.getProjects);
  const [projects, setProjects] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    if (username) {
      execute(username);
    }
  }, [username]);

  useEffect(() => {
    if (data) {
      // Sort locally by display order
      const sorted = [...data].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      setProjects(sorted);
    }
  }, [data]);

  const handleEdit = (item: any) => {
    setEditingItem({
      ...item,
      techStack: item.techStack ? item.techStack.join(", ") : "",
      keyHighlights: item.keyHighlights ? item.keyHighlights.join("\n") : ""
    });
    setSaveMessage(null);
  };

  const handleAddNew = () => {
    setEditingItem({
      title: "",
      shortDescription: "",
      detailedDescription: "",
      techStack: "",
      githubUrl: "",
      liveDemoUrl: "",
      imageUrl: "",
      projectType: "",
      startDate: "",
      endDate: "",
      featured: false,
      displayOrder: projects.length + 1,
      status: "Completed",
      architectureNotes: "",
      keyHighlights: ""
    });
    setSaveMessage(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setSaveMessage(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setEditingItem({ ...editingItem, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setEditingItem({ ...editingItem, [name]: value });
    }
  };

  const handleDelete = async (id: string) => {
    if (!username) return;
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    setIsSaving(true);
    setSaveMessage(null);
    try {
      await portfolioService.deleteProject(username, id);
      setSaveMessage({ type: 'success', text: 'Project deleted successfully!' });
      execute(username);
    } catch (err: any) {
      setSaveMessage({ type: 'error', text: err.message || 'Failed to delete project' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    
    setIsSaving(true);
    setSaveMessage(null);
    
    try {
      // Format arrays back into proper lists before sending to API
      const payload = {
        ...editingItem,
        techStack: editingItem.techStack ? editingItem.techStack.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
        keyHighlights: editingItem.keyHighlights ? editingItem.keyHighlights.split("\n").map((s: string) => s.trim()).filter(Boolean) : [],
        startDate: editingItem.startDate || null,
        endDate: editingItem.endDate || null
      };

      if (editingItem.id) {
        await portfolioService.updateProject(username, editingItem.id, payload);
        setSaveMessage({ type: 'success', text: 'Project updated successfully!' });
      } else {
        await portfolioService.saveProject(username, payload);
        setSaveMessage({ type: 'success', text: 'Project added successfully!' });
      }
      
      setEditingItem(null);
      execute(username);
    } catch (err: any) {
      setSaveMessage({ type: 'error', text: err.message || 'Failed to save project' });
    } finally {
      setIsSaving(false);
    }
  };

  if (!username) {
    return <div className="p-6 text-center text-muted-foreground">Please select or create a profile first.</div>;
  }

  return (
    <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Manage Projects</h2>
        {isLoading && <span className="text-sm text-muted-foreground animate-pulse">Loading data...</span>}
      </div>

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

      {!editingItem ? (
        <div className="space-y-6">
          <Button onClick={handleAddNew} className="w-full">Add New Project</Button>
          
          {projects.length === 0 && !isLoading ? (
            <p className="text-center text-muted-foreground py-8 border border-dashed rounded-lg">No projects added yet.</p>
          ) : (
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg bg-background gap-4">
                  <div>
                    <h3 className="font-bold">{proj.title} {proj.featured && <span className="text-xs bg-cyan-500/20 text-cyan-500 px-2 py-0.5 rounded ml-2">Featured</span>}</h3>
                    <p className="text-sm text-muted-foreground">{proj.shortDescription}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(proj)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(proj.id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-lg font-bold">{editingItem.id ? "Edit Project" : "Add New Project"}</h3>
            <Button type="button" variant="ghost" size="sm" onClick={handleCancel}>Cancel</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-sm font-medium">Project Title *</label><input type="text" name="title" value={editingItem.title} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Project Type</label><input type="text" name="projectType" placeholder="e.g. Backend Architecture" value={editingItem.projectType} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
          </div>

          <div className="space-y-2"><label className="text-sm font-medium">Short Description *</label><input type="text" name="shortDescription" value={editingItem.shortDescription} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" required /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Detailed Description</label><textarea name="detailedDescription" value={editingItem.detailedDescription} onChange={handleChange} rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Tech Stack (comma-separated)</label><input type="text" name="techStack" placeholder="Java, Spring Boot, React" value={editingItem.techStack} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-sm font-medium">GitHub URL</label><input type="url" name="githubUrl" value={editingItem.githubUrl} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Live Demo URL</label><input type="url" name="liveDemoUrl" value={editingItem.liveDemoUrl} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
          </div>

          <div className="space-y-2"><label className="text-sm font-medium">Image URL</label><input type="url" name="imageUrl" value={editingItem.imageUrl} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-sm font-medium">Start Date</label><input type="date" name="startDate" value={editingItem.startDate} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">End Date</label><input type="date" name="endDate" value={editingItem.endDate} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
          </div>

          <div className="space-y-2"><label className="text-sm font-medium">Architecture Notes</label><textarea name="architectureNotes" value={editingItem.architectureNotes} onChange={handleChange} rows={2} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Key Highlights (one per line)</label><textarea name="keyHighlights" value={editingItem.keyHighlights} onChange={handleChange} rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <select name="status" value={editingItem.status} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="Completed">Completed</option><option value="In Progress">In Progress</option><option value="Planned">Planned</option>
              </select>
            </div>
            <div className="space-y-2"><label className="text-sm font-medium">Display Order</label><input type="number" name="displayOrder" value={editingItem.displayOrder} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
            <div className="space-y-2 flex items-center pt-8">
              <label className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="featured" checked={editingItem.featured} onChange={handleChange} className="h-4 w-4 rounded border-gray-300" /> Featured Project
              </label>
            </div>
          </div>

          <Button type="submit" disabled={isSaving} className="w-full">{isSaving ? "Saving..." : "Save Project"}</Button>
        </form>
      )}
    </div>
  );
}