module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary / Secondary Branding
        primary: "#5DADE2",          // Light Blue – main brand color
        primaryHover: "#3498DB",     // Darker Blue – hover state
        secondary: "#F2F4F7",        // Light Gray – backgrounds, cards
        secondaryHover: "#E5E8E8",   // Slightly darker gray – hover/active

        // Background / Text
        white: "#FFFFFF",
        screenBg: "#EAF2F8",         // Light blue-gray screen background
        gray200: "#E5E7EB",
        gray600: "#4B5563",
        gray700: "#374151",
        gray800: "#1F2937",
        textDark: "#2C3E50",          // Titles, main text
        textLabel: "#34495E",         // Form labels
        textLight: "#5D6D7E",         // Secondary text
        textMuted: "#85929E",         // Placeholders, muted icons
        textDisabled: "#AAB7B8",      // Disabled text

        // Hero / Overlay Colors
        heroOverlayLight: "rgba(0,0,0,0.4)",
        heroOverlayMedium: "rgba(0,0,0,0.6)",
        heroOverlayDark: "rgba(0,0,0,0.7)",

        // Accent Colors
        green: "#22C55E",
        blue: "#3B82F6",
        purple: "#A855F7",
        red: "#EF4444",
        pink: "#EC4899",

        // Footer / Dark Background
        footerBg: "#1E40AF",          // Dark Blue footer

        // Gradient / Blur Circles
        blurBlue: "rgba(93,173,226,0.3)",
        blurLightBlue: "rgba(191,219,254,0.3)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        heading: ["Playfair Display", "serif"],
      },
      fontSize: {
        // Extended font sizes for more granular control
        '2xs': '0.625rem',    // 10px
        'xs': '0.75rem',      // 12px
        'sm': '0.875rem',     // 14px
        'base': '1rem',       // 16px
        'lg': '1.125rem',     // 18px
        'xl': '1.25rem',      // 20px
        '2xl': '1.5rem',      // 24px
        '3xl': '1.875rem',    // 30px
        '4xl': '2.25rem',     // 36px
        '5xl': '3rem',        // 48px
        '6xl': '4rem',        // 64px
      },
      spacing: {
        // Custom spacing for consistent layout
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}