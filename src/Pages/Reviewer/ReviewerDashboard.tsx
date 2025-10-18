// // export default ReviewerDashboard;
// import { useState, useEffect } from "react";
// import { CardContent } from "@/Components/LandingpageComponenets/card";
// import { Input } from "@/Components/LandingpageComponenets/input";
// import {
//   Search,
//   Filter,
//   FileText,
//   CheckCircle,
//   Clock,
//   AlertCircle,
//   Play,
// } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/Components/LandingpageComponenets/select";

// interface Paper {
//   id: number;
//   title: string;
//   abstract: string;
//   authors: string;
//   institution: string;
//   keywords: string;
//   status: string;
//   reviewerId: number | null;
//   authorId: number;
//   submissionLink: string;
//   contentUrl: string;
//   feedback?: string;
//   score?: number;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ReviewStats {
//   totalAssigned: number;
//   pendingReview: number;
//   completed: number;
//   averageScore: number;
// }

// // Animated Card Component
// const AnimatedCard = ({
//   children,
//   delay = 0,
//   className = "",
// }: {
//   children: React.ReactNode;
//   delay?: number;
//   className?: string;
// }) => (
//   <div
//     className={`bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${className}`}
//     style={{
//       animationDelay: `${delay}s`,
//       animation: `slideUp 0.6s ease-out ${delay}s both`,
//     }}
//   >
//     {children}
//   </div>
// );

// const ReviewerDashboard = () => {
//   const [papers, setPapers] = useState<Paper[]>([]);
//   const [stats, setStats] = useState<ReviewStats>({
//     totalAssigned: 0,
//     pendingReview: 0,
//     completed: 0,
//     averageScore: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
//   const [reviewForm, setReviewForm] = useState({
//     status: "",
//     feedback: "",
//     score: 0,
//   });

//   useEffect(() => {
//     const fetchPapers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Authentication required");
//           setLoading(false);
//           return;
//         }

//         // Get current user info to filter assigned papers
//         const userPayload = JSON.parse(atob(token.split(".")[1]));
//         const currentUserId = userPayload.id;

//         // Fetch all papers (reviewer can see papers assigned to them)
//         const response = await fetch(
//           "https://yrs-api-8.onrender.com/api/papers?status=all",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           // Filter papers assigned to current reviewer
//           const assignedPapers = data.filter(
//             (paper: Paper) =>
//               paper.reviewerId === currentUserId ||
//               paper.status === "under_review"
//           );
//           setPapers(assignedPapers);
//           calculateStats(assignedPapers);
//         } else {
//           setError("Failed to load papers");
//         }
//       } catch (err) {
//         setError("Network error. Please check your connection.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPapers();
//   }, []);

//   const calculateStats = (papers: Paper[]) => {
//     const totalAssigned = papers.length;
//     const pendingReview = papers.filter(
//       (p) => p.status === "under_review" || p.status === "pending"
//     ).length;
//     const completed = papers.filter(
//       (p) => p.status === "accepted" || p.status === "rejected"
//     ).length;
//     const scoredPapers = papers.filter((p) => p.score && p.score > 0);
//     const averageScore =
//       scoredPapers.length > 0
//         ? scoredPapers.reduce((sum, p) => sum + (p.score || 0), 0) /
//           scoredPapers.length
//         : 0;

//     setStats({
//       totalAssigned,
//       pendingReview,
//       completed,
//       averageScore,
//     });
//   };

//   const handleReviewSubmit = async (paperId: number) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `https://yrs-api-8.onrender.com/api/papers/${paperId}/review`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             status: reviewForm.status,
//             feedback: reviewForm.feedback,
//             score: reviewForm.score,
//           }),
//         }
//       );

//       if (response.ok) {
//         // Update local state
//         const updatedPapers = papers.map((paper) =>
//           paper.id === paperId
//             ? {
//                 ...paper,
//                 status: reviewForm.status,
//                 feedback: reviewForm.feedback,
//                 score: reviewForm.score,
//               }
//             : paper
//         );
//         setPapers(updatedPapers);
//         calculateStats(updatedPapers);
//         setSelectedPaper(null);
//         setReviewForm({ status: "", feedback: "", score: 0 });
//         alert("Review submitted successfully!");
//       } else {
//         alert("Failed to submit review");
//       }
//     } catch (err) {
//       alert("Network error. Please try again.");
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "accepted":
//         return "text-emerald-600 bg-emerald-50 border-emerald-200";
//       case "rejected":
//         return "text-rose-600 bg-rose-50 border-rose-200";
//       case "under_review":
//         return "text-amber-600 bg-amber-50 border-amber-200";
//       case "pending":
//         return "text-blue-600 bg-blue-50 border-blue-200";
//       default:
//         return "text-gray-600 bg-gray-50 border-gray-200";
//     }
//   };

