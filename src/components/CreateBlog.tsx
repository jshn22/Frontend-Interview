import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog } from "@/api/blogs";
import type { CreateBlogInput } from '@/types/blog';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


interface CreateBlogProps {
  onClose: () => void;
}

export function CreateBlog({ onClose }: CreateBlogProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<CreateBlogInput>({
    title: '',
    category: '',
    description: '',
    content: '',
    coverImage: '',
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Create New Blog</h2>
          <Button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter blog title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="e.g., Technology, Programming, Tutorial"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Brief description of your blog post"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content <span className="text-red-500">*</span></Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={8}
              placeholder="Write your blog content here..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL <span className="text-red-500">*</span></Label>
            <Input
              id="coverImage"
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500">Enter a valid image URL for the cover</p>
          </div>

          {mutation.isError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              Failed to create blog. Please try again.
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              type="button"
              onClick={onClose}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Creating...' : 'Create Blog'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
