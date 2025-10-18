import { motion } from "framer-motion";
import { Heart, Send, ExternalLink, Linkedin } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "How It Works", href: "#" },
    { label: "Features", href: "#" },
    { label: "Support", href: "#" },
  ],
  researchers: [
    { label: "Submit Paper", href: "#" },
    { label: "Review Process", href: "#" },
    { label: "Author Guidelines", href: "#" },
  ],
  resources: [
    { label: "Research Tools", href: "#" },
    { label: "Templates", href: "#" },
    { label: "API Documentation", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Academic Ethics", href: "#" },
  ],
};

const socialLinks = [
  {
    name: "Telegram",
    href: "https://t.me/c/2148887449/4",
    icon: Send,
    color: "hover:text-blue-500",
  },
  {
    name: "Website",
    href: "https://ethioware.org/",
    icon: ExternalLink,
    color: "hover:text-green-500",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/ethioware/",
    icon: Linkedin,
    color: "hover:text-blue-600",
  },
];

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#273469] to-[#27695C] bg-clip-text text-transparent mb-4">
                Youth Research Platform
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Empowering young African researchers to publish, collaborate,
                and make their mark on the global academic landscape.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(
            ([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-[#273469] dark:text-white mb-4 capitalize">
                  {category === "platform"
                    ? "Platform"
                    : category === "researchers"
                    ? "For Researchers"
                    : category === "resources"
                    ? "Resources"
                    : "Legal"}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li key={link.label}>
                      <motion.a
                        href={link.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-[#273469] dark:hover:text-white transition-colors duration-300"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: categoryIndex * 0.1 + linkIndex * 0.05,
                        }}
                        viewport={{ once: true }}
                      >
                        {link.label}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          )}
        </div>

        {/* Bottom Footer */}
        <motion.div
          className="border-t border-gray-200 dark:border-gray-700 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>for young researchers worldwide</span>
            </div>

            <div className="text-gray-600 dark:text-gray-300">
              © 2025 Youth Research Platform. All rights reserved.
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-10 left-10 w-20 h-20 bg-gradient-to-br from-[#273469]/10 to-[#27695C]/10 rounded-full blur-xl pointer-events-none"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-[#27695C]/10 to-[#273469]/10 rounded-full blur-xl pointer-events-none"
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </footer>
  );
}