//   const getStatusDisplay = (status: string) => {
//     return status
//       .split("_")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ");
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "accepted":
//         return <CheckCircle className="h-4 w-4" />;
//       case "rejected":
//         return <AlertCircle className="h-4 w-4" />;
//       case "under_review":
//         return <Clock className="h-4 w-4" />;
//       default:
//         return <FileText className="h-4 w-4" />;
//     }
//   };

//   const filteredPapers = papers.filter((paper) => {
//     const matchesSearch =
//       paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       paper.authors.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || paper.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   // Get pending papers for the review queue
//   const pendingPapers = papers.filter(
//     (p) => p.status === "under_review" || p.status === "pending"
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
//         <div className="max-w-6xl mx-auto p-6">
//           <div className="flex items-center justify-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
//       {/* Add CSS animations */}
//       <style>{`
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>

//       <div className="max-w-6xl mx-auto p-6 space-y-6">
//         {/* Header */}
//         <div className="text-center md:text-left">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Reviewer Dashboard
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Manage your paper reviews efficiently
//           </p>
//         </div>

//         {error && (
//           <AnimatedCard className="bg-rose-50 border-rose-200">
//             <CardContent className="p-4 text-rose-700 text-center">
//               <AlertCircle className="h-5 w-5 mx-auto mb-2" />
//               {error}
//             </CardContent>
//           </AnimatedCard>
//         )}

//         {/* Stats Cards */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <AnimatedCard delay={0.1}>
//             <CardContent className="p-6">
//               <div className="text-3xl font-bold text-primary">
//                 {stats.pendingReview}
//               </div>
//               <div className="text-sm text-gray-600 mt-1">Pending Reviews</div>
//               <div className="w-12 h-1 bg-primary rounded-full mt-2"></div>
//             </CardContent>
//           </AnimatedCard>

//           <AnimatedCard delay={0.15}>
//             <CardContent className="p-6">
//               <div className="text-3xl font-bold text-primary">
//                 {stats.completed}
//               </div>
//               <div className="text-sm text-gray-600 mt-1">Completed</div>
//               <div className="w-12 h-1 bg-emerald-500 rounded-full mt-2"></div>
//             </CardContent>
//           </AnimatedCard>

//           <AnimatedCard delay={0.2}>
//             <CardContent className="p-6">
//               <div className="text-3xl font-bold text-primary">
//                 {stats.totalAssigned}
//               </div>
//               <div className="text-sm text-gray-600 mt-1">Total Assigned</div>
//               <div className="w-12 h-1 bg-blue-500 rounded-full mt-2"></div>
//             </CardContent>
//           </AnimatedCard>

//           <AnimatedCard delay={0.25}>
//             <CardContent className="p-6">
//               <div className="text-3xl font-bold text-primary">
//                 {stats.averageScore.toFixed(1)}
//               </div>
//               <div className="text-sm text-gray-600 mt-1">Avg. Score</div>
//               <div className="w-12 h-1 bg-amber-500 rounded-full mt-2"></div>
//             </CardContent>
//           </AnimatedCard>
//         </div>

//         {/* Search and Filter */}
//         <AnimatedCard delay={0.3}>
//           <CardContent className="p-6">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search papers by title or authors..."
//                   className="pl-10 text-gray-900 border-gray-300 focus:border-primary"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-full sm:w-[180px] text-gray-900 border-gray-300 focus:border-primary">
//                   <Filter className="h-4 w-4 mr-2" />
//                   <SelectValue placeholder="Filter by status" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-white border-gray-200">
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="under_review">In Review</SelectItem>
//                   <SelectItem value="accepted">Accepted</SelectItem>
//                   <SelectItem value="rejected">Rejected</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </AnimatedCard>

