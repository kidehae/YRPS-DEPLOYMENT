// import { motion } from "framer-motion";
// import { Eye, Download, Heart, MessageCircle, Award } from "lucide-react";
// import { Badge } from "../../Components/LandingpageComponenets/badge";

// const featuredPapers = [
//   {
//     id: 1,
//     title: "Machine Learning Applications in African Healthcare Systems",
//     authors: "Dr. Amara Okonkwo, Prof. Kwame Asante",
//     category: "Artificial Intelligence",
//     abstract:
//       "This comprehensive study explores the implementation of machine learning algorithms in healthcare systems across sub-Saharan Africa, demonstrating significant improvements in diagnostic accuracy and patient outcomes.",
//     publishedDate: "2024-02-15",
//     views: 2847,
//     downloads: 1253,
//     likes: 189,
//     comments: 34,
//     featured: true,
//     image:
//       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
//     university: "University of Ghana",
//     status: "Published",
//   },
//   {
//     id: 2,
//     title: "Sustainable Energy Solutions for Rural African Communities",
//     authors: "Eng. Fatima Hassan, Dr. Joseph Mbeki",
//     category: "Renewable Energy",
//     abstract:
//       "An innovative approach to providing clean, sustainable energy to remote communities using locally sourced materials and community-driven implementation strategies.",
//     publishedDate: "2024-02-10",
//     views: 1924,
//     downloads: 876,
//     likes: 145,
//     comments: 28,
//     featured: true,
//     image:
//       "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop",
//     university: "Cairo University",
//     status: "Published",
//   },
//   {
//     id: 3,
//     title: "Climate Change Impact on West African Agriculture",
//     authors: "Dr. Adebayo Oluwaseun, Dr. Marie Diallo",
//     category: "Environmental Science",
//     abstract:
//       "A comprehensive analysis of climate change effects on agricultural productivity in West Africa, with proposed adaptation strategies for smallholder farmers.",
//     publishedDate: "2024-02-05",
//     views: 3156,
//     downloads: 1789,
//     likes: 267,
//     comments: 52,
//     featured: true,
//     image:
//       "https://images.unsplash.com/photo-1574263867128-5a04b6b33c55?w=400&h=300&fit=crop",
//     university: "University of Lagos",
//     status: "Published",
//   },
// ];

// const categories = [
//   {
//     name: "Artificial Intelligence",
//     color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
//   },
//   {
//     name: "Renewable Energy",
//     color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
//   },
//   {
//     name: "Environmental Science",
//     color:
//       "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
//   },
//   {
//     name: "Medicine",
//     color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
//   },
//   {
//     name: "Engineering",
//     color:
//       "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
//   },
// ];

// export function FeaturedResearch() {
//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-3xl sm:text-5xl font-bold text-[#273469] dark:text-white mb-6">
//             Featured Research
//           </h2>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
//             Discover groundbreaking research from young African scholars making
//             a global impact.
//           </p>

//           {/* Category Filter */}
//           <motion.div
//             className="flex flex-wrap justify-center gap-3"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//           >
//             {categories.map((category, index) => (
//               <motion.button
//                 key={index}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${category.color}`}
//                 whileHover={{ y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {category.name}
//               </motion.button>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Featured Papers */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//           {featuredPapers.map((paper, index) => (
//             <motion.div
//               key={paper.id}
//               className="group"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: index * 0.2 }}
//               viewport={{ once: true }}
//               whileHover={{ y: -10 }}
//             >
//               <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-full group-hover:shadow-2xl transition-all duration-300">
//                 {/* Paper Image */}
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={paper.image}
//                     alt={paper.title}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

//                   {/* Featured Badge */}
//                   {paper.featured && (
//                     <motion.div
//                       className="absolute top-4 left-4 bg-gradient-to-r from-[#273469] to-[#27695C] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1"
//                       initial={{ scale: 0 }}
//                       whileInView={{ scale: 1 }}
//                       transition={{ duration: 0.5, delay: index * 0.1 }}
//                       viewport={{ once: true }}
//                     >
//                       <Award className="w-4 h-4" />
//                       <span>Featured</span>
//                     </motion.div>
//                   )}

