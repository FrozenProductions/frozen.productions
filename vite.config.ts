import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "dist",
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom", "framer-motion"],
                },
            },
        },
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
});