//         {/* Review Queue */}
//         {pendingPapers.length > 0 && (
//           <AnimatedCard delay={0.35}>
//             <CardContent className="p-6">
//               <div className="font-semibold text-primary mb-4 text-lg">
//                 Review Queue
//               </div>
//               <div className="space-y-4">
//                 {pendingPapers.slice(0, 5).map((paper, index) => (
//                   <div
//                     key={paper.id}
//                     className="p-4 rounded-xl border border-gray-200 bg-white hover:bg-blue-50/40 transition-all duration-300 hover:border-primary/30"
//                     style={{
//                       animationDelay: `${0.4 + index * 0.1}s`,
//                       animation: `slideUp 0.5s ease-out ${
//                         0.4 + index * 0.1
//                       }s both`,
//                     }}
//                   >
//                     <div className="flex justify-between items-start mb-2">
//                       <div className="font-medium text-gray-900 text-sm leading-relaxed flex-1 pr-4">
//                         {paper.title}
//                       </div>
//                       <span
//                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                           paper.status
//                         )} border`}
//                       >
//                         {getStatusIcon(paper.status)}
//                         <span className="ml-1">
//                           {getStatusDisplay(paper.status)}
//                         </span>
//                       </span>
//                     </div>
//                     <div className="text-xs text-gray-600 mb-3 leading-relaxed">
//                       {paper.abstract?.slice(0, 120) || "No abstract available"}
//                       ...
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <div className="text-xs text-gray-500">
//                         By {paper.authors}
//                       </div>
//                       <button
//                         onClick={() => {
//                           setSelectedPaper(paper);
//                           setReviewForm({
//                             status: paper.status,
//                             feedback: paper.feedback || "",
//                             score: paper.score || 0,
//                           });
//                         }}
//                         className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
//                       >
//                         <Play className="h-3 w-3" />
//                         Start Review
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </AnimatedCard>
//         )}

//         {/* All Papers Section */}
//         <AnimatedCard delay={0.4}>
//           <CardContent className="p-6">
//             <div className="font-semibold text-primary mb-4 text-lg">
//               All Assigned Papers
//             </div>
//             <div className="space-y-4">
//               {filteredPapers.map((paper, index) => (
//                 <div
//                   key={paper.id}
//                   className="p-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50/80 transition-all duration-300"
//                   style={{
//                     animationDelay: `${0.45 + index * 0.05}s`,
//                     animation: `slideUp 0.4s ease-out ${
//                       0.45 + index * 0.05
//                     }s both`,
//                   }}
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex-1">
//                       <div className="font-medium text-gray-900 text-sm mb-1">
//                         {paper.title}
//                       </div>
//                       <div className="text-xs text-gray-600 mb-2">
//                         By {paper.authors}
//                       </div>
//                       {paper.abstract && (
//                         <div className="text-xs text-gray-500 leading-relaxed">
//                           {paper.abstract.slice(0, 100)}...
//                         </div>
//                       )}
//                     </div>
//                     <div className="flex flex-col items-end gap-2 ml-4">
//                       <span
//                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
//                           paper.status
//                         )} border`}
//                       >
//                         {getStatusIcon(paper.status)}
//                         <span className="ml-1">
//                           {getStatusDisplay(paper.status)}
//                         </span>
//                       </span>
//                       {paper.score && (
//                         <div className="text-xs font-medium text-emerald-600">
//                           Score: {paper.score}/10
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center pt-3 border-t border-gray-100">
//                     <div className="text-xs text-gray-500">
//                       Submitted:{" "}
//                       {new Date(paper.createdAt).toLocaleDateString()}
//                     </div>
//                     <div className="flex gap-2">
//                       <a
//                         href={paper.submissionLink || paper.contentUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-xs text-primary hover:text-primary/80 font-medium"
//                       >
//                         View Paper
//                       </a>
//                       <button
//                         onClick={() => {
//                           setSelectedPaper(paper);
//                           setReviewForm({
//                             status: paper.status,
//                             feedback: paper.feedback || "",
//                             score: paper.score || 0,
//                           });
//                         }}
//                         className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
//                       >
//                         {paper.status === "under_review" ||
//                         paper.status === "pending"
//                           ? "Review"
//                           : "Update"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {filteredPapers.length === 0 && (
//               <div className="text-center py-8 text-gray-500">
//                 <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
//                 <p>No papers found matching your criteria</p>
//               </div>
//             )}
//           </CardContent>
//         </AnimatedCard>

