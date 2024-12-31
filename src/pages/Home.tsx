import { motion } from "framer-motion";
import { pageVariants } from "../utils/animations";
import Hero from "../components/home/Hero";
import { useEffect } from "react";
import Projects from "../components/projects/Projects";
import Contact from "../components/home/Contact";

const Home: React.FC = () => {
    useEffect(() => {
        const hash: string = window.location.hash;
        if (hash) {
            const element: HTMLElement | null = document.querySelector(hash);
            element?.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} className="overflow-hidden">
            <div className="fixed inset-0 overflow-hidden -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-secondary-light via-background-light to-secondary-light dark:from-dark-300 dark:via-dark-200 dark:to-dark-300">
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: "radial-gradient(circle at 50% 50%, rgba(114,137,218,0.03), transparent 70%)",
                            filter: "blur(40px)",
                        }}
                        animate={{
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
                <div
                    className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-[0.02] dark:opacity-[0.02]"
                    style={{
                        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
                    }}
                />
            </div>

            <div className="relative z-10">
                <section id="home">
                    <Hero />
                </section>
                <section id="projects">
                    <Projects />
                </section>
                <section id="contact">
                    <Contact />
                </section>
            </div>
        </motion.div>
    );
};

export default Home;
