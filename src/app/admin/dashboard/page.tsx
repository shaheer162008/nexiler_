"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db, app } from "../../../../firebase/init";

interface Blog {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  date: string;
  status: "published" | "draft";
  category?: string;
  featuredImage?: string;
}

const Page = () => {
  const router = useRouter();
  const auth = getAuth(app);

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isFetchingBlogs, setIsFetchingBlogs] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Auth check - redirect if not authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        // User is not authenticated - redirect to login
        setIsAuthenticated(false);
        setIsLoading(false);
        router.push("/admin");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, router]);

  // Fetch blogs from Firestore
  useEffect(() => {
    if (!isAuthenticated) return;

    setIsFetchingBlogs(true);

    try {
      const blogsQuery = query(
        collection(db, "blogs"),
        orderBy("date", "desc")
      );

      const unsubscribe = onSnapshot(blogsQuery, (snapshot) => {
        const fetchedBlogs: Blog[] = [];

        snapshot.forEach((doc) => {
          fetchedBlogs.push({
            id: doc.id,
            title: doc.data().title || "",
            excerpt: doc.data().excerpt || "",
            content: doc.data().content || "",
            date: doc.data().date || new Date().toISOString().split("T")[0],
            status: doc.data().status || "draft",
            category: doc.data().category || "",
            featuredImage: doc.data().featuredImage || "",
          });
        });

        setBlogs(fetchedBlogs);
        setIsFetchingBlogs(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setIsFetchingBlogs(false);
    }
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      // Clear auth token cookie
      document.cookie = "authToken=; path=/; max-age=0";
      router.push("/admin");
    } catch (error) {
      console.error("Error signing out:", error);
      setIsLoading(false);
    }
  };

  const handleAddBlog = () => {
    router.push("/admin/dashboard/new-blog");
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setEditTitle(blog.title);
    setEditExcerpt(blog.excerpt || "");
  };

  const handleSaveEdit = async (id: string) => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }

    setIsSaving(true);

    try {
      const blogRef = doc(db, "blogs", id);
      await updateDoc(blogRef, {
        title: editTitle,
        excerpt: editExcerpt,
      });

      setEditingId(null);
      setEditTitle("");
      setEditExcerpt("");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "blogs", id));
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
    setEditExcerpt("");
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render content if not authenticated (safety check)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Nexiler Dashboard
            </h1>
            <p className="text-sm text-gray-600">Manage your blog posts</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header with Add Blog Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Blog Posts</h2>
            <p className="text-gray-600 mt-1">
              Create and manage your blog content
            </p>
          </div>
          <button
            onClick={handleAddBlog}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Blog
          </button>
        </div>

        {/* Loading State for Blogs */}
        {isFetchingBlogs && blogs.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600 mb-3"></div>
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        )}

        {/* Blogs Grid */}
        {!isFetchingBlogs && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                {editingId === blog.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full text-black px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        Excerpt
                      </label>
                      <textarea
                        value={editExcerpt}
                        onChange={(e) => setEditExcerpt(e.target.value)}
                        rows={3}
                        className="w-full text-black px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleSaveEdit(blog.id)}
                        disabled={isSaving}
                        className="flex-1 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="flex-1 px-3 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="mb-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                          {blog.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                            blog.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {blog.excerpt || "No excerpt provided"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(blog.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="flex-1 px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold text-sm transition-colors flex items-center justify-center gap-1"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="flex-1 px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-semibold text-sm transition-colors flex items-center justify-center gap-1"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isFetchingBlogs && blogs.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto mb-4 w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="text-gray-600 text-lg mb-4">No blog posts yet</p>
            <button
              onClick={handleAddBlog}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              Create your first blog
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