//         {/* Review Modal */}
//         {selectedPaper && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
//             <AnimatedCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-gray-900">
//                     Review Paper
//                   </h3>
//                   <button
//                     onClick={() => setSelectedPaper(null)}
//                     className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     <AlertCircle className="h-5 w-5 text-gray-500" />
//                   </button>
//                 </div>

//                 <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//                   <h4 className="font-semibold text-gray-900 mb-2">
//                     {selectedPaper.title}
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     By {selectedPaper.authors}
//                   </p>
//                 </div>

//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                       Review Decision
//                     </label>
//                     <Select
//                       value={reviewForm.status}
//                       onValueChange={(value) =>
//                         setReviewForm((prev) => ({ ...prev, status: value }))
//                       }
//                     >
//                       <SelectTrigger className="w-full text-gray-900 border-gray-300 focus:border-primary">
//                         <SelectValue placeholder="Select your decision" />
//                       </SelectTrigger>
//                       <SelectContent className="bg-white border-gray-200">
//                         <SelectItem
//                           value="accepted"
//                           className="text-emerald-600"
//                         >
//                           Accept Paper
//                         </SelectItem>
//                         <SelectItem value="rejected" className="text-rose-600">
//                           Reject Paper
//                         </SelectItem>
//                         <SelectItem
//                           value="under_review"
//                           className="text-amber-600"
//                         >
//                           Needs Revision
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                       Score (1-10)
//                     </label>
//                     <Select
//                       value={reviewForm.score.toString()}
//                       onValueChange={(value) =>
//                         setReviewForm((prev) => ({
//                           ...prev,
//                           score: parseInt(value),
//                         }))
//                       }
//                     >
//                       <SelectTrigger className="w-full text-gray-900 border-gray-300 focus:border-primary">
//                         <SelectValue placeholder="Select quality score" />
//                       </SelectTrigger>
//                       <SelectContent className="bg-white border-gray-200">
//                         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
//                           <SelectItem
//                             key={score}
//                             value={score.toString()}
//                             className={
//                               score >= 8
//                                 ? "text-emerald-600"
//                                 : score >= 5
//                                 ? "text-amber-600"
//                                 : "text-rose-600"
//                             }
//                           >
//                             {score}{" "}
//                             {score >= 8 ? "🌟" : score >= 5 ? "⭐" : "📝"}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-3">
//                       Detailed Feedback
//                     </label>
//                     <textarea
//                       value={reviewForm.feedback}
//                       onChange={(e) =>
//                         setReviewForm((prev) => ({
//                           ...prev,
//                           feedback: e.target.value,
//                         }))
//                       }
//                       placeholder="Provide constructive feedback for the author..."
//                       rows={6}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 resize-none"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
//                   <button
//                     onClick={() => setSelectedPaper(null)}
//                     className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => handleReviewSubmit(selectedPaper.id)}
//                     disabled={!reviewForm.status || !reviewForm.feedback.trim()}
//                     className="px-8 py-3 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Submit Review
//                   </button>
//                 </div>
//               </CardContent>
//             </AnimatedCard>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewerDashboard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardContent } from "@/Components/LandingpageComponenets/card";
import { Input } from "@/Components/LandingpageComponenets/input";
import {
  Search,
  Filter,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Play,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/LandingpageComponenets/select";

interface Paper {
  id: number;
  title: string;
  abstract: string;
  authors: string;
  institution: string;
  keywords: string;
  status: string;
  reviewerId: number | null;
  authorId: number;
  submissionLink: string;
  contentUrl: string;
  feedback?: string;
  score?: number;
  createdAt: string;
  updatedAt: string;
}

interface ReviewStats {
  totalAssigned: number;
  pendingReview: number;
  completed: number;
  averageScore: number;
}

// Animated Card Component
const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animation: `slideUp 0.6s ease-out ${delay}s both`,
    }}
  >
    {children}
  </div>
);

