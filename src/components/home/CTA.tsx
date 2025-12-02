"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
    return (
        <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden">

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="relative max-w-5xl mx-auto p-6 sm:p-8 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl glass border border-primary/30 text-center overflow-hidden group hover:border-primary/50 transition-all duration-500"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-cyan-bright/10 to-primary/10 group-hover:from-primary/20 group-hover:via-cyan-bright/20 group-hover:to-primary/20 transition-all duration-500" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-primary/20 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] -z-10 group-hover:scale-125 transition-transform duration-500" />

                    <div className="relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6"
                        >
                            <span className="text-white">Ready to </span>
                            <span className="text-gradient">Transform?</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                            className="text-base sm:text-lg md:text-xl text-white/70 mb-3 sm:mb-4 max-w-2xl mx-auto"
                        >
                            Let&apos;s discuss how we can revolutionize your business with AI automation and custom development solutions.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="text-xs sm:text-sm text-primary/80 mb-8 sm:mb-9 md:mb-10 flex items-center justify-center gap-2"
                        >
                            <span className="size-2 bg-primary rounded-full animate-pulse" />
                            Free consultation • Fast response within 24 hours
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <Link
                                href="/contact"
                                className="group/btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold text-sm sm:text-base md:text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-500"
                            >
                                Get Free Consultation
                                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform duration-500 sm:w-6 sm:h-6" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