//                   {/* Category Badge */}
//                   <div className="absolute top-4 right-4">
//                     <Badge className="bg-white/90 text-gray-800 hover:bg-white">
//                       {paper.category}
//                     </Badge>
//                   </div>
//                 </div>

//                 {/* Paper Content */}
//                 <div className="p-6">
//                   <h3 className="text-lg font-bold text-[#273469] dark:text-white mb-3 line-clamp-2 group-hover:text-[#27695C] transition-colors duration-300">
//                     {paper.title}
//                   </h3>

//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
//                     By {paper.authors}
//                   </p>

//                   <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
//                     {paper.abstract}
//                   </p>

//                   <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
//                     {paper.university} •{" "}
//                     {new Date(paper.publishedDate).toLocaleDateString()}
//                   </div>

//                   {/* Paper Stats */}
//                   <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
//                     <div className="flex items-center space-x-4">
//                       <span className="flex items-center space-x-1">
//                         <Eye className="w-4 h-4" />
//                         <span>{paper.views.toLocaleString()}</span>
//                       </span>
//                       <span className="flex items-center space-x-1">
//                         <Download className="w-4 h-4" />
//                         <span>{paper.downloads.toLocaleString()}</span>
//                       </span>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <motion.button
//                         className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors duration-300"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                       >
//                         <Heart className="w-4 h-4" />
//                         <span className="text-sm">{paper.likes}</span>
//                       </motion.button>

//                       <motion.button
//                         className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors duration-300"
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                       >
//                         <MessageCircle className="w-4 h-4" />
//                         <span className="text-sm">{paper.comments}</span>
//                       </motion.button>
//                     </div>

//                     <motion.button
//                       className="bg-gradient-to-r from-[#273469] to-[#27695C] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
//                       whileHover={{ scale: 1.05, y: -2 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Read More
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* View All Button */}
//         <motion.div
//           className="text-center"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <motion.button
//             className="bg-gradient-to-r from-[#273469] to-[#27695C] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
//             whileHover={{ scale: 1.05, y: -2 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Explore All Research
//           </motion.button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, MessageCircle, Award } from "lucide-react";
import { Badge } from "../../Components/LandingpageComponenets/badge";

