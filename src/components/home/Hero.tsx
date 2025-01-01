import { motion } from "framer-motion";
import { CodeBracketIcon, WrenchScrewdriverIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import WavingHand from "./WavingHand";
import { techStack, tools } from "../../data/tech";
import { TechItem } from "../../types";
import { containerVariants, itemVariants, rightSideVariants } from "../../utils/animations";
import { useTheme } from "../../contexts/ThemeContext";

const getRandomIcons = (count: number): TechItem[] => {
    const allTech: TechItem[] = [
        ...techStack.map((tech: TechItem) => ({
            name: tech.name.toLowerCase().replace(".", "").replace(" ", ""),
            invert: tech.invert,
        })),
        ...tools.map((tool: TechItem) => ({
            name: tool.name.toLowerCase().replace(" ", ""),
            invert: tool.invert,
        })),
    ];

    return allTech.sort(() => 0.5 - Math.random()).slice(0, count);
};

const Hero: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<TechItem | null>(null);
    const { theme } = useTheme();
    const [showRightSide, setShowRightSide] = useState(window.innerWidth >= 1280);
    const [randomIcons] = useState(() => getRandomIcons(5));

    useEffect(() => {
        const handleResize = () => {
            setShowRightSide(window.innerWidth >= 1280);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const navbar: HTMLElement | null = document.querySelector("header");
        if (navbar) {
            if (!showRightSide) {
                navbar.style.display = "none";
            } else {
                navbar.style.display = "flex";
            }
        }
    }, [showRightSide]);

    return (
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-8 sm:py-12 md:py-16 mt-4 sm:mt-6 md:mt-8 overflow-y-auto">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[60px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[60px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <motion.div
                className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 max-w-[90rem]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 xl:gap-24 h-full items-center [zoom>1.25]:!grid-cols-1">
                    <motion.div
                        variants={itemVariants}
                        className="text-left space-y-4 sm:space-y-6 md:space-y-8 max-w-2xl mx-auto xl:mx-0 [zoom>1.25]:mx-auto xl:[&:nth-child(1)]:justify-self-end xl:[&:only-child]:justify-self-center"
                    >
                        <motion.div
                            className="inline-block glass-pill mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <SparklesIcon className="w-3 h-3 sm:w-4 sm:h-4 inline-block mr-2" />
                            Hi there! Welcome to my space <WavingHand />
                        </motion.div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
                            I'm <span className="text-gradient">Dayte</span>
                            <br />
                            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                                Front-End Developer
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-text-secondary">
                            Transforming ideas into elegant, scalable solutions. With 2 years of hands-on experience in
                            modern web technologies and a passion for continuous learning. Committed to clean code
                            practices and staying at the forefront of web development.
                        </p>

                        <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12">
                            <motion.button
                                className="glass-button px-8 py-3 flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.open("https://github.com/FrozenProductions", "_blank")}
                            >
                                <img
                                    src="/assets/icons/github.svg"
                                    alt="GitHub"
                                    className={`w-5 h-5 ${theme === "dark" ? "invert" : ""}`}
                                />
                                GitHub
                            </motion.button>
                            <motion.button
                                className="glass-button px-8 py-3 flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.open("https://leetcode.com/FrozenProductions", "_blank")}
                            >
                                <img
                                    src="/assets/icons/leetcode.svg"
                                    alt="LeetCode"
                                    className={`w-5 h-5 ${theme === "dark" ? "invert" : ""}`}
                                />
                                LeetCode
                            </motion.button>
                        </div>

                        <div className="space-y-4 sm:space-y-6 md:space-y-8">
                            <div>
                                <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-6">
                                    <CodeBracketIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Tech Stack
                                </h3>
                                <motion.div
                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                            opacity: 1,
                                            transition: { staggerChildren: 0.1 },
                                        },
                                    }}
                                >
                                    {techStack.map((tech: TechItem) => (
                                        <motion.div
                                            key={tech.name}
                                            className="glass-card p-2 sm:p-3 rounded-lg flex items-center justify-center cursor-pointer"
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                visible: { opacity: 1, y: 0 },
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => setSelectedItem(tech)}
                                        >
                                            <motion.img
                                                src={`/assets/icons/${tech.name
                                                    .toLowerCase()
                                                    .replace(".", "")
                                                    .replace(" ", "")}.svg`}
                                                alt={tech.name}
                                                className={`w-5 h-5 sm:w-6 sm:h-6 mr-2 ${
                                                    tech.invert && theme === "dark" ? "invert" : ""
                                                }`}
                                            />
                                            <span className="text-xs sm:text-sm">{tech.name}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            <div>
                                <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-6">
                                    <WrenchScrewdriverIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Tools
                                </h3>
                                <motion.div
                                    className="grid grid-cols-2 gap-3"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                            opacity: 1,
                                            transition: { staggerChildren: 0.1 },
                                        },
                                    }}
                                >
                                    {tools.map((tool: TechItem) => (
                                        <motion.div
                                            key={tool.name}
                                            className="glass-card p-4 rounded-lg flex items-center justify-center cursor-pointer"
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                visible: { opacity: 1, y: 0 },
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => setSelectedItem(tool)}
                                        >
                                            <motion.img
                                                src={`/assets/icons/${tool.name.toLowerCase().replace(" ", "")}.svg`}
                                                alt={tool.name}
                                                className={`w-6 h-6 mr-2 ${
                                                    tool.invert && theme === "dark" ? "invert" : ""
                                                }`}
                                            />
                                            <span>{tool.name}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={rightSideVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative hidden xl:block h-full w-full flex items-center justify-center"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full aspect-square max-w-[400px] xl:max-w-[500px] 2xl:max-w-[600px] relative">
                                <motion.div
                                    className="absolute inset-0"
                                    transition={{
                                        duration: 50,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    {[...Array(3)].map((_: any, i: number) => (
                                        <motion.div
                                            key={i}
                                            className="absolute inset-0 border border-primary/20 rounded-full"
                                            style={{
                                                scale: 0.8 + i * 0.2,
                                            }}
                                            animate={{
                                                scale: [0.8 + i * 0.2, 0.9 + i * 0.2, 0.8 + i * 0.2],
                                            }}
                                            transition={{
                                                duration: 4 + i,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    ))}
                                </motion.div>

                                {randomIcons.map((tech: TechItem, index: number) => {
                                    const baseAngle: number = index * 72 + 270 + (Math.random() * 20 - 10);
                                    const radius: number = 40 + (Math.random() * 8 - 4);

                                    const angleRad: number = (baseAngle * Math.PI) / 180;
                                    const x: number = 45 + radius * Math.cos(angleRad);
                                    const y: number = 45 + radius * Math.sin(angleRad);

                                    return (
                                        <motion.div
                                            key={tech.name}
                                            className="absolute w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl glass-card cursor-grab active:cursor-grabbing z-20"
                                            style={{
                                                top: `${y}%`,
                                                left: `${x}%`,
                                                transform: `translate(-50%, -50%)`,
                                            }}
                                            drag
                                            dragConstraints={{
                                                top: -100,
                                                left: -100,
                                                right: 100,
                                                bottom: 100,
                                            }}
                                            dragElastic={0.8}
                                            dragTransition={{
                                                power: 0.1,
                                                timeConstant: 200,
                                                modifyTarget: (target) => Math.round(target / 50) * 50,
                                            }}
                                            whileDrag={{
                                                scale: 1.1,
                                                zIndex: 50,
                                            }}
                                            animate={{
                                                y: [0, -8 + Math.random() * 4, 0],
                                                x: [0, 6 + Math.random() * 4 * (index % 2 ? -1 : 1), 0],
                                                rotate: [0, 6 + Math.random() * 4 * (index % 2 ? -1 : 1), 0],
                                            }}
                                            transition={{
                                                duration: 3 + Math.random() * 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: index * 0.2,
                                            }}
                                        >
                                            <img
                                                src={`/assets/icons/${tech.name}.svg`}
                                                alt={tech.name}
                                                className={`w-full h-full p-2.5 pointer-events-none ${
                                                    tech.invert && theme === "dark" ? "invert" : ""
                                                }`}
                                            />
                                        </motion.div>
                                    );
                                })}

                                <motion.div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px]"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.3, 0.5, 0.3],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />

                                    <motion.div
                                        className="relative w-full h-full rounded-full border-4 border-primary/20 overflow-hidden"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <motion.img
                                            src="/assets/profile.png"
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.div>
                                </motion.div>

                                <div className="absolute inset-0">
                                    {[...Array(20)].map((_: any, i: number) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1 h-1 bg-primary/30 rounded-full"
                                            style={{
                                                top: `${Math.random() * 100}%`,
                                                left: `${Math.random() * 100}%`,
                                            }}
                                            animate={{
                                                opacity: [0.3, 0.8, 0.3],
                                                scale: [1, 1.5, 1],
                                            }}
                                            transition={{
                                                duration: 2 + Math.random() * 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: Math.random() * 2,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <Modal
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                title={selectedItem?.name || ""}
                icon={`/assets/icons/${selectedItem?.name.toLowerCase().replace(".", "").replace(" ", "")}.svg`}
                description={selectedItem?.description || ""}
                invert={selectedItem?.invert}
            />
        </section>
    );
};

export default Hero;
