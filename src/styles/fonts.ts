import { Barlow, Fraunces } from "next/font/google";

/**
 * Centralized font system — approved architecture Section I / O.
 *
 * Display: Garet (pending license) → Fraunces via next/font/google until then.
 * Body: Barlow via next/font/google.
 *
 * Always style with CSS variables --font-display / --font-body
 * (aliases --lw-font-primary / --lw-font-secondary also resolve to these).
 *
 * When Garet is licensed:
 * 1. Place files under src/assets/fonts/garet/
 * 2. Replace `fontDisplay` with next/font/local
 * 3. Keep variable name `--font-display-face`
 */

export const fontDisplay = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-face",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const fontBody = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-face",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

/** @deprecated Prefer fontDisplay — kept for older imports during migration. */
export const fontPrimary = fontDisplay;

/** @deprecated Prefer fontBody — kept for older imports during migration. */
export const fontSecondary = fontBody;

export const fontVariableClassNames = [fontDisplay.variable, fontBody.variable].join(
  " ",
);
