import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Building,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AnimatedCard from "../../Components/Researchpapercomponenets/AnimatedCard";
import StatusBadge from "../../Components/Researchpapercomponenets/StatusBadge";
import "./Reseaches.css";

const availableCategories = [
  "AI",
  "Agriculture",
  "Energy",
  "Medicine",
  "Transport",
  "Climate",
  "Blockchain",
  "Urban Planning",
  "Sustainability",
  "Education",
  "Renewable Energy",
  "Traditional Medicine",
  "Computer Vision",
  "Supply Chain",
];

const currentYear = new Date().getFullYear();
const availableYears = Array.from({ length: 5 }, (_, i) => currentYear - i);

const ITEMS_PER_PAGE = 6;

interface Paper {
  id: number;
  title: string;
  abstract: string;
  contentUrl: string;
  status: string;
  authorId: number;
  reviewerId: number;
  score: number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

export default function ResearchArchive() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [sortBy, setSortBy] = useState("recent");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch papers from API
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://yrs-api-8.onrender.com/api/papers?status=all"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPapers(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch papers");
        console.error("Error fetching papers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedYear("");
    setCurrentPage(1);
  };

  // Extract categories from papers for filtering
  const extractCategoriesFromPapers = (papers: Paper[]): string[] => {
    const categories = new Set<string>();
    papers.forEach((paper) => {
      // Extract categories from title and abstract
      const text = `${paper.title} ${paper.abstract}`.toLowerCase();
      availableCategories.forEach((category) => {
        if (text.includes(category.toLowerCase())) {
          categories.add(category);
        }
      });
    });
    return Array.from(categories);
  };

  const paperCategories = useMemo(
    () => extractCategoriesFromPapers(papers),
    [papers]
  );

  const filteredResults = useMemo(() => {
    let filtered = papers.filter(
      (paper) =>
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((paper) => {
        const paperText = `${paper.title} ${paper.abstract}`.toLowerCase();
        return selectedCategories.some((category) =>
          paperText.includes(category.toLowerCase())
        );
      });
    }

    if (selectedYear) {
      filtered = filtered.filter((paper) =>
        paper.createdAt.startsWith(selectedYear)
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "az":
          return a.title.localeCompare(b.title);
        case "score":
          return b.score - a.score;
        default:
          return 0;
      }
    });
  }, [papers, searchTerm, selectedCategories, selectedYear, sortBy]);

  // Pagination calculations
  const totalItems = filteredResults.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Get current page results
  const results = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredResults.slice(startIndex, endIndex);
  }, [filteredResults, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = 3;
      }

      if (currentPage >= totalPages - 1) {
        start = totalPages - 2;
      }

      if (start > 2) {
        pages.push("ellipsis-start");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const FilterSection = () => (
    <div className="filter-section">
      <div className="filter-header">
        <h3 className="filter-title">Filters</h3>
        <button onClick={clearFilters} className="clear-filters">
          Clear all
        </button>
      </div>

      {/* Categories */}
      <div>
        <label className="categories-label">Categories</label>
        <div className="categories-list">
          {availableCategories.map((category) => (
            <label key={category} className="category-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="category-checkbox"
              />
              <span className="category-label">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Year */}
      <div>
        <label className="year-label">Publication Year</label>
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setCurrentPage(1);
          }}
          className="year-select"
        >
          <option value="">All Years</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div className="results-count">
        <p>
          Showing{" "}
          <span className="results-number">
            {Math.min(totalItems, (currentPage - 1) * ITEMS_PER_PAGE + 1)}-
            {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)}
          </span>{" "}
          of <span className="results-number">{totalItems}</span> papers
        </p>
      </div>
    </div>
  );

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = getPageNumbers();

    return (
      <div className="pagination-container">
        <div className="pagination">
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pageNumbers.map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                className={`pagination-btn ${
                  currentPage === page ? "active" : ""
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="research-archive">
        <div className="research-container">
          <div className="flex justify-center items-center min-h-96">
            <div className="text-lg text-gray-600">
              Loading research papers...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="research-archive">
        <div className="research-container">
          <div className="flex justify-center items-center min-h-96">
            <div className="text-center">
              <div className="text-red-500 text-lg mb-2">
                Error loading papers
              </div>
              <div className="text-gray-600">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="research-archive">
      <div className="research-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="research-header"
        >
          <div>
            <h1 className="research-title">Research Archive</h1>
            <p className="research-subtitle">
              Explore innovative research by scholars and creators.
            </p>
          </div>

          {/* Search bar */}
          <div className="search-container">
            <div className="search-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by title or abstract..."
                className="search-input"
              />
            </div>
          </div>
        </motion.div>

        <div className="research-layout">
          {/* Sidebar (desktop) */}
          <div className="sidebar-desktop">
            <AnimatedCard className="sidebar-sticky">
              <FilterSection />
            </AnimatedCard>
          </div>

          {/* Main content */}
          <div className="main-content">
            {/* Show Filters button (mobile only) */}
            <div>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="mobile-filter-btn"
              >
                <Filter className="h-4 w-4" />
                Show Filters
              </button>
            </div>

            {/* Mobile Filter Overlay */}
            <AnimatePresence>
              {showMobileFilters && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mobile-filter-overlay"
                    onClick={() => setShowMobileFilters(false)}
                  />
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="mobile-filter-sidebar"
                  >
                    <div className="mobile-filter-content">
                      <div className="mobile-filter-header">
                        <h3 className="mobile-filter-title">Filters</h3>
                        <button
                          onClick={() => setShowMobileFilters(false)}
                          className="mobile-filter-close"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mobile-filter-body">
                        <FilterSection />
                      </div>
                      <div>
                        <button
                          onClick={() => setShowMobileFilters(false)}
                          className="mobile-filter-apply"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Research Papers */}
            <AnimatedCard className="p-6 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50">
              {results.length === 0 ? (
                <div className="no-results">
                  <Search className="no-results-icon" />
                  <h3 className="no-results-title">No papers found</h3>
                  <p className="no-results-text">
                    Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <>
                  <div className="papers-grid">
                    {results.map((paper, index) => (
                      <motion.div
                        key={paper.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="paper-card"
                        onClick={() => navigate(`/paper/${paper.id}`)}
                      >
                        <div className="paper-content">
                          <div className="paper-header">
                            <StatusBadge status={paper.status} />
                            <div className="paper-downloads">
                              <Download className="h-4 w-4" />
                              <span>Score: {paper.score}</span>
                            </div>
                          </div>

                          <h3 className="paper-title">{paper.title}</h3>

                          <div className="paper-meta">
                            <div className="meta-item">
                              <User className="h-4 w-4" />
                              <span>Author ID: {paper.authorId}</span>
                            </div>
                            <div className="meta-item">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(paper.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="paper-institution">
                            <Building className="h-4 w-4" />
                            <span className="truncate">
                              Reviewer ID: {paper.reviewerId}
                            </span>
                          </div>

                          <p className="paper-abstract">{paper.abstract}</p>

                          <div className="paper-categories">
                            {paperCategories.slice(0, 3).map((category) => (
                              <span key={category} className="category-tag">
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination />
                </>
              )}
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
}
