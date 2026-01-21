import { useQuery } from '@tanstack/react-query';
import { fetchBlogById } from '@/api/blogs';
import { Badge } from '@/components/ui/badge';

interface BlogDetailProps {
  blogId: string | null;
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => fetchBlogById(blogId!),
    enabled: !!blogId,
  });

  if (!blogId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-lg">
        Select a blog to view details
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-12">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center h-full text-red-500">Error loading blog</div>;
  }

  if (!blog) return null;

  return (
    <div className="h-full overflow-y-auto">
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-96 object-cover"
      />
      <div className="max-w-5xl mx-auto p-8 md:p-12 bg-white">
        <div className="flex items-center gap-4 text-sm mb-6">
          <Badge>{blog.category}</Badge>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500">{new Date(blog.date).toLocaleDateString()}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight text-left">
          {blog.title}
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed text-left">
          {blog.description}
        </p>

        <div className="space-y-6 text-left">
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}