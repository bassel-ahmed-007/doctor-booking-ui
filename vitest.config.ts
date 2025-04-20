import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    globals: true,
    setupFiles: "./vitest.setup.ts",
  },
});
