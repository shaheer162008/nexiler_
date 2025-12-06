"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { BlogFilter } from "@/components/BlogFilter";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/init";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  time: string;
  status: "published" | "draft";
  featuredImage?: string;
}

const categories = ["All Posts", "AI Automation", "Development", "Machine Learning", "Best Practices", "Tutorials", "Case Studies"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch published blogs from Firestore
  useEffect(() => {
    setIsLoading(true);

    try {
      const blogsQuery = query(
        collection(db, "blogs"),
        orderBy("date", "desc")
      );

      const unsubscribe = onSnapshot(blogsQuery, (snapshot) => {
        const fetchedBlogs: BlogPost[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          // Only include published blogs
          if (data.status === "published") {
            fetchedBlogs.push({
              id: doc.id,
              title: data.title || "",
              excerpt: data.excerpt || "",
              content: data.content || "",
              category: data.category || "Development",
              date: data.date || new Date().toISOString().split("T")[0],
              time: data.time || "5 min read",
              status: data.status,
              featuredImage: data.featuredImage || "",
            });
          }
        });

        setBlogPosts(fetchedBlogs);
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setIsLoading(false);
    }
  }, []);

  const filteredPosts = activeCategory === "All Posts"
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-bright/20 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Insights & </span>
              <span className="text-gradient">Updates</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70">
              Stay up to date with the latest trends in AI, automation, and software development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter - Sticky */}
      <BlogFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p className="text-white/60">Loading blogs...</p>
              </div>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blogs/${generateSlug(post.title)}`} className="group block">
                    <div className="rounded-2xl overflow-hidden glass border border-white/10 hover:border-primary/50 transition-all h-full">
                      {/* Image or Placeholder */}
                      <div className="aspect-video bg-linear-to-br from-primary/20 to-purple-500/20 relative overflow-hidden">
                        {post.featuredImage ? (
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl font-bold text-white/10">{index + 1}</div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-primary mb-3">
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {post.category}
                          </span>
                          <span className="text-white/40">•</span>
                          <span className="flex items-center gap-1 text-white/60">
                            <Clock size={14} />
                            {post.time}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-white/40">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center gap-1 text-primary text-sm font-medium">
                            Read More
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-white/60 text-lg mb-4">No blog posts found in this category</p>
                <button
                  onClick={() => setActiveCategory("All Posts")}
                  className="px-6 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-medium transition-colors"
                >
                  View All Posts
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
