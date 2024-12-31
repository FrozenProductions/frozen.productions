import { ReactNode } from "react";

interface TechItem {
    name: string;
    description?: string;
    invert?: boolean;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon: string;
    description: string;
    invert?: boolean;
}

interface LayoutProps {
    children: ReactNode;
}

interface Project {
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl: string;
    featured?: boolean;
    category: "frontend" | "fullstack" | "mobile" | "other";
}

interface NavItem {
    label: string;
    href: string;
}

interface SocialLink {
    name: string;
    url: string;
    icon: string;
    isInverted: boolean;
}

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export type { TechItem, ModalProps, LayoutProps, Project, NavItem, SocialLink, Theme, ThemeContextType };
