import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useTheme } from "../../contexts/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { NavItem } from "../../types";

const navItems: NavItem[] = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isVisible, setIsVisible] = useState(true);
    const { isScrolled, activeSection } = useScrollPosition();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [rightSideVisible, setRightSideVisible] = useState(window.innerWidth >= 1280);

    useEffect(() => {
        let lastScrollPosition: number = window.pageYOffset;
        let ticking: boolean = false;

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setRightSideVisible(window.innerWidth >= 1280);
        };

        const handleScroll: () => void = () => {
            const currentScrollY: number = window.pageYOffset;
            const scrollDifference: number = Math.abs(currentScrollY - lastScrollPosition);

            if (scrollDifference > 10 && rightSideVisible) {
                if (currentScrollY > lastScrollPosition) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
                lastScrollPosition = currentScrollY;
            }
        };

        const onScroll: () => void = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [rightSideVisible]);

    if (isMobile || !rightSideVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header
                    className="fixed top-0 left-0 right-0 flex justify-center z-50 pt-6"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.5,
                    }}
                >
                    <nav className={`rounded-full ${isScrolled ? "backdrop-blur-lg bg-background/50" : ""}`}>
                        <div className="flex items-center gap-4 px-6 py-3">
                            <motion.a
                                href="#home"
                                className="text-xl font-bold text-gradient"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                FP
                            </motion.a>

                            <motion.div
                                className="flex items-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {navItems.map((item) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        className={`glass-pill px-3 py-1.5 text-sm ${
                                            activeSection === item.href.replace("#", "") ? "bg-primary/20" : ""
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const element = document.querySelector(item.href);
                                            if (element) {
                                                const elementPosition = element.getBoundingClientRect().top;
                                                const offsetPosition = elementPosition + window.pageYOffset - 100;

                                                window.scrollTo({
                                                    top: offsetPosition,
                                                    behavior: "smooth",
                                                });
                                            }
                                        }}
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                            </motion.div>

                            <motion.button
                                className="glass-pill p-2 relative"
                                onClick={toggleTheme}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    className="relative w-6 h-6"
                                    initial={false}
                                    animate={{
                                        rotate: theme === "dark" ? 0 : 180,
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={false}
                                        animate={{
                                            opacity: theme === "dark" ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <MoonIcon className={`w-6 h-6 ${theme === "light" ? "invert" : ""}`} />
                                    </motion.div>
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={false}
                                        animate={{
                                            opacity: theme === "dark" ? 0 : 1,
                                        }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <SunIcon className={`w-6 h-6 ${theme === "dark" ? "invert" : ""}`} />
                                    </motion.div>
                                </motion.div>
                            </motion.button>

                            <motion.a
                                href="https://github.com/FrozenProductions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-button px-3 py-1.5 flex items-center gap-2 text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img
                                    src="/assets/icons/github.svg"
                                    alt="GitHub"
                                    className={`w-4 h-4 ${theme === "dark" ? "invert" : ""}`}
                                />
                                <span className="hidden sm:inline">GitHub</span>
                            </motion.a>
                        </div>
                    </nav>
                </motion.header>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
