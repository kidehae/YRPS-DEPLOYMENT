import { useParams, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Calendar,
  User,
  ArrowLeft,
  FileText,
  BookOpen,
  Quote,
  Building,
  Star,
  MessageCircle,
  Download,
  Eye,
  X,
} from "lucide-react";
import "./paperDetail.css";

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

export default function PaperDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPapers, setRelatedPapers] = useState<Paper[]>([]);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Fetch paper details from API
  useEffect(() => {
    const fetchPaper = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://yrs-api-8.onrender.com/api/papers/${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const paperData = await response.json();
        setPaper(paperData);

        // Fetch related papers (all papers except current one)
        const allPapersResponse = await fetch(
          "https://yrs-api-8.onrender.com/api/papers?status=all"
        );
        if (allPapersResponse.ok) {
          const allPapers = await allPapersResponse.json();
          const related = allPapers
            .filter((p: Paper) => p.id !== paperData.id)
            .slice(0, 3);
          setRelatedPapers(related);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch paper details"
        );
        console.error("Error fetching paper:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPaper();
    }
  }, [id]);

  const handleViewPaper = () => {
    if (!paper?.contentUrl) {
      alert("Paper URL not available");
      return;
    }
    setShowPdfViewer(true);
  };

  const handleDownloadPaper = async () => {
    if (!paper?.contentUrl) {
      alert("Paper URL not available");
      return;
    }

    try {
      setDownloading(true);

      if (
        paper.contentUrl.startsWith("chrome-extension://") ||
        paper.contentUrl.includes("chrome-extension")
      ) {
        handleDirectDownload();
        return;
      }

      try {
        const response = await fetch(paper.contentUrl, {
          method: "GET",
          mode: "cors",
          credentials: "omit",
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = getSafeFilename(paper.title);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          return;
        }
      } catch (fetchError) {
        console.log("Fetch method failed, trying direct download:", fetchError);
      }

      // Fallback to direct download
      handleDirectDownload();
    } catch (error) {
      console.error("All download methods failed:", error);
      alert(
        "Download failed. The file may not be accessible for direct download."
      );
    } finally {
      setDownloading(false);
    }
  };

  const handleDirectDownload = () => {
    if (!paper?.contentUrl) return;

    const link = document.createElement("a");

    // For chrome extension URLs
    if (paper.contentUrl.startsWith("chrome-extension://")) {
      // Extract the actual PDF URL from the chrome extension URL
      const parts = paper.contentUrl.split("https://");
      if (parts.length > 1) {
        const actualUrl = "https://" + parts[1];
        link.href = actualUrl;
      } else {
        link.href = paper.contentUrl;
      }
    } else {
      link.href = paper.contentUrl;
    }

    link.download = getSafeFilename(paper.title);
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    // Add download attribute
    link.setAttribute("download", "");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSafeFilename = (title: string): string => {
    return `${title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
  };

  const handleDownloadFromViewer = () => {
    handleDownloadPaper();
  };

  const handleRelatedPaperClick = (paperId: number) => {
    navigate(`/paper/${paperId}`);
  };

  // Generate citation based on available data
  const generateCitation = () => {
    if (!paper) return "";

    const year = new Date(paper.createdAt).getFullYear();
    return `Author ${paper.authorId}. (${year}). ${paper.title}. Research Archive.`;
  };

  // Check if URL is viewable in iframe (not chrome-extension)
  const isUrlViewable = (url: string): boolean => {
    return !url.startsWith("chrome-extension://");
  };

  if (loading) {
    return (
      <div className="paper-detail-page">
        <div className="paper-detail-wrapper">
          <div className="flex justify-center items-center min-h-96">
            <div className="text-lg text-gray-600">
              Loading paper details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !paper) {
    return (
      <div className="paper-detail-page">
        <div className="paper-detail-wrapper">
          <div className="paper-not-found">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="not-found-title">Paper Not Found</h2>
            <p className="not-found-text">
              {error || "The research paper you're looking for doesn't exist."}
            </p>
            <NavLink to="/allresearches" className="back-button">
              <ArrowLeft className="h-4 w-4" />
              Back to Archive
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  const canViewInIframe = isUrlViewable(paper.contentUrl);

  return (
    <div className="paper-detail-page">
      {showPdfViewer && (
        <div className="pdf-viewer-overlay">
          <div className="pdf-viewer-container">
            <div className="pdf-viewer-header">
              <h3 className="pdf-viewer-title">{paper.title}</h3>
              <div className="pdf-viewer-actions">
                <button
                  onClick={handleDownloadFromViewer}
                  className="pdf-action-btn download"
                  disabled={downloading}
                >
                  <Download className="h-4 w-4" />
                  {downloading ? "Downloading..." : "Download"}
                </button>
                <button
                  onClick={() => setShowPdfViewer(false)}
                  className="pdf-action-btn close"
                >
                  <X className="h-4 w-4" />
                  Close
                </button>
              </div>
            </div>
            <div className="pdf-viewer-content">
              {canViewInIframe ? (
                <iframe
                  src={paper.contentUrl}
                  title={paper.title}
                  className="pdf-iframe"
                  width="100%"
                  height="100%"
                />
              ) : (
                <div className="pdf-unavailable">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    PDF Preview Unavailable
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    This PDF cannot be displayed in the browser due to security
                    restrictions.
                  </p>
                  <button
                    onClick={handleDownloadPaper}
                    className="download-button"
                    disabled={downloading}
                  >
                    <Download className="h-5 w-5" />
                    {downloading ? "Downloading..." : "Download PDF to View"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="paper-detail-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="paper-detail-grid"
        >
          <div className="paper-main-content">
            <div className="paper-detail-header">
              <h1 className="paper-detail-title">{paper.title}</h1>

              <div className="paper-meta-info">
                <div className="paper-authors-list">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="paper-author">
                    Author ID: {paper.authorId}
                  </span>
                </div>

                <div className="paper-date-info">
                  <Calendar className="h-4 w-4" />
                  {new Date(paper.createdAt).toLocaleDateString()}
                </div>

                <div className="paper-institution-info">
                  <Building className="h-4 w-4" />
                  <span>Reviewer ID: {paper.reviewerId}</span>
                </div>
              </div>

              <div className="paper-stats-info">
                <div className="paper-stat">
                  <Star className="h-4 w-4" />
                  <span>Score: {paper.score}/100</span>
                </div>
                <div
                  className={`paper-status status-${paper.status.toLowerCase()}`}
                >
                  {paper.status}
                </div>
              </div>

              {/* URL Type Warning */}
              {paper.contentUrl.startsWith("chrome-extension://") && (
                <div className="url-warning">
                  <span className="warning-text">
                    Note: This paper requires download to view
                  </span>
                </div>
              )}
            </div>

            {/* Abstract Section */}
            <div className="paper-content-section">
              <h2 className="section-heading">
                <BookOpen className="h-5 w-5" />
                Abstract
              </h2>
              <p className="abstract-content">{paper.abstract}</p>
            </div>

            {/* Feedback Section */}
            <div className="paper-content-section">
              <h2 className="section-heading">
                <MessageCircle className="h-5 w-5" />
                Reviewer Feedback
              </h2>
              <div className="feedback-box">
                <p className="feedback-content">{paper.feedback}</p>
              </div>
            </div>

            {/* Citation Section */}
            <div className="paper-content-section">
              <h2 className="section-heading">
                <Quote className="h-5 w-5" />
                Citation
              </h2>
              <div className="citation-box">
                <div className="citation-type">Recommended Format</div>
                <div className="citation-text">{generateCitation()}</div>
              </div>
            </div>

            {/* Paper Details */}
            <div className="paper-content-section">
              <h2 className="section-heading">Paper Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Paper ID:</span>
                  <span className="detail-value">{paper.id}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">{paper.status}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Review Score:</span>
                  <span className="detail-value">{paper.score}/100</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">
                    {new Date(paper.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Updated:</span>
                  <span className="detail-value">
                    {new Date(paper.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="paper-sidebar">
            {/* Actions Card */}
            <div className="paper-sidebar-section">
              <h3 className="sidebar-heading">Paper Actions</h3>
              <div className="actions-container">
                <button
                  onClick={handleViewPaper}
                  className="view-paper-button"
                  disabled={!paper.contentUrl}
                >
                  <Eye className="h-5 w-5" />
                  {paper.contentUrl ? "View Paper" : "Paper Not Available"}
                </button>
                <button
                  onClick={handleDownloadPaper}
                  className="download-button"
                  disabled={!paper.contentUrl || downloading}
                >
                  <Download className="h-5 w-5" />
                  {downloading ? "Downloading..." : "Download PDF"}
                </button>
                <NavLink to="/allresearches" className="back-button">
                  <ArrowLeft className="h-5 w-5" />
                  Back to Archive
                </NavLink>
              </div>
            </div>

            {/* Paper Info Card */}
            <div className="paper-sidebar-section">
              <h3 className="sidebar-heading">Paper Information</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Status:</span>
                  <span
                    className={`info-value status-${paper.status.toLowerCase()}`}
                  >
                    {paper.status}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Review Score:</span>
                  <span className="info-value">{paper.score}/100</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Author ID:</span>
                  <span className="info-value">{paper.authorId}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Reviewer ID:</span>
                  <span className="info-value">{paper.reviewerId}</span>
                </div>
              </div>
            </div>

            {/* Related Papers */}
            <div className="paper-sidebar-section">
              <h3 className="sidebar-heading">Related Papers</h3>
              <div className="related-papers-list">
                {relatedPapers.length > 0 ? (
                  relatedPapers.map((relatedPaper) => (
                    <div
                      key={relatedPaper.id}
                      className="related-paper"
                      onClick={() => handleRelatedPaperClick(relatedPaper.id)}
                    >
                      <div className="related-paper-title">
                        {relatedPaper.title}
                      </div>
                      <div className="related-paper-meta">
                        <span className="related-author">
                          Author {relatedPaper.authorId}
                        </span>
                        <span>Score: {relatedPaper.score}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-related-papers">
                    No related papers found
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
