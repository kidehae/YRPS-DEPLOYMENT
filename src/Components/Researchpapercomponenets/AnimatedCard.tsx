// import { motion } from "framer-motion";
// import type { ReactNode } from "react";

// interface AnimatedCardProps {
//   children: ReactNode;
//   delay?: number;
//   className?: string;
// }

// export default function AnimatedCard({
//   children,
//   delay = 0,
//   className = "",
// }: AnimatedCardProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20, scale: 0.98 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ duration: 0.6, delay, ease: "easeOut" }}
//       className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`}
//     >
//       {children}
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedCard({
  children,
  delay = 0,
  className = "",
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
}
