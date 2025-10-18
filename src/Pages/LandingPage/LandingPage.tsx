import { useState, useEffect, useRef } from "react";
// import { motion } from "motion/react";
import { motion } from "framer-motion";

import "./LandingPagecss.css";

import { HeroSection } from "./HeroSection";
import { ValuePropositions } from "./ValuePropositions";
import { HowItWorks } from "./HowItWorks";
import { DynamicCounters } from "./DynamicCounters";
import { FeaturedResearch } from "./FeaturedResearch";
// import { AuthCard } from "./AuthCard";
import { Footer } from "./Footer";
import { DarkModeToggle } from "./DarkModeToggle";
import Login from "../Auth/Login";

export default function LandingPage() {
  const [isDark, setIsDark] = useState(true);

  const authRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const scrollToAuth = () => {
    authRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToResearch = () => {
    researchRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Dark Mode Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
      </div>

      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-green-50/20 dark:from-blue-950/10 dark:to-green-950/10 pointer-events-none" />

      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-500/40 dark:bg-blue-300/60 rounded-full shadow-sm dark:shadow-blue-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 60 - 30, 0],
              y: [0, Math.random() * 80 - 40, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Additional smaller flowing dots */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute w-0.5 h-0.5 bg-blue-600/50 dark:bg-blue-200/70 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 120 - 60],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <main className="relative z-10">
        {/* <HeroSection /> */}
        <HeroSection
          onStartPublishing={scrollToAuth}
          onExplore={scrollToResearch}
        />
        <ValuePropositions />
        {/* <HowItWorks /> */}
        <div ref={authRef}>
          <HowItWorks onStartPublishing={scrollToAuth} />
        </div>
        <DynamicCounters />
        {/* <FeaturedResearch /> */}
        <div ref={researchRef}>
          <FeaturedResearch onStartPublishing={scrollToAuth} />
        </div>
        <div ref={authRef}>
          {/* <AuthCard /> */}
          <Login />
        </div>
      </main>

      <Footer />
    </div>
  );
}
