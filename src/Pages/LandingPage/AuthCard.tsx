import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Github,
  Chrome,
  Apple,
} from "lucide-react";
import { Button } from "../../Components/LandingpageComponenets/button";
import { Input } from "../../Components/LandingpageComponenets/input";

export function AuthCard() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(isSignUp ? "Sign Up" : "Sign In", formData);
  };

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
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of researchers who are already making their mark in
            the academic world.
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#273469]/5 via-transparent to-[#27695C]/5" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#273469]/20 to-[#27695C]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#27695C]/20 to-[#273469]/20 rounded-full blur-3xl" />

            <div className="relative z-10 p-8">
              {/* Toggle Buttons */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-2xl p-1 mb-8">
                <motion.button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    isSignUp
                      ? "bg-white dark:bg-gray-800 text-[#273469] dark:text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign Up
                </motion.button>
                <motion.button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    !isSignUp
                      ? "bg-white dark:bg-gray-800 text-[#273469] dark:text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={isSignUp ? "signup" : "signin"}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, x: isSignUp ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isSignUp ? -50 : 50 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Full Name - Sign Up Only */}
                  {isSignUp && (
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="pl-12 py-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#273469] focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-12 py-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#273469] focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-12 py-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#273469] focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Confirm Password - Sign Up Only */}
                  {isSignUp && (
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-12 py-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#273469] focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#273469] to-[#27695C] hover:from-[#1e2553] hover:to-[#1e5449] text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      {isSignUp ? "Create Account" : "Sign In"}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </motion.form>
              </AnimatePresence>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
                <span className="px-4 text-gray-500 dark:text-gray-400">
                  or
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                {[
                  {
                    icon: Chrome,
                    name: "Google",
                    color:
                      "hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20",
                  },
                  {
                    icon: Github,
                    name: "GitHub",
                    color:
                      "hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700",
                  },
                  {
                    icon: Apple,
                    name: "Apple",
                    color:
                      "hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-gray-700",
                  },
                ].map((provider, index) => (
                  <motion.button
                    key={provider.name}
                    type="button"
                    className={`w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-xl font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 ${provider.color}`}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <provider.icon className="w-5 h-5" />
                    <span>Continue with {provider.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Terms */}
              <motion.p
                className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                By {isSignUp ? "creating an account" : "signing in"}, you agree
                to our{" "}
                <a
                  href="#"
                  className="text-[#273469] dark:text-[#4A90E2] hover:text-[#27695C] dark:hover:text-[#5BA3F5] transition-colors duration-300"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-[#273469] dark:text-[#4A90E2] hover:text-[#27695C] dark:hover:text-[#5BA3F5] transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </motion.p>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-[#273469]/20 to-[#27695C]/20 rounded-full blur-sm"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-[#27695C]/20 to-[#273469]/20 rounded-full blur-sm"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
