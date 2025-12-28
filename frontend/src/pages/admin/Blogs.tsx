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
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import DashboardLayout from '@/components/dashboard/dashboard-layout';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  cover_image: string | null;
  tags: string[];
  read_time: number;
  published_at: string;
  created_at: string;
}

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  tags: string;
  read_time: number;
}

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};

const initialFormData: BlogFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  tags: '',
  read_time: 5,
};

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState<BlogFormData>(initialFormData);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error: any) {
      console.error('Error fetching blogs:', error);
      toast.error('Error', {
        description: 'Failed to load blogs',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (blog?: Blog) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content || '',
        cover_image: blog.cover_image || '',
        tags: blog.tags.join(', '),
        read_time: blog.read_time,
      });
    } else {
      setEditingBlog(null);
      setFormData(initialFormData);
    }
    setDialogOpen(true);
  };

  const handleTitleChange = (newTitle: string) => {
    setFormData({ 
      ...formData, 
      title: newTitle,
      slug: editingBlog ? formData.slug : generateSlug(newTitle)
    });
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.excerpt.trim()) {
      toast.error('Error', {
        description: 'Title and excerpt are required',
      });
      return;
    }

    if (!formData.slug.trim()) {
      toast.error('Error', {
        description: 'Slug is required',
      });
      return;
    }

    setSaving(true);
    try {
      const blogData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim() || null,
        cover_image: formData.cover_image.trim() || null,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        read_time: formData.read_time,
      };

      if (editingBlog) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingBlog.id);

        if (error) throw error;
        toast.success('Blog updated successfully', {
          description: 'The blog post has been updated.',
        });
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);

        if (error) throw error;
        toast.success('Blog created successfully', {
          description: 'A new blog post has been created.',
        });
      }

      setDialogOpen(false);
      fetchBlogs();
    } catch (error: any) {
      console.error('Error saving blog:', error);
      toast.error('Error', {
        description: 'Failed to save blog',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Blog deleted successfully', {
        description: 'The blog post has been deleted.',
      });
      setBlogs(blogs.filter(b => b.id !== id));
    } catch (error: any) {
      console.error('Error deleting blog:', error);
      toast.error('Error', {
        description: 'Failed to delete blog',
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blogs</h1>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBlog ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
              <DialogDescription>
                {editingBlog ? 'Update the blog post details' : 'Create a new blog post'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Blog title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="blog-post-slug"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description"
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full blog content (markdown supported)"
                  rows={8}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cover_image">Cover Image URL</Label>
                  <Input
                    id="cover_image"
                    value={formData.cover_image}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="read_time">Read Time (min)</Label>
                  <Input
                    id="read_time"
                    type="number"
                    min={1}
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) || 5 })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="react, typescript, web development"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : editingBlog ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Read Time</TableHead>
              <TableHead>Published</TableHead>
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
            ) : blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No blogs yet. Create your first one!
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {blog.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{blog.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{blog.read_time} min</TableCell>
                  <TableCell>{format(new Date(blog.published_at), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(blog)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(blog.id)}
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

export default Blogs;
