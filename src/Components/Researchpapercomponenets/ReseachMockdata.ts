const data = {
  papers: [
    {
      id: "101",
      title:
        "Optimizing Irrigation with Machine Learning in Ethiopian Agriculture",
      authors: ["D. Mohammed", "E. Kassa"],
      institutions: [
        "Addis Ababa University",
        "Ethiopian Institute of Agricultural Research",
      ],
      publicationDate: "2025-08-10",
      categories: ["AI", "Agriculture", "Sustainability"],
      status: "published",
      abstract:
        "A comprehensive study on using machine learning algorithms to optimize water usage in smallholder farms across the Ethiopian highlands. This research demonstrates a 40% reduction in water consumption while maintaining crop yields.",
      keywords: [
        "Machine Learning",
        "Irrigation",
        "Precision Agriculture",
        "Water Conservation",
      ],
      downloadCount: 145,
      citation: {
        apa: "Mohammed, D., & Kassa, E. (2025). Optimizing Irrigation with Machine Learning in Ethiopian Agriculture. Journal of Agricultural Technology, 15(2), 45-67.",
        mla: 'Mohammed, D., and E. Kassa. "Optimizing Irrigation with Machine Learning in Ethiopian Agriculture." Journal of Agricultural Technology, vol. 15, no. 2, 2025, pp. 45-67.',
      },
    },
    {
      id: "112",
      title: "Solar Microgrids for Rural Schools: Community Ownership Models",
      authors: ["S. Alemu", "T. Bekele"],
      institutions: ["Bahir Dar University"],
      publicationDate: "2025-07-02",
      categories: ["Energy", "Education", "Renewable Energy"],
      status: "published",
      abstract:
        "Prototype development and implementation of solar microgrids for rural schools with innovative community ownership models. This approach ensures sustainable energy access while empowering local communities.",
      keywords: [
        "Solar Energy",
        "Microgrid",
        "Community Development",
        "Rural Education",
      ],
      downloadCount: 89,
      citation: {
        apa: "Alemu, S., & Bekele, T. (2025). Solar Microgrids for Rural Schools: Community Ownership Models. Renewable Energy Journal, 8(3), 112-125.",
        mla: 'Alemu, S., and T. Bekele. "Solar Microgrids for Rural Schools: Community Ownership Models." Renewable Energy Journal, vol. 8, no. 3, 2025, pp. 112-125.',
      },
    },
    {
      id: "115",
      title: "Okra Extract & Blood Sugar Regulation: Clinical Observations",
      authors: ["B. Tadesse", "M. Haile", "A. Girma"],
      institutions: [
        "University of Gondar",
        "Ethiopian Public Health Institute",
      ],
      publicationDate: "2025-06-15",
      categories: ["Medicine", "Health", "Traditional Medicine"],
      status: "published",
      abstract:
        "Clinical observations on the potential of okra extracts in regulating glucose levels among diabetic patients. The study explores traditional medicine applications with modern scientific validation.",
      keywords: [
        "Diabetes",
        "Okra Extract",
        "Traditional Medicine",
        "Clinical Study",
      ],
      downloadCount: 234,
      citation: {
        apa: "Tadesse, B., Haile, M., & Girma, A. (2025). Okra Extract & Blood Sugar Regulation: Clinical Observations. Journal of Ethnopharmacology, 12(4), 78-92.",
        mla: 'Tadesse, B., M. Haile, and A. Girma. "Okra Extract & Blood Sugar Regulation: Clinical Observations." Journal of Ethnopharmacology, vol. 12, no. 4, 2025, pp. 78-92.',
      },
    },
    {
      id: "120",
      title: "e-Mobility Impacts in Developing Nations: A Critical Review",
      authors: ["D. Techane", "L. Mesfin"],
      institutions: [
        "Ethiopian Transportation Authority",
        "Addis Ababa Science and Technology University",
      ],
      publicationDate: "2025-04-28",
      categories: ["Transport", "Policy", "Sustainability"],
      status: "under review",
      abstract:
        "A critical review of adoption barriers and unintended impacts of electric vehicles in low-income regions. The study examines infrastructure requirements, economic implications, and environmental trade-offs.",
      keywords: [
        "Electric Vehicles",
        "Transport Policy",
        "Developing Nations",
        "Infrastructure",
      ],
      downloadCount: 67,
      citation: {
        apa: "Techane, D., & Mesfin, L. (2025). e-Mobility Impacts in Developing Nations: A Critical Review. Sustainable Transportation Review, 6(1), 34-48.",
        mla: 'Techane, D., and L. Mesfin. "e-Mobility Impacts in Developing Nations: A Critical Review." Sustainable Transportation Review, vol. 6, no. 1, 2025, pp. 34-48.',
      },
    },
    {
      id: "121",
      title: "Soil Carbon Sequestration Using Remote Sensing Technologies",
      authors: ["M. Abebe", "K. Solomon"],
      institutions: [
        "Hawassa University",
        "Ethiopian Environment and Forest Research Institute",
      ],
      publicationDate: "2025-05-20",
      categories: ["Climate", "Remote Sensing", "Agriculture"],
      status: "published",
      abstract:
        "Measuring soil carbon changes under different crop rotations using advanced remote sensing technologies. This research provides insights into carbon farming practices suitable for East African conditions.",
      keywords: [
        "Carbon Sequestration",
        "Remote Sensing",
        "Climate Change",
        "Soil Science",
      ],
      downloadCount: 156,
      citation: {
        apa: "Abebe, M., & Solomon, K. (2025). Soil Carbon Sequestration Using Remote Sensing Technologies. Environmental Science & Technology, 18(2), 89-104.",
        mla: 'Abebe, M., and K. Solomon. "Soil Carbon Sequestration Using Remote Sensing Technologies." Environmental Science & Technology, vol. 18, no. 2, 2025, pp. 89-104.',
      },
    },
    {
      id: "125",
      title: "AI-Driven Crop Disease Detection in Smallholder Farms",
      authors: ["R. Tesfaye", "S. Mekonnen"],
      institutions: [
        "Jimma University",
        "Ethiopian Artificial Intelligence Institute",
      ],
      publicationDate: "2025-03-15",
      categories: ["AI", "Agriculture", "Computer Vision"],
      status: "published",
      abstract:
        "Development of an AI-powered mobile application for early detection of crop diseases in smallholder farming systems. The system achieves 92% accuracy in identifying common crop diseases from smartphone images.",
      keywords: [
        "Artificial Intelligence",
        "Crop Disease",
        "Mobile Application",
        "Smallholder Farming",
      ],
      downloadCount: 278,
      citation: {
        apa: "Tesfaye, R., & Mekonnen, S. (2025). AI-Driven Crop Disease Detection in Smallholder Farms. Computers and Electronics in Agriculture, 22(3), 156-172.",
        mla: 'Tesfaye, R., and S. Mekonnen. "AI-Driven Crop Disease Detection in Smallholder Farms." Computers and Electronics in Agriculture, vol. 22, no. 3, 2025, pp. 156-172.',
      },
    },
    {
      id: "130",
      title: "Blockchain for Agricultural Supply Chain Transparency",
      authors: ["A. Getachew", "D. Yohannes"],
      institutions: [
        "Addis Ababa University",
        "Ethiopian Trade and Industry Ministry",
      ],
      publicationDate: "2025-02-10",
      categories: ["Blockchain", "Agriculture", "Supply Chain"],
      status: "under review",
      abstract:
        "Implementing blockchain technology to enhance transparency and efficiency in agricultural supply chains. The research focuses on coffee and sesame export chains in Ethiopia.",
      keywords: ["Blockchain", "Supply Chain", "Agriculture", "Transparency"],
      downloadCount: 98,
      citation: {
        apa: "Getachew, A., & Yohannes, D. (2025). Blockchain for Agricultural Supply Chain Transparency. Journal of Agricultural Informatics, 7(1), 45-60.",
        mla: 'Getachew, A., and D. Yohannes. "Blockchain for Agricultural Supply Chain Transparency." Journal of Agricultural Informatics, vol. 7, no. 1, 2025, pp. 45-60.',
      },
    },
    {
      id: "135",
      title: "Renewable Energy Integration in Urban Planning",
      authors: ["F. Hailu", "T. Assefa"],
      institutions: [
        "Ethiopian Urban Planning Institute",
        "Addis Ababa City Administration",
      ],
      publicationDate: "2025-01-25",
      categories: ["Energy", "Urban Planning", "Renewable Energy"],
      status: "published",
      abstract:
        "Framework for integrating renewable energy sources into urban planning processes for rapidly growing African cities. Case study based on Addis Ababa's master plan.",
      keywords: [
        "Renewable Energy",
        "Urban Planning",
        "Sustainable Cities",
        "Energy Policy",
      ],
      downloadCount: 134,
      citation: {
        apa: "Hailu, F., & Assefa, T. (2025). Renewable Energy Integration in Urban Planning. Sustainable Cities and Society, 12(3), 78-95.",
        mla: 'Hailu, F., and T. Assefa. "Renewable Energy Integration in Urban Planning." Sustainable Cities and Society, vol. 12, no. 3, 2025, pp. 78-95.',
      },
    },
  ],
};

export default data;
