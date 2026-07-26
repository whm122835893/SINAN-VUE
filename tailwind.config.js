/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        brand: {
          pink: "#FF5A7D",
          magenta: "#E91E63",
          orange: "#FF6B00",
          "orange-light": "#FF8C00",
        },
        ink: {
          primary: "#333333",
          secondary: "#666666",
          tertiary: "#999999",
          divider: "#EEEEEE",
        },
        surface: {
          white: "#FFFFFF",
          gray: "#F7F7F7",
          "warm-white": "#FFF8F0",
          "warm-mist": "#FFF8F3",
          "warm-pink": "#FFF0F0",
        },
        retro: {
          bg: "#A67B5B",
          btn: "#6B4E3D",
          gold: "#D4A574",
        },
        fn: {
          success: "#22C55E",
          danger: "#FF4D4F",
          blue: "#1890FF",
        },
        lottery: {
          deep: "#1A0508",
          mid: "#4A0A12",
        },
      },
      fontFamily: {
        sans: [
          "PingFang SC",
          "Helvetica Neue",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      borderRadius: {
        capsule: "25px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.06)",
        "card-lg": "0 8px 30px rgba(0, 0, 0, 0.1)",
        "icon-3d": "0 6px 14px rgba(0,0,0,0.18), inset 0 2px 2px rgba(255,255,255,0.4)",
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "flip-down": {
          "0%": { transform: "rotateX(90deg)", opacity: "0" },
          "100%": { transform: "rotateX(0)", opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        twinkle: {
          "0%,100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "spin-slow": {
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "marquee-x": "marquee-x 18s linear infinite",
        "flip-down": "flip-down 0.5s ease-out",
        float: "float 4s ease-in-out infinite",
        twinkle: "twinkle 2.4s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
      },
    },
  },
  plugins: [],
}
