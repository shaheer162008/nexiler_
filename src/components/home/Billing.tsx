"use client";
import { motion } from "framer-motion";
import { Apple, PlaySquare } from "lucide-react";

export const Billing = () => {
    return (
        <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
            
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
                    {/* Left: Visual/Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className="relative"
                    >
                        {/* Billing Interface Mockup */}
                        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass border border-white/10 p-5 sm:p-6 md:p-8">
                            <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                                <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-white/10">$</div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
                        </div>
                        {/* Floating Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-primary/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] -z-10" />
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6 md:mb-8 leading-tight">
                            <span className="text-white">Easily control your</span>
                            <br />
                            <span className="text-gradient">billing & invoicing.</span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
                            Elite business intelligence with automated reporting, real-time analytics, and customizable dashboards that put you in complete control.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 rounded-xl glass border border-white/10 hover:border-primary/50 transition-all duration-500"
                            >
                                <Apple size={24} className="text-white sm:w-7 sm:h-7" />
                                <div className="text-left">
                                    <div className="text-xs text-white/40">GET IT ON</div>
                                    <div className="text-sm sm:text-base font-semibold text-white">App Store</div>
                                </div>
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 rounded-xl glass border border-white/10 hover:border-primary/50 transition-all duration-500"
                            >
                                <PlaySquare size={24} className="text-white sm:w-7 sm:h-7" />
                                <div className="text-left">
                                    <div className="text-xs text-white/40">GET IT ON</div>
                                    <div className="text-sm sm:text-base font-semibold text-white">Google Play</div>
                                </div>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
