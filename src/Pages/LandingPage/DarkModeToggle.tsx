import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface DarkModeToggleProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export function DarkModeToggle({ isDark, setIsDark }: DarkModeToggleProps) {
  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="relative p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-yellow-400" />
        ) : (
          <Sun className="w-5 h-5 text-orange-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
