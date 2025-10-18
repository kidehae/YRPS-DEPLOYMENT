import { motion } from "framer-motion";
import { Shield, Globe, Users, Zap, BookOpen, Award } from "lucide-react";

const valueProps = [
  {
    icon: Shield,
    title: "Rigorous Peer Review",
    description:
      "Every submission goes through our comprehensive peer review process by experienced academics and industry experts.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Connect with researchers worldwide and showcase your work to an international academic community.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Users,
    title: "Youth-Focused Community",
    description:
      "A platform designed specifically for young researchers, fostering collaboration and mentorship.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "Fast Publication",
    description:
      "Streamlined submission and review process gets your research published faster than traditional journals.",
    color: "from-orange-500 to-orange-600",
  },
];

export function ValuePropositions() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
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
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We provide the tools, community, and support you need to make your
            research impact the world.
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${prop.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prop.color} p-4 mb-6 shadow-lg`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <prop.icon className="w-full h-full text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#273469] dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#273469] group-hover:to-[#27695C] group-hover:bg-clip-text transition-all duration-300">
                  {prop.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {prop.description}
                </p>

                {/* Animated Border */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${prop.color} w-0 group-hover:w-full transition-all duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#273469] dark:text-white">
              Built for the Next Generation
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Our platform combines traditional academic rigor with modern
              technology to create an environment where young researchers can
              thrive, collaborate, and make meaningful contributions to their
              fields.
            </p>
            <div className="space-y-4">
              {[
                "Interactive collaboration tools",
                "Comprehensive analytics dashboard",
                "Mobile-first design",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-[#273469] to-[#27695C] rounded-full" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-gradient-to-br from-[#273469]/10 to-[#27695C]/10 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <BookOpen className="w-12 h-12 text-[#273469] mx-auto mb-3" />
                  <div className="text-2xl font-bold text-[#273469] dark:text-white">
                    24/7
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Support
                  </div>
                </div>
                <div className="text-center">
                  <Award className="w-12 h-12 text-[#27695C] mx-auto mb-3" />
                  <div className="text-2xl font-bold text-[#27695C] dark:text-white">
                    98%
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
