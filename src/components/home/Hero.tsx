"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-16 px-4">
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div 
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse 100% 70% at 50% 20%, rgba(51, 187, 207, 0.06), transparent)',
                    }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Top Badge - Centered */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        className="flex justify-center mb-6 sm:mb-8"
                    >
                        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full glass border border-primary/30 hover:border-primary/50 transition-all duration-500">
                            <Sparkles size={16} className="sm:w-[18px] sm:h-[18px] text-primary animate-pulse" />
                            <span className="text-xs sm:text-sm md:text-base text-white/80 font-medium">Next-Gen AI Automation • Trusted by 230+ Companies</span>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                            className="text-center lg:text-left"
                        >
                            {/* Main Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-5 md:mb-6 leading-[1.1]"
                            >
                                <span className="block text-white mb-2 sm:mb-3">Transform Your</span>
                                <span className="block text-gradient">Business with AI</span>
                            </motion.h1>

                            {/* Subheadline */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
                            >
                                Custom AI automation solutions and traditional development services tailored to your unique needs.
                                We build intelligent systems that scale your business exponentially.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12"
                            >
                                <Link
                                    href="/contact"
                                    className="group w-full sm:w-auto px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-semibold text-sm sm:text-base hover:bg-white/20 hover:border-white/50 transition-all duration-500 inline-flex items-center justify-center gap-2"
                                >
                                    Get Free Consultation
                                    <ArrowRight size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-500" />
                                </Link>
                                <Link
                                    href="/portfolio"
                                    className="w-full sm:w-auto px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-semibold text-sm sm:text-base hover:bg-white/20 hover:border-white/50 transition-all duration-500 inline-flex items-center justify-center"
                                >
                                    See Success Stories
                                </Link>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
                            >
                                {[
                                    { value: "3900+", label: "Active Users" },
                                    { value: "230+", label: "Trusted Companies" },
                                    { value: "$230M+", label: "Transaction Volume" },
                                    { value: "24/7", label: "Support" },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                        className="text-center lg:text-left"
                                    >
                                        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-1 sm:mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs sm:text-sm md:text-base text-white/50">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Image - Responsive */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="relative group flex items-center justify-center mt-8 lg:mt-0"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                                className="relative w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-none aspect-square"
                            >
                                <Image
                                    src="/hero.png"
                                    alt="AI Business Transformation"
                                    width={1536}
                                    height={1536}
                                    className="object-contain transition-transform duration-700 w-full h-full"
                                    priority
                                />
                            </motion.div>
                            {/* Subtle Glow Effect on Hover */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-cyan-400/10 blur-3xl -z-10 rounded-3xl pointer-events-none"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
