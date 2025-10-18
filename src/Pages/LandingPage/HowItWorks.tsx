import { motion } from "framer-motion";
import { FileText, Users, CheckCircle, Globe } from "lucide-react";

type HowItWorkProps = {
  onStartPublishing: () => void;
};
const steps = [
  {
    step: 1,
    title: "Sign In / Sign Up",
    description:
      "Create your account or log in to join our research community.",
    icon: Users,
    character: "🧑🏿‍💻", // person with Afro hair coding (signup/signin as activity)
    color: "from-purple-500 to-purple-600",
  },
  {
    step: 2,
    title: "Submit Your Research",
    description:
      "Upload your manuscripts, data, and supporting materials through our intuitive submission portal.",
    icon: FileText,
    character: "👩🏿‍🔬", // female scientist with Afro hair submitting research
    color: "from-blue-500 to-blue-600",
  },
  {
    step: 3,
    title: "Get Recognized",
    description:
      "Once approved, your work is published with full credit and academic recognition.",
    icon: CheckCircle,
    character: "👨🏿‍🎓", // male graduate with Afro hair
    color: "from-green-500 to-green-600",
  },
  {
    step: 4,
    title: "Make Global Impact",
    description:
      "Reach researchers and institutions worldwide with your contributions.",
    icon: Globe,
    character: "🧑🏿‍💼", // professional with Afro hair impacting globally
    color: "from-orange-500 to-orange-600",
  },
];

export function HowItWorks({ onStartPublishing }: HowItWorkProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
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
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From submission to global recognition - your research journey made
            simple.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#273469] to-[#27695C] transform -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 relative z-10 group hover:shadow-2xl transition-all duration-300">
                  {/* Step Number */}
                  <motion.div
                    className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.step}
                  </motion.div>

                  {/* Character Animation */}
                  <motion.div
                    className="text-6xl text-center mb-4 mt-4"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4,
                    }}
                  >
                    {step.character}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 mx-auto mb-6 shadow-lg`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-full h-full text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#273469] dark:text-white mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Effects */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                  />
                </div>

                {/* Arrow for larger screens */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-8 bg-white dark:bg-gray-800 border-2 border-[#273469] rounded-full flex items-center justify-center shadow-lg">
                      <motion.div
                        className="w-2 h-2 bg-[#273469] rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Ready to start your research journey?
          </p>
          <motion.button
            onClick={onStartPublishing}
            className="bg-gradient-to-r from-[#273469] to-[#27695C] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
