import { useQuery } from '@tanstack/react-query';
import { fetchBlogs } from '@/api/blogs';
import type { Blog } from '@/types/blog';

interface BlogListProps {
  onSelectBlog: (id: string) => void;
  selectedBlogId: string | null;
}

export function BlogList({ onSelectBlog, selectedBlogId }: BlogListProps) {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  if (isLoading) {
    return <div className="p-4 text-gray-500">Loading blogs...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading blogs</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold p-4 border-b bg-white sticky top-0">Latest Articles</h2>
      <div className="flex-1 overflow-y-auto">
        {blogs?.map((blog: Blog) => (
          <div
            key={blog.id}
            onClick={() => onSelectBlog(blog.id)}
            className={`p-4 cursor-pointer border-b hover:bg-gray-50 transition ${
              selectedBlogId === blog.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
            }`}
          >
            <div className="text-xs text-blue-600 font-medium uppercase mb-1">{blog.category}</div>
            <h3 className="font-semibold text-gray-900 mb-2 text-left">{blog.title}</h3>
            <p className="text-sm text-gray-600 mb-2 text-left overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {blog.description}
            </p>
            <div className="text-xs text-gray-400 text-left">
              {new Date(blog.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}