import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, ExternalLink, Github } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/dashboard-layout';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  tech_stack: string;
  github_url: string;
  live_url: string;
  image_url: string;
  display_order: number;
}

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};

const initialFormData: ProjectFormData = {
  title: '',
  slug: '',
  description: '',
  tech_stack: '',
  github_url: '',
  live_url: '',
  image_url: '',
  display_order: 0,
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects', {
        description: 'Could not fetch projects from the server.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        slug: project.slug,
        description: project.description,
        tech_stack: project.tech_stack.join(', '),
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        image_url: project.image_url || '',
        display_order: project.display_order,
      });
    } else {
      setEditingProject(null);
      setFormData({
        ...initialFormData,
        display_order: projects.length,
      });
    }
    setDialogOpen(true);
  };

  const handleTitleChange = (newTitle: string) => {
    setFormData({ 
      ...formData, 
      title: newTitle,
      slug: editingProject ? formData.slug : generateSlug(newTitle)
    });
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Title and description are required', {
        description: 'Please provide both title and description.',
      });
      return;
    }

    if (!formData.slug.trim()) {
      toast.error('Slug is required', {
        description: 'Please provide a slug for the project.',
      });
      return;
    }

    setSaving(true);
    try {
      const projectData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim(),
        tech_stack: formData.tech_stack.split(',').map(t => t.trim()).filter(Boolean),
        github_url: formData.github_url.trim() || null,
        live_url: formData.live_url.trim() || null,
        image_url: formData.image_url.trim() || null,
        display_order: formData.display_order,
      };

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        toast.success('Project updated successfully', {
          description: 'The project has been updated.',
        });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);

        if (error) throw error;
        toast.success('Project created successfully', {
          description: 'A new project has been added.',
        });
      }

      setDialogOpen(false);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project', {
        description: 'Could not save the project. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Project deleted successfully', {
        description: 'The project has been deleted.',
      });
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project', {
        description: 'Could not delete the project. Please try again.',
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
              <DialogDescription>
                {editingProject ? 'Update the project details' : 'Add a new portfolio project'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Project title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="project-slug"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Project description"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tech_stack">Tech Stack (comma-separated)</Label>
                <Input
                  id="tech_stack"
                  value={formData.tech_stack}
                  onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                  placeholder="React, TypeScript, Tailwind CSS"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="live_url">Live URL</Label>
                  <Input
                    id="live_url"
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    min={0}
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : editingProject ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Tech Stack</TableHead>
              <TableHead>Links</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No projects yet. Add your first one!
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.display_order}</TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.tech_stack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech_stack.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tech_stack.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(project)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
