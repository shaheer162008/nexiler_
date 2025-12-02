"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const projects = [
    {
        title: "AI-Powered CRM Automation",
        category: "AI Automation",
        description: "Automated customer relationship management system with predictive analytics and intelligent lead scoring.",
        image: "/placeholder-project-1.jpg",
    },
    {
        title: "E-Commerce Platform",
        category: "Web Development",
        description: "Full-stack e-commerce solution with real-time inventory management and ML-based recommendations.",
        image: "/placeholder-project-2.jpg",
    },
    {
        title: "Smart Analytics Dashboard",
        category: "Data Science",
        description: "Real-time business intelligence dashboard with custom KPI tracking and automated reporting.",
        image: "/placeholder-project-3.jpg",
    },
];

export const FeaturedWork = () => {
    return (
        <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                <span className="text-white">Featured </span>
                                <span className="text-gradient">Projects</span>
                            </h2>
                            <p className="text-lg text-white/60">
                                Explore some of our recent success stories
                            </p>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/portfolio"
                            className="px-6 py-3 glass rounded-lg font-semibold text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 border border-white/20 inline-flex items-center gap-2"
                        >
                            View All Projects
                            <ExternalLink size={18} />
                        </Link>
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ y: -12, scale: 1.02 }}
                            className="group relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                        >
                            {/* Image Placeholder with Gradient Overlay */}
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-purple-500/20 relative overflow-hidden">
                                {/* Number */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-8xl font-bold text-white/[0.07]">{index + 1}</div>
                                </div>
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent group-hover:from-dark/90 transition-all duration-300" />
                                {/* Icon on Hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="p-4 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
                                        <ExternalLink size={32} className="text-primary" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 relative">
                                {/* Inner Spotlight */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="text-primary text-sm font-medium mb-2">
                                        {project.category}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/60 text-sm">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                                <div className="absolute inset-0 bg-primary/5 blur-xl" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