const ReviewerDashboard = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    totalAssigned: 0,
    pendingReview: 0,
    completed: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [reviewForm, setReviewForm] = useState({
    status: "",
    feedback: "",
    score: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        // Get current user info to filter assigned papers
        const userPayload = JSON.parse(atob(token.split(".")[1]));
        const currentUserId = userPayload.id;

        // Fetch all papers (reviewer can see papers assigned to them)
        const response = await fetch(
          "https://yrs-api-8.onrender.com/api/papers?status=all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Filter papers assigned to current reviewer
          const assignedPapers = data.filter(
            (paper: Paper) =>
              paper.reviewerId === currentUserId ||
              paper.status === "under_review"
          );
          setPapers(assignedPapers);
          calculateStats(assignedPapers);
        } else {
          setError("Failed to load papers");
        }
      } catch (err) {
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const calculateStats = (papers: Paper[]) => {
    const totalAssigned = papers.length;
    const pendingReview = papers.filter(
      (p) => p.status === "under_review" || p.status === "pending"
    ).length;
    const completed = papers.filter(
      (p) => p.status === "accepted" || p.status === "rejected"
    ).length;
    const scoredPapers = papers.filter((p) => p.score && p.score > 0);
    const averageScore =
      scoredPapers.length > 0
        ? scoredPapers.reduce((sum, p) => sum + (p.score || 0), 0) /
          scoredPapers.length
        : 0;

    setStats({
      totalAssigned,
      pendingReview,
      completed,
      averageScore,
    });
  };

  const handleReviewSubmit = async (paperId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://yrs-api-8.onrender.com/api/papers/${paperId}/review`,
        {
          method: "POST", // Changed from PUT to POST to match your route
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: reviewForm.status,
            feedback: reviewForm.feedback,
            score: reviewForm.score,
            reviewerId: JSON.parse(atob(token!.split(".")[1])).id,
          }),
        }
      );

      if (response.ok) {
        // Update local state
        const updatedPapers = papers.map((paper) =>
          paper.id === paperId
            ? {
                ...paper,
                status: reviewForm.status,
                feedback: reviewForm.feedback,
                score: reviewForm.score,
              }
            : paper
        );
        setPapers(updatedPapers);
        calculateStats(updatedPapers);
        setSelectedPaper(null);
        setReviewForm({ status: "", feedback: "", score: 0 });
        alert("Review submitted successfully!");
      } else {
        alert("Failed to submit review");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "rejected":
        return "text-rose-600 bg-rose-50 border-rose-200";
      case "under_review":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "pending":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusDisplay = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4" />;
      case "under_review":
        return <Clock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || paper.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get pending papers for the review queue
  const pendingPapers = papers.filter(
    (p) => p.status === "under_review" || p.status === "pending"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Add CSS animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">
            Reviewer Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your paper reviews efficiently
          </p>
        </div>

        {error && (
          <AnimatedCard className="bg-rose-50 border-rose-200">
            <CardContent className="p-4 text-rose-700 text-center">
              <AlertCircle className="h-5 w-5 mx-auto mb-2" />
              {error}
            </CardContent>
          </AnimatedCard>
        )}

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedCard delay={0.1}>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary">
                {stats.pendingReview}
              </div>
              <div className="text-sm text-gray-600 mt-1">Pending Reviews</div>
              <div className="w-12 h-1 bg-primary rounded-full mt-2"></div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.15}>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary">
                {stats.completed}
              </div>
              <div className="text-sm text-gray-600 mt-1">Completed</div>
              <div className="w-12 h-1 bg-emerald-500 rounded-full mt-2"></div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary">
                {stats.totalAssigned}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Assigned</div>
              <div className="w-12 h-1 bg-blue-500 rounded-full mt-2"></div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.25}>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary">
                {stats.averageScore.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Avg. Score</div>
              <div className="w-12 h-1 bg-amber-500 rounded-full mt-2"></div>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Search and Filter */}
        <AnimatedCard delay={0.3}>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search papers by title or authors..."
                  className="pl-10 text-gray-900 border-gray-300 focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] text-gray-900 border-gray-300 focus:border-primary">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">In Review</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Review Queue */}
        {pendingPapers.length > 0 && (
          <AnimatedCard delay={0.35}>
            <CardContent className="p-6">
              <div className="font-semibold text-primary mb-4 text-lg">
                Review Queue
              </div>
              <div className="space-y-4">
                {pendingPapers.slice(0, 5).map((paper, index) => (
                  <div
                    key={paper.id}
                    className="p-4 rounded-xl border border-gray-200 bg-white hover:bg-blue-50/40 transition-all duration-300 hover:border-primary/30"
                    style={{
                      animationDelay: `${0.4 + index * 0.1}s`,
                      animation: `slideUp 0.5s ease-out ${
                        0.4 + index * 0.1
                      }s both`,
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-gray-900 text-sm leading-relaxed flex-1 pr-4">
                        {paper.title}
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          paper.status
                        )} border`}
                      >
                        {getStatusIcon(paper.status)}
                        <span className="ml-1">
                          {getStatusDisplay(paper.status)}
                        </span>
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-3 leading-relaxed">
                      {paper.abstract?.slice(0, 120) || "No abstract available"}
                      ...
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        By {paper.authors}
                      </div>
                      <button
                        onClick={() => navigate(`/review/${paper.id}`)}
                        className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                      >
                        <Play className="h-3 w-3" />
                        Start Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>
        )}

        {/* All Papers Section */}
        <AnimatedCard delay={0.4}>
          <CardContent className="p-6">
            <div className="font-semibold text-primary mb-4 text-lg">
              All Assigned Papers
            </div>
            <div className="space-y-4">
              {filteredPapers.map((paper, index) => (
                <div
                  key={paper.id}
                  className="p-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50/80 transition-all duration-300"
                  style={{
                    animationDelay: `${0.45 + index * 0.05}s`,
                    animation: `slideUp 0.4s ease-out ${
                      0.45 + index * 0.05
                    }s both`,
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm mb-1">
                        {paper.title}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        By {paper.authors}
                      </div>
                      {paper.abstract && (
                        <div className="text-xs text-gray-500 leading-relaxed">
                          {paper.abstract.slice(0, 100)}...
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          paper.status
                        )} border`}
                      >
                        {getStatusIcon(paper.status)}
                        <span className="ml-1">
                          {getStatusDisplay(paper.status)}
                        </span>
                      </span>
                      {paper.score && (
                        <div className="text-xs font-medium text-emerald-600">
                          Score: {paper.score}/100
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      Submitted:{" "}
                      {new Date(paper.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={paper.submissionLink || paper.contentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:text-primary/80 font-medium"
                      >
                        View Paper
                      </a>
                      <button
                        onClick={() => {
                          setSelectedPaper(paper);
                          setReviewForm({
                            status: paper.status,
                            feedback: paper.feedback || "",
                            score: paper.score || 0,
                          });
                        }}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        {paper.status === "under_review" ||
                        paper.status === "pending"
                          ? "Review"
                          : "Update"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredPapers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p>No papers found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </AnimatedCard>

        {/* Review Modal */}
        {selectedPaper && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <AnimatedCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Review Paper
                  </h3>
                  <button
                    onClick={() => setSelectedPaper(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <AlertCircle className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {selectedPaper.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    By {selectedPaper.authors}
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Review Decision
                    </label>
                    <Select
                      value={reviewForm.status}
                      onValueChange={(value) =>
                        setReviewForm((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger className="w-full text-gray-900 border-gray-300 focus:border-primary">
                        <SelectValue placeholder="Select your decision" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        <SelectItem
                          value="accepted"
                          className="text-emerald-600"
                        >
                          Accept Paper
                        </SelectItem>
                        <SelectItem value="rejected" className="text-rose-600">
                          Reject Paper
                        </SelectItem>
                        <SelectItem
                          value="under_review"
                          className="text-amber-600"
                        >
                          Needs Revision
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Score (1-100)
                    </label>
                    <Select
                      value={reviewForm.score.toString()}
                      onValueChange={(value) =>
                        setReviewForm((prev) => ({
                          ...prev,
                          score: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger className="w-full text-gray-900 border-gray-300 focus:border-primary">
                        <SelectValue placeholder="Select quality score" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(
                          (score) => (
                            <SelectItem
                              key={score}
                              value={score.toString()}
                              className={
                                score >= 80
                                  ? "text-emerald-600"
                                  : score >= 50
                                  ? "text-amber-600"
                                  : "text-rose-600"
                              }
                            >
                              {score}{" "}
                              {score >= 80 ? "🌟" : score >= 50 ? "⭐" : "📝"}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Detailed Feedback
                    </label>
                    <textarea
                      value={reviewForm.feedback}
                      onChange={(e) =>
                        setReviewForm((prev) => ({
                          ...prev,
                          feedback: e.target.value,
                        }))
                      }
                      placeholder="Provide constructive feedback for the author..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedPaper(null)}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReviewSubmit(selectedPaper.id)}
                    disabled={!reviewForm.status || !reviewForm.feedback.trim()}
                    className="px-8 py-3 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </CardContent>
            </AnimatedCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewerDashboard;
