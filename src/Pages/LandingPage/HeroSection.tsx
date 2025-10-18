import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";
import { Button } from "../../Components/LandingpageComponenets/button";

type HeroSectionProps = {
  onStartPublishing: () => void;
  onExplore: () => void;
};

export function HeroSection({
  onStartPublishing,
  onExplore,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          {/* Main Headline */}
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#273469] via-[#27695C] to-[#273469] bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="mb-2 block">
              Youth Research publication Platform
            </span>

            <br />
            <span className="relative -mt-2 block text-[#27695C] ">
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#273469] to-[#27695C] rounded-full "
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              />
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            The premier platform for young African researchers to publish,
            peer-review, and showcase their groundbreaking work to the world.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-[#273469] hover:bg-[#1e2553] text-white px-8 py-4 text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onStartPublishing}
            >
              Start Publishing
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#27695C] text-[#27695C] hover:bg-[#27695C] hover:text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onExplore}
            >
              Explore Research
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {[
              { icon: BookOpen, value: "1,200+", label: "Published Papers" },
              { icon: Users, value: "5,000+", label: "Active Researchers" },
              { icon: Award, value: "150+", label: "Universities" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-8 h-8 text-[#273469] mx-auto mb-3" />
                <div className="text-2xl font-bold text-[#273469] dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#273469]/20 to-[#27695C]/20 rounded-full blur-xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-[#27695C]/20 to-[#273469]/20 rounded-full blur-xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}
