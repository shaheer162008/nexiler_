"use client";
import { motion } from "framer-motion";
import { Shield, Star, Send } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Security",
        description: "We take proactive steps to make sure your information and transactions are secure.",
    },
    {
        icon: Star,
        title: "100% Trusted",
        description: "We are trusted by 230+ companies and our clients love working with us.",
    },
    {
        icon: Send,
        title: "Balance Transfer",
        description: "A balance transfer credit card can save you a lot of money in interest charges.",
    },
];

export const Business = () => {
    return (
        <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden">

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className="px-0 sm:px-4"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6 md:mb-8 leading-tight">
                            <span className="text-white">You do the business,</span>
                            <br />
                            <span className="text-gradient">we'll handle the automation.</span>
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-white/60 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
                            With the right AI automation and custom solutions, your business can scale efficiently. We help you focus on growth while we handle the technology.
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

                    {/* Right: Features */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className="space-y-4 sm:space-y-5 md:space-y-6"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                                whileHover={{ x: 8 }}
                                className="flex items-start gap-4 sm:gap-5 md:gap-6 p-5 sm:p-6 md:p-8 rounded-2xl glass border border-white/10 hover:border-primary/50 transition-all duration-500 group relative"
                            >
                                {/* Inner Spotlight */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                                    <feature.icon size={28} className="text-primary sm:w-7 sm:h-7 md:w-8 md:h-8" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-2 md:mb-3 group-hover:text-primary transition-colors duration-500">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
