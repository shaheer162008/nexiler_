"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        quote: "Nexiler transformed our business operations with their cutting-edge AI automation. Our efficiency increased by 300% in just 3 months!",
        author: "Sarah Johnson",
        role: "CEO, TechFlow Inc",
        rating: 5,
    },
    {
        quote: "The team's expertise in both AI and traditional development is unmatched. They delivered exactly what we needed, on time and on budget.",
        author: "Michael Chen",
        role: "CTO, StartupXYZ",
        rating: 5,
    },
    {
        quote: "Outstanding service and support. Nexiler doesn't just build solutions, they become your long-term technology partner.",
        author: "Emily Rodriguez",
        role: "Founder, GrowthLabs",
        rating: 5,
    },
];

export const Testimonials = () => {
    return (
        <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden">

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 md:mb-6">
                            <span className="text-white">What Our </span>
                            <span className="text-gradient">Clients Say</span>
                        </h2>
                        <p className="text-lg text-white/60">
                            Don't just take our word for it. Here's what our clients have to say about working with us.
                        </p>
                    </motion.div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                            whileHover={{ y: -10, scale: 1.03 }}
                            className="p-5 sm:p-6 rounded-2xl glass border border-white/10 hover:border-primary/30 transition-all duration-500 group relative"
                        >
                            {/* Inner Spotlight */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={18} className="fill-primary text-primary" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-white/80 mb-6 leading-relaxed">
                                    "{testimonial.quote}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-cyan-gradient flex items-center justify-center font-bold text-dark group-hover:scale-110 transition-transform duration-300">
                                        {testimonial.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">
                                            {testimonial.author}
                                        </div>
                                        <div className="text-sm text-white/60">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                                <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
