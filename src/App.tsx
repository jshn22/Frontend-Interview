import { useState } from 'react';
import { BlogList } from '@/components/BlogList';
import { BlogDetail } from '@/components/BlogDetail';
import { CreateBlog } from '@/components/CreateBlog';
import './App.css';
import { Button } from '@/components/ui/button';

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b shadow-sm flex-shrink-0">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CM</span>
            </div>
            <span className="text-xl font-bold text-gray-900">CA MONK Blog</span>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            + Create Blog
          </Button>
        </div>
      </header>

      {/* Main Content - Full Screen Layout */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Sidebar - Latest Articles */}
        <aside className="w-96 bg-white border-r flex-shrink-0 overflow-y-auto">
          <BlogList onSelectBlog={setSelectedBlogId} selectedBlogId={selectedBlogId} />
        </aside>

        {/* Main Content Area - Full Width */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <BlogDetail blogId={selectedBlogId} />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 flex-shrink-0">
        <div className="px-8">
          <div className="grid grid-cols-4 gap-8 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">CM</span>
                </div>
                <span className="font-bold">CA MONK</span>
              </div>
              <p className="text-sm text-gray-400">
                Your trusted source for finance, accounting, and career insights.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-sm">Quick Links</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-sm">Categories</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Technology</a></li>
                <li><a href="#" className="hover:text-white">Programming</a></li>
                <li><a href="#" className="hover:text-white">Finance</a></li>
                <li><a href="#" className="hover:text-white">Career</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-sm">Follow Us</h3>
              <div className="flex gap-2">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4 text-center text-xs text-gray-400">
            <p>&copy; 2024 CA MONK. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showCreateForm && <CreateBlog onClose={() => setShowCreateForm(false)} />}
    </div>
  );
}

export default App;


