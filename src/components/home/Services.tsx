"use client";
import { motion } from "framer-motion";
import { Bot, Code, Zap, Shield, Workflow, Database } from "lucide-react";

const services = [
    {
        icon: Bot,
        title: "AI Automation",
        description: "Intelligent automation solutions powered by machine learning and advanced AI algorithms.",
        gradient: "from-cyan-500 to-blue-500",
    },
    {
        icon: Code,
        title: "Custom Development",
        description: "Tailored web and mobile applications built with cutting-edge technologies.",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        icon: Workflow,
        title: "Process Optimization",
        description: "Streamline your workflows with intelligent automation and system integration.",
        gradient: "from-green-500 to-teal-500",
    },
    {
        icon: Database,
        title: "Data Solutions",
        description: "Transform raw data into actionable insights with advanced analytics and AI.",
        gradient: "from-orange-500 to-red-500",
    },
    {
        icon: Zap,
        title: "API Integration",
        description: "Seamlessly connect your systems with robust API development and integration.",
        gradient: "from-yellow-500 to-orange-500",
    },
    {
        icon: Shield,
        title: "Consulting & Support",
        description: "Expert guidance and 24/7 technical support for your digital transformation journey.",
        gradient: "from-indigo-500 to-purple-500",
    },
];

export const Services = () => {
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
                            <span className="text-white">Our </span>
                            <span className="text-gradient">Services</span>
                        </h2>
                        <p className="text-lg text-white/60">
                            Comprehensive AI and development solutions designed to accelerate your business growth and digital transformation.
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/50">
                            <span className="flex items-center gap-2">
                                <span className="size-2 bg-primary rounded-full animate-pulse" />
                                98% Client Satisfaction
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="size-2 bg-primary rounded-full animate-pulse" />
                                50+ Projects Delivered
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative p-6 rounded-2xl glass border border-white/10 hover:border-primary/50 transition-all duration-500"
                        >
                            {/* Card Spotlight */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] via-primary/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icon */}
                            <div className={`relative inline-flex p-3 rounded-lg bg-gradient-to-br ${service.gradient} mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-primary/50`}>
                                <service.icon size={24} className="text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                                {service.title}
                            </h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                {service.description}
                            </p>

                            {/* Hover Glow Effect */}
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
