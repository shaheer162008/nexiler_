import Link from "next/link";
import { Logo } from "./Logo";
import { Twitter, Linkedin, Github, Mail, Instagram } from "lucide-react";

const footerLinks = {
    company: [
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Blog", href: "/blogs" },
    ],
    resources: [
        { label: "Case Studies", href: "/portfolio" },
        { label: "Pricing", href: "/services" },
        { label: "Contact", href: "/contact" },
        { label: "FAQ", href: "/about" },
    ],
    legal: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Cookie Policy", href: "/cookie-policy" },
    ],
};

const socialLinks = [
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { Icon: Github, href: "https://github.com", label: "GitHub" },
    { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { Icon: Mail, href: "mailto:hello@nexiler.com", label: "Email" },
];

export const Footer = () => {
    return (
        <footer className="border-t border-white/10 relative overflow-hidden">
            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Logo className="mb-4" />
                        <p className="text-white/60 text-sm mb-6 max-w-sm">
                            Transforming businesses with cutting-edge AI automation and custom solutions.
                            Your partner in digital transformation.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-primary transition-all duration-300 hover:scale-110"
                                    aria-label={label}
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-primary text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-sm">
                        © {new Date().getFullYear()} Nexiler. All rights reserved.
                    </p>
                    <p className="text-white/40 text-sm">
                        Created by Team Nexiler
                    </p>
                </div>
            </div>
        </footer>
    );
};
