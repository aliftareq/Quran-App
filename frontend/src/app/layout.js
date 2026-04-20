import {
  Geist,
  Geist_Mono,
  Amiri,
  Lateef,
  Katibeh,
  Open_Sans,
  Merriweather,
  Fira_Mono,
} from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

// --- Default Next.js Fonts ---
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- Arabic Google Fonts ---
const amiri = Amiri({
  weight: ["400", "700"],
  variable: "--font-amiri",
  subsets: ["arabic"],
});
const lateef = Lateef({
  weight: ["400"],
  variable: "--font-lateef",
  subsets: ["arabic"],
});
const katibeh = Katibeh({
  weight: ["400"],
  variable: "--font-katibeh",
  subsets: ["arabic"],
});

// --- English Google Fonts ---
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});
const merriweather = Merriweather({
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
  subsets: ["latin"],
});
const firaMono = Fira_Mono({
  weight: ["400", "500", "700"],
  variable: "--font-fira-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Al-Quran App",
  description: "Modern Quranic experience built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // ADD ALL FONT VARIABLES HERE SO THE WHOLE APP CAN SEE THEM
      className={`
        ${geistSans.variable} 
        ${geistMono.variable} 
        ${amiri.variable} 
        ${lateef.variable} 
        ${katibeh.variable} 
        ${openSans.variable} 
        ${merriweather.variable} 
        ${firaMono.variable} 
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <SettingsProvider>
            <Navbar />
            {children}
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
