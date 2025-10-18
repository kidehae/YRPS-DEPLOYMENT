import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { BookOpen, Users, Award, Globe, TrendingUp, Star } from "lucide-react";

const counters = [
  {
    icon: BookOpen,
    value: 1247,
    label: "Published Papers",
    suffix: "+",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    value: 5829,
    label: "Active Researchers",
    suffix: "+",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Award,
    value: 156,
    label: "Partner Universities",
    suffix: "+",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Globe,
    value: 34,
    label: "Countries Represented",
    suffix: "+",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: TrendingUp,
    value: 98,
    label: "Success Rate",
    suffix: "%",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Star,
    value: 4.9,
    label: "Average Rating",
    suffix: "/5",
    color: "from-yellow-500 to-yellow-600",
    decimal: true,
  },
];

function AnimatedCounter({
  value,
  suffix,
  decimal = false,
  isInView,
}: {
  value: number;
  suffix: string;
  decimal?: boolean;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(decimal ? Math.round(current * 10) / 10 : Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, decimal, isInView]);

  return (
    <span className="text-3xl sm:text-4xl font-bold">
      {decimal ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function DynamicCounters() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-[#273469] dark:text-white mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Growing stronger every day with the support of our incredible
            research community.
          </p>
        </motion.div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {counters.map((counter, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center h-full relative overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${counter.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${counter.color} p-4 mx-auto mb-6 shadow-lg`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <counter.icon className="w-full h-full text-white" />
                </motion.div>

                {/* Counter */}
                <motion.div
                  className={`text-transparent bg-gradient-to-r ${counter.color} bg-clip-text mb-3`}
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AnimatedCounter
                    value={counter.value}
                    suffix={counter.suffix}
                    decimal={counter.decimal}
                    isInView={isInView}
                  />
                </motion.div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {counter.label}
                </h3>

                {/* Animated Border */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${counter.color} w-0 group-hover:w-full transition-all duration-500`}
                />

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${counter.color} rounded-full opacity-0 group-hover:opacity-60`}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* <div className="bg-gradient-to-r from-[#273469]/10 to-[#27695C]/10 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-[#273469] dark:text-white mb-4">
              Be Part of Something Bigger
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of researchers who are already making their mark in
              the academic world. Your next breakthrough could be the one that
              changes everything.
            </p>
            <motion.button
              className="bg-gradient-to-r from-[#273469] to-[#27695C] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Our Community
            </motion.button>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
