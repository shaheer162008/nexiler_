'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-bold text-gradient leading-none mb-4">
                        404
                    </h1>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/"
                        className="relative px-8 py-4 bg-gradient-to-r from-[#33BBCF] to-[#00F6FF] text-[#00040F] font-semibold rounded-xl overflow-hidden group transition-all duration-300 hover:scale-105"
                    >
                        <span className="relative z-10">Go Home</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00F6FF] to-[#33BBCF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>

                    <Link
                        href="/contact"
                        className="relative px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/10 overflow-hidden group transition-all duration-300 hover:scale-105 hover:bg-white/10"
                    >
                        <span className="relative z-10">Contact Us</span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-12"
                >
                    <p className="text-sm text-white/50">
                        Need help? <Link href="/contact" className="text-[#33BBCF] hover:text-[#00F6FF] transition-colors">Contact our support team</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