const featuredPapers = [
  // Artificial Intelligence
  {
    id: 1,
    title: "Machine Learning in African Healthcare",
    authors: "Dr. Amara Okonkwo, Prof. Kwame Asante",
    category: "Artificial Intelligence",
    abstract:
      "Implementation of ML algorithms across sub-Saharan healthcare systems, improving diagnostic accuracy.",
    publishedDate: "2024-02-15",
    views: 2847,
    likes: 189,
    comments: 34,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    university: "University of Ghana",
    status: "Published",
  },
  {
    id: 2,
    title: "AI in Education",
    authors: "Prof. Kofi Mensah",
    category: "Artificial Intelligence",
    abstract:
      "Using AI to personalize learning experiences in African schools.",
    publishedDate: "2024-01-28",
    views: 1345,
    likes: 98,
    comments: 21,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop",
    university: "University of Nairobi",
    status: "Published",
  },
  {
    id: 3,
    title: "Natural Language Processing for African Languages",
    authors: "Dr. Aisha Bello",
    category: "Artificial Intelligence",
    abstract: "Development of NLP tools to support local languages in Africa.",
    publishedDate: "2024-01-10",
    views: 987,
    likes: 56,
    comments: 12,
    featured: false,
    image:
      "https://plus.unsplash.com/premium_photo-1691411181835-f4f08c97e0a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWZyaWNhbnxlbnwwfHwwfHx8MA%3D%3D",
    university: "University of Lagos",
    status: "Published",
  },

  // Renewable Energy
  {
    id: 4,
    title: "Sustainable Energy for Rural Africa",
    authors: "Eng. Fatima Hassan, Dr. Joseph Mbeki",
    category: "Renewable Energy",
    abstract: "Clean, sustainable energy solutions using local materials.",
    publishedDate: "2024-02-10",
    views: 1924,
    likes: 145,
    comments: 28,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop",
    university: "Cairo University",
    status: "Published",
  },
  {
    id: 5,
    title: "Advancements in Energy Storage",
    authors: "Dr. Laila Ahmed",
    category: "Renewable Energy",
    abstract: "Improved battery systems for renewable energy reliability.",
    publishedDate: "2024-01-20",
    views: 2104,
    likes: 132,
    comments: 19,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&h=300&fit=crop",
    university: "University of Nairobi",
    status: "Published",
  },
  {
    id: 6,
    title: "Solar Microgrids Implementation",
    authors: "Eng. Samuel Adeyemi",
    category: "Renewable Energy",
    abstract: "Community-driven solar microgrid solutions for remote villages.",
    publishedDate: "2024-01-12",
    views: 1750,
    likes: 120,
    comments: 14,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1519377345644-937ef9754740?w=400&h=300&fit=crop",
    university: "University of Cape Town",
    status: "Published",
  },

  // Environmental Science
  {
    id: 7,
    title: "Climate Change on West African Agriculture",
    authors: "Dr. Adebayo Oluwaseun, Dr. Marie Diallo",
    category: "Environmental Science",
    abstract:
      "Climate change effects and adaptation strategies for smallholder farmers.",
    publishedDate: "2024-02-05",
    views: 3156,
    likes: 267,
    comments: 52,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWZyaWNhbnxlbnwwfHwwfHx8MA%3D%3D",
    university: "University of Lagos",
    status: "Published",
  },
  {
    id: 8,
    title: "Water Scarcity Solutions",
    authors: "Dr. Zuri Mensah",
    category: "Environmental Science",
    abstract:
      "Innovative techniques to manage water scarcity in African regions.",
    publishedDate: "2024-01-18",
    views: 1450,
    likes: 88,
    comments: 10,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop",
    university: "University of Nairobi",
    status: "Published",
  },
  {
    id: 9,
    title: "Deforestation Monitoring using Drones",
    authors: "Eng. Chike Obi",
    category: "Environmental Science",
    abstract: "Using drones to monitor deforestation and protect biodiversity.",
    publishedDate: "2024-01-05",
    views: 1120,
    likes: 72,
    comments: 8,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1541943201372-99066ec6a5c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHJvbmVzfGVufDB8fDB8fHww",
    university: "Makerere University",
    status: "Published",
  },

  // Medicine
  {
    id: 10,
    title: "Telemedicine and Healthcare Access",
    authors: "Dr. Chike Obi, Dr. Zuri Mensah",
    category: "Medicine",
    abstract: "Evaluating telemedicine solutions in remote African regions.",
    publishedDate: "2024-01-15",
    views: 1789,
    likes: 115,
    comments: 21,
    featured: false,
    image:
      "https://plus.unsplash.com/premium_photo-1672759455907-bdaef741cd88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVsZSUyMG1lZGNpbmV8ZW58MHx8MHx8fDA%3D",
    university: "University of Cape Town",
    status: "Published",
  },
  {
    id: 11,
    title: "Vaccination Strategies for Rural Communities",
    authors: "Dr. Amina Diallo",
    category: "Medicine",
    abstract: "Strategies to improve vaccination coverage in rural Africa.",
    publishedDate: "2024-01-08",
    views: 1300,
    likes: 95,
    comments: 16,
    featured: false,
    image:
      "https://plus.unsplash.com/premium_photo-1668487827105-9139219cb19a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHZhY2NpbmV8ZW58MHx8MHx8fDA%3D",
    university: "University of Lagos",
    status: "Published",
  },
  {
    id: 12,
    title: "Mental Health Awareness Programs",
    authors: "Dr. Fatima Hassan",
    category: "Medicine",
    abstract:
      "Promoting mental health awareness in African schools and communities.",
    publishedDate: "2024-01-01",
    views: 1100,
    likes: 80,
    comments: 12,
    featured: false,
    image:
      "https://plus.unsplash.com/premium_photo-1689177356594-b988a1cc45ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVudGFsJTIwaGVhbHRofGVufDB8fDB8fHww",
    university: "Cairo University",
    status: "Published",
  },

  // Engineering
  {
    id: 13,
    title: "Smart Irrigation Systems for African Farms",
    authors: "Eng. Amina Diallo, Eng. Samuel Adeyemi",
    category: "Engineering",
    abstract:
      "Integrating IoT and AI to optimize water usage and improve crop yields.",
    publishedDate: "2024-01-10",
    views: 1650,
    likes: 98,
    comments: 12,
    featured: false,
    image:
      "https://plus.unsplash.com/premium_photo-1661825536186-19606cd9a0f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JyaWdhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    university: "Makerere University",
    status: "Published",
  },
  {
    id: 14,
    title: "Bridge Construction Innovations",
    authors: "Eng. Tunde Balogun",
    category: "Engineering",
    abstract:
      "New materials and techniques for sustainable bridge construction.",
    publishedDate: "2024-01-05",
    views: 1250,
    likes: 78,
    comments: 9,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1592831698089-851a412e298e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnJpZGdlJTIwaW4lMjBhZnJpY2F8ZW58MHx8MHx8fDA%3D",
    university: "University of Nairobi",
    status: "Published",
  },
  {
    id: 15,
    title: "Renewable Energy in Engineering Projects",
    authors: "Eng. Chike Obi",
    category: "Engineering",
    abstract:
      "Incorporating renewable energy solutions in modern engineering designs.",
    publishedDate: "2024-01-01",
    views: 950,
    likes: 65,
    comments: 7,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1515344905723-babc01aac23d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVuZXdhYmxlJTIwZW5lcmd5fGVufDB8fDB8fHww",
    university: "University of Lagos",
    status: "Published",
  },
];

