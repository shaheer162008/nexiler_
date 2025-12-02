"use client";
import { motion } from "framer-motion";

export const CardDeal = () => {
    return (
        <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden">
            
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6 md:mb-8 leading-tight">
                            <span className="text-white">Find a better solution</span>
                            <br />
                            <span className="text-gradient">in few easy steps.</span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
                            Get custom AI automation solutions tailored to your specific needs. Our streamlined process makes it easy to transform your business.
                        </p>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="px-8 sm:px-10 py-3 sm:py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold text-base sm:text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-500"
                        >
                            See Pricing
                        </motion.button>
                    </motion.div>

                    {/* Right: Card Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className="relative"
                    >
                        {/* Card Mockup */}
                        <div className="relative">
                            <div className="rounded-2xl sm:rounded-3xl overflow-hidden glass border border-white/10 p-5 sm:p-6 md:p-8">
                                <div className="aspect-[16/10] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between">
                                    <div className="text-right">
                                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-white/80">NEXILER</div>
                                    </div>
                                    <div>
                                        <div className="text-xs sm:text-sm text-white/40 mb-2">Card Number</div>
                                        <div className="text-lg sm:text-xl md:text-2xl font-mono text-white tracking-wider mb-4 sm:mb-5 md:mb-6">
                                            4562  1122  4594  7852
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                <div className="text-xs text-white/40 mb-1">CARD HOLDER</div>
                                                <div className="text-sm sm:text-base font-semibold text-white">Your Name</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-white/40 mb-1">EXPIRES</div>
                                                <div className="text-sm sm:text-base font-semibold text-white">12/25</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Floating Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-cyan-bright/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] -z-10" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
