"use client"

import {
  ChakraProvider, createSystem,
  defaultConfig,
  defineConfig
} from "@chakra-ui/react"
import {
  ColorModeProvider

} from "./color-mode"
import type { ColorModeProviderProps } from "./color-mode";


const config = defineConfig({
  // Global CSS - applies basic styling rules
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      minHeight: "100vh",
    }
  },
  // Theme configuration
  theme: {
    // Breakpoints for responsive design
    breakpoints: {
      sm: "30em", // 480px
      md: "48em", // 768px
      lg: "62em", // 992px
      xl: "80em", // 1280px
      "2xl": "96em", // 1536px
    },
    // Design tokens
    tokens: {
      colors: {
        // Primary brand color - teal variations
        brand: {
          50: { value: "#E6FFFA" },
          100: { value: "#B2F5EA" },
          200: { value: "#81E6D9" },
          300: { value: "#4FD1C5" },
          400: { value: "#38B2AC" },
          500: { value: "#319795" }, // Primary brand color
          600: { value: "#2C7A7B" },
          700: { value: "#285E61" },
          800: { value: "#234E52" },
          900: { value: "#1D4044" },
        },
        // Dark mode specific colors
        darkBg: { value: "#121212" },
        darkCard: { value: "#1E1E1E" },
        darkElevated: { value: "#2D3748" },
      },
      fonts: {
        body: { value: "Inter, system-ui, sans-serif" },
        heading: { value: "Inter, system-ui, sans-serif" },
      },
      fontSizes: {
        "5xl": { value: "3rem" },
        "6xl": { value: "3.75rem" },
        "7xl": { value: "4.5rem" },
      },
      fontWeights: {
        normal: { value: "400" },
        medium: { value: "500" },
        bold: { value: "700" },
      },
      radii: {
        none: { value: "0" },
        sm: { value: "0.125rem" },
        md: { value: "0.375rem" },
        lg: { value: "0.5rem" },
        xl: { value: "0.75rem" },
        "2xl": { value: "1rem" },
        "3xl": { value: "1.5rem" },
        full: { value: "9999px" },
      },
      shadows: {
        xs: { value: "0 0 0 1px rgba(0, 0, 0, 0.05)" },
        sm: { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
        md: { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
        lg: { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" },
        xl: { value: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
      },
    },
    // Semantic tokens - colors that change based on color mode
    semanticTokens: {
      colors: {
        // Text colors
        text: {
          value: {
            base: "black",
            _dark: "white"
          }
        },
        // Background colors
        background: {
          value: {
            base: "white",
            _dark: "{colors.darkBg}"
          }
        },
        // Card colors
        card: {
          value: {
            base: "{colors.gray.50}",
            _dark: "{colors.darkCard}"
          }
        },
        // Accent colors
        accent: {
          value: {
            base: "#bd431f",
            _dark: "#e18258"
          }
        },
        // Muted secondary text
        muted: {
          value: {
            base: "{colors.gray.600}",
            _dark: "{colors.gray.400}"
          }
        },
      },
    },
  },
});

const system = createSystem(defaultConfig, config)

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider enableColorScheme enableSystem defaultTheme="dark" {...props} />
    </ChakraProvider>
  )
}
