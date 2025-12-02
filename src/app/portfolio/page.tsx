"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { PortfolioFilter } from "@/components/PortfolioFilter";
import { ExternalLink } from "lucide-react";

// Metadata is set in layout.tsx for client components

const categories = ["All", "AI Automation", "Web Dev", "Mobile App", "Data Science"];

const projects = [
    {
        title: "AI-Powered CRM Automation",
        category: "AI Automation",
        description: "End-to-end CRM automation with predictive lead scoring and intelligent email campaigns.",
        tags: ["Python", "TensorFlow", "AWS"],
    },
    {
        title: "E-Commerce Platform",
        category: "Web Dev",
        description: "Full-stack e-commerce solution with real-time inventory and ML recommendations.",
        tags: ["Next.js", "Node.js", "PostgreSQL"],
    },
    {
        title: "Mobile Banking App",
        category: "Mobile App",
        description: "Secure mobile banking application with biometric authentication.",
        tags: ["React Native", "Firebase", "Plaid"],
    },
    {
        title: "Business Intelligence Dashboard",
        category: "Data Science",
        description: "Real-time analytics dashboard with custom KPI tracking.",
        tags: ["Python", "Tableau", "BigQuery"],
    },
    {
        title: "Document Processing AI",
        category: "AI Automation",
        description: "Automated document classification and data extraction system.",
        tags: ["OCR", "NLP", "Azure"],
    },
    {
        title: "Healthcare Portal",
        category: "Web Dev",
        description: "Patient management system with appointment scheduling and telemedicine.",
        tags: ["React", "Express", "MongoDB"],
    },
];

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-bright/15 rounded-full blur-[120px] animate-pulse pointer-events-none -z-10" style={{ animationDuration: '5s' }} />
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            <span className="text-white">Our </span>
                            <span className="text-gradient">Portfolio</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/70">
                            Explore our latest projects and success stories across various industries.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter */}
            <PortfolioFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            {/* Projects Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="group rounded-2xl overflow-hidden glass border border-white/10 hover:border-primary/50 transition-all cursor-pointer"
                            >
                                {/* Image Placeholder */}
                                <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-purple-500/20 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-7xl font-bold text-white/10">{index + 1}</div>
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <ExternalLink size={32} className="text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="text-primary text-sm font-medium mb-2">
                                        {project.category}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/60 text-sm mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Newsletter />
            <Footer />
        </main>
    );
}
