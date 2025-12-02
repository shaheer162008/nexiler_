"use client";
import { motion } from "framer-motion";

interface PortfolioFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export const PortfolioFilter = ({ categories, activeCategory, onCategoryChange }: PortfolioFilterProps) => {
    return (
        <section className="py-6 border-y border-white/10 sticky top-16 md:top-20 z-40 backdrop-blur-xl overflow-hidden relative">
            {/* Enhanced Gradient Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#00040F] via-[#00040F]/95 to-[#00040F]" />
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px]"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(51, 187, 207, 0.15), rgba(51, 187, 207, 0.08) 50%, transparent 80%)',
                        filter: 'blur(50px)',
                        animation: 'pulse 4s ease-in-out infinite',
                    }}
                />
            </div>
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category, index) => (
                        <motion.button
                            key={category}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            onClick={() => onCategoryChange(category)}
                            className={`px-5 md:px-6 py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base transition-all duration-300 ${
                                activeCategory === category
                                    ? "bg-white/10 text-white border-2 border-white/30"
                                    : "bg-white/5 text-white/70 hover:text-white border-2 border-white/10 hover:border-white/20 hover:bg-white/10"
                            }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};
