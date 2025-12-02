"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blogs", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/10 shadow-lg overflow-hidden">
            {/* Navbar Gradient Effect - More Visible */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#00040F] via-[#00040F]/95 to-[#00040F]/85" />
            <div className="absolute inset-0 -z-10">
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full"
                    style={{
                        background: 'radial-gradient(ellipse 100% 150% at 50% 0%, rgba(51, 187, 207, 0.15), rgba(51, 187, 207, 0.08) 40%, transparent 70%)',
                        filter: 'blur(40px)',
                    }}
                />
                <div 
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(90deg, rgba(51, 187, 207, 0.05) 0%, transparent 50%, rgba(51, 187, 207, 0.05) 100%)',
                    }}
                />
            </div>
            
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Logo />
                    </div>

                    {/* Desktop Navigation - Centered */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-all duration-300 hover:text-primary relative group ${pathname === link.href ? "text-primary" : "text-white/70"
                                    }`}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-gradient rounded-full"
                                    />
                                )}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/50 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button (Desktop) */}
                    <Link
                        href="/contact"
                        className="hidden md:inline-flex px-6 py-3 bg-white/10 text-white border-2 border-white/30 rounded-xl text-sm font-bold hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                    >
                        See Pricing
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-white hover:text-primary hover:bg-white/5 transition-all duration-300"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setMobileMenuOpen(false)}
                            style={{ top: '64px' }}
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="md:hidden fixed inset-x-0 top-16 bg-[#00040F] border-b border-white/10 shadow-2xl z-50"
                            style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}
                        >
                        <nav className="container mx-auto px-6 py-8 flex flex-col gap-1">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                                            pathname === link.href
                                                ? "text-primary bg-primary/10 border-l-4 border-primary"
                                                : "text-white/80 hover:text-white hover:bg-white/5 border-l-4 border-transparent hover:border-primary/50"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                                className="mt-4 pt-4 border-t border-white/10"
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block w-full px-6 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl text-base font-bold text-center hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                                >
                                    See Pricing
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};