const categories = [
  {
    name: "All",
    color: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  },
  {
    name: "Artificial Intelligence",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  {
    name: "Renewable Energy",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  {
    name: "Environmental Science",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  {
    name: "Medicine",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
  {
    name: "Engineering",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
];

export function FeaturedResearch({
  onStartPublishing,
}: {
  onStartPublishing: () => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPapers =
    selectedCategory === "All"
      ? featuredPapers.slice(0, 6) // Only show 6 papers for "All"
      : featuredPapers.filter((paper) => paper.category === selectedCategory);

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
            Featured Research
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover groundbreaking research from young African scholars making
            a global impact.
          </p>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${category.color}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured Papers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {filteredPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-full group-hover:shadow-2xl transition-all duration-300">
                {/* Paper Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={paper.image}
                    alt={paper.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Featured Badge */}
                  {paper.featured && (
                    <motion.div
                      className="absolute top-4 left-4 bg-gradient-to-r from-[#273469] to-[#27695C] text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Award className="w-4 h-4" />
                      <span>Featured</span>
                    </motion.div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                      {paper.category}
                    </Badge>
                  </div>
                </div>

                {/* Paper Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#273469] dark:text-white mb-3 line-clamp-2 group-hover:text-[#27695C] transition-colors duration-300">
                    {paper.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    By {paper.authors}
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                    {paper.abstract}
                  </p>

                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    {paper.university} •{" "}
                    {new Date(paper.publishedDate).toLocaleDateString()}
                  </div>

                  {/* Paper Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{paper.views.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.button
                        className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{paper.likes}</span>
                      </motion.button>

                      <motion.button
                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{paper.comments}</span>
                      </motion.button>
                    </div>

                    <motion.button
                      className="bg-gradient-to-r from-[#273469] to-[#27695C] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onStartPublishing} // Redirects to AuthCard
                    >
                      Read More
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
