// import { useState, useEffect } from 'react'
// import SubmissionWizard from './SubmissionWizard'

// interface Submission {
//   id: number
//   title: string
//   date: string
//   status: 'Accepted' | 'Under Review' | 'Rejected'
// }

// const StudentDashboard = () => {
//   const [showWizard, setShowWizard] = useState(false)
//   const [submissions, setSubmissions] = useState<Submission[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   // Fetch submissions from API
//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const token = localStorage.getItem('authToken')
//         if (!token) {
//           setError('Authentication required')
//           setLoading(false)
//           return
//         }

//         const response = await fetch('/api/submissions', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         })

//         if (response.ok) {
//           const data = await response.json()
//           setSubmissions(data)
//         } else {
//           setError('Failed to load submissions')
//         }
//       } catch (err) {
//         setError('Network error')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchSubmissions()
//   }, [])

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Accepted': return '#10B981' // green
//       case 'Under Review': return '#F59E0B' // yellow
//       case 'Rejected': return '#EF4444' // red
//       default: return '#6B7280' // gray
//     }
//   }

//   const getStatusBgColor = (status: string) => {
//     switch (status) {
//       case 'Accepted': return '#D1FAE5' // light green
//       case 'Under Review': return '#FEF3C7' // light yellow
//       case 'Rejected': return '#FEE2E2' // light red
//       default: return '#F3F4F6' // light gray
//     }
//   }

//   if (showWizard) {
//     return <SubmissionWizard onClose={() => setShowWizard(false)} />
//   }

//   return (
//     <div style={{
//       padding: '2rem',
//       backgroundColor: '#F8FAFC',
//       minHeight: '100vh',
//       fontFamily: 'system-ui, -apple-system, sans-serif'
//     }}>
//       {/* Summary Cards */}
//       <div style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//         gap: '1.5rem',
//         marginBottom: '2rem'
//       }}>
//         <div style={{
//           backgroundColor: '#F1F5F9',
//           padding: '1.5rem',
//           borderRadius: '12px',
//           textAlign: 'center',
//           boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//         }}>
//           <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563EB', marginBottom: '0.5rem' }}>
//             5
//           </div>
//           <div style={{ color: '#64748B', fontSize: '1rem' }}>
//             Submissions
//           </div>
//         </div>

//         <div style={{
//           backgroundColor: '#F1F5F9',
//           padding: '1.5rem',
//           borderRadius: '12px',
//           textAlign: 'center',
//           boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//         }}>
//           <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563EB', marginBottom: '0.5rem' }}>
//             2
//           </div>
//           <div style={{ color: '#64748B', fontSize: '1rem' }}>
//             Accepted
//           </div>
//         </div>

//         <div style={{
//           backgroundColor: '#F1F5F9',
//           padding: '1.5rem',
//           borderRadius: '12px',
//           textAlign: 'center',
//           boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//         }}>
//           <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563EB', marginBottom: '0.5rem' }}>
//             2
//           </div>
//           <div style={{ color: '#64748B', fontSize: '1rem' }}>
//             Under Review
//           </div>
//         </div>
//       </div>

//       {/* Submissions Table */}
//       <div style={{
//         backgroundColor: 'white',
//         borderRadius: '12px',
//         padding: '1.5rem',
//         boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
//       }}>
//         {/* Header */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '1.5rem'
//         }}>
//           <h2 style={{
//             fontSize: '1.5rem',
//             fontWeight: 'bold',
//             color: '#2563EB',
//             margin: 0
//           }}>
//             My Submissions
//           </h2>
//           <button
//             onClick={() => setShowWizard(true)}
//             style={{
//               backgroundColor: '#2563EB',
//               color: 'white',
//               border: 'none',
//               padding: '0.75rem 1.5rem',
//               borderRadius: '8px',
//               fontSize: '1rem',
//               fontWeight: '500',
//               cursor: 'pointer',
//               transition: 'background-color 0.2s'
//             }}
//             onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
//             onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
//           >
//             + New Submission
//           </button>
//         </div>

//         {/* Table */}
//         <div style={{ overflowX: 'auto' }}>
//           {loading ? (
//             <div style={{
//               textAlign: 'center',
//               padding: '2rem',
//               color: '#64748B'
//             }}>
//               Loading submissions...
//             </div>
//           ) : error ? (
//             <div style={{
//               textAlign: 'center',
//               padding: '2rem',
//               color: '#DC2626',
//               backgroundColor: '#FEF2F2',
//               borderRadius: '8px',
//               border: '1px solid #FECACA'
//             }}>
//               {error}
//             </div>
//           ) : submissions.length === 0 ? (
//             <div style={{
//               textAlign: 'center',
//               padding: '2rem',
//               color: '#64748B'
//             }}>
//               No submissions yet. Create your first submission!
//             </div>
//           ) : (
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
//                   <th style={{
//                     textAlign: 'left',
//                     padding: '1rem 0',
//                     color: '#64748B',
//                     fontWeight: '600',
//                     fontSize: '0.875rem'
//                   }}>
//                     ID
//                   </th>
//                   <th style={{
//                     textAlign: 'left',
//                     padding: '1rem 0',
//                     color: '#64748B',
//                     fontWeight: '600',
//                     fontSize: '0.875rem'
//                   }}>
//                     Title
//                   </th>
//                   <th style={{
//                     textAlign: 'right',
//                     padding: '1rem 0',
//                     color: '#64748B',
//                     fontWeight: '600',
//                     fontSize: '0.875rem'
//                   }}>
//                     Date
//                   </th>
//                   <th style={{
//                     textAlign: 'right',
//                     padding: '1rem 0',
//                     color: '#64748B',
//                     fontWeight: '600',
//                     fontSize: '0.875rem'
//                   }}>
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submissions.map((submission) => (
//                   <tr key={submission.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
//                     <td style={{
//                       padding: '1rem 0',
//                       color: '#1E293B',
//                       fontWeight: '500'
//                     }}>
//                       {submission.id}
//                     </td>
//                     <td style={{
//                       padding: '1rem 0',
//                       color: '#1E293B'
//                     }}>
//                       {submission.title}
//                     </td>
//                     <td style={{
//                       padding: '1rem 0',
//                       color: '#64748B',
//                       textAlign: 'right'
//                     }}>
//                       {submission.date}
//                     </td>
//                     <td style={{
//                       padding: '1rem 0',
//                       textAlign: 'right'
//                     }}>
//                       <span style={{
//                         backgroundColor: getStatusBgColor(submission.status),
//                         color: getStatusColor(submission.status),
//                         padding: '0.25rem 0.75rem',
//                         borderRadius: '9999px',
//                         fontSize: '0.875rem',
//                         fontWeight: '500'
//                       }}>
//                         {submission.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default StudentDashboard

// 2
// import { useState, useEffect } from "react";
// import SubmissionWizard from "./SubmissionWizard";

// interface Submission {
//   id: number;
//   title: string;
//   date: string;
//   status: "pending" | "under_review" | "accepted" | "rejected" | "published"; // Add 'published' here
// }

// const StudentDashboard = () => {
//   const [showWizard, setShowWizard] = useState(false);
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch submissions from API
//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Authentication required");
//           setLoading(false);
//           return;
//         }

//         const response = await fetch(
//           "https://yrs-api-8.onrender.com/api/papers?mine=true",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           // Transform the API data to match our frontend format
//           const transformedSubmissions = data.map((paper: any) => ({
//             id: paper.id,
//             title: paper.title,
//             date: new Date(paper.createdAt).toLocaleDateString(),
//             status: paper.status || "pending",
//           }));
//           setSubmissions(transformedSubmissions);
//         } else {
//           const errorData = await response.json();
//           setError(errorData.error || "Failed to load submissions");
//         }
//       } catch (err) {
//         setError("Network error. Please check your connection.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubmissions();
//   }, []);

//   const getStatusDisplay = (status: string) => {
//     switch (status) {
//       case "accepted":
//         return "Accepted";
//       case "under_review":
//         return "Under Review";
//       case "rejected":
//         return "Rejected";
//       case "published":
//         return "Published";
//       default:
//         return "Pending";
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "accepted":
//       case "published":
//         return "#10B981"; // green
//       case "under_review":
//         return "#F59E0B"; // yellow
//       case "rejected":
//         return "#EF4444"; // red
//       default:
//         return "#6B7280"; // gray
//     }
//   };

//   const getStatusBgColor = (status: string) => {
//     switch (status) {
//       case "accepted":
//       case "published":
//         return "#D1FAE5"; // light green
//       case "under_review":
//         return "#FEF3C7"; // light yellow
//       case "rejected":
//         return "#FEE2E2"; // light red
//       default:
//         return "#F3F4F6"; // light gray
//     }
//   };

//   // Calculate summary statistics - FIXED THIS SECTION
//   const totalSubmissions = submissions.length;
//   const acceptedSubmissions = submissions.filter(
//     (s) => s.status === "accepted" || s.status === "published"
//   ).length;
//   const underReviewSubmissions = submissions.filter(
//     (s) => s.status === "under_review"
//   ).length;

//   if (showWizard) {
//     return (
//       <SubmissionWizard
//         onClose={() => setShowWizard(false)}
//         onSubmissionSuccess={() => {
//           setShowWizard(false);
//           // Refresh submissions after successful submission
//           window.location.reload();
//         }}
//       />
//     );
//   }

//   return (
//     <div
//       style={{
//         padding: "2rem",
//         backgroundColor: "#F8FAFC",
//         minHeight: "100vh",
//         fontFamily: "system-ui, -apple-system, sans-serif",
//       }}
//     >
//       {/* Summary Cards */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//           gap: "1.5rem",
//           marginBottom: "2rem",
//         }}
//       >
//         <div
//           style={{
//             backgroundColor: "#F1F5F9",
//             padding: "1.5rem",
//             borderRadius: "12px",
//             textAlign: "center",
//             boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <div
//             style={{
//               fontSize: "2.5rem",
//               fontWeight: "bold",
//               color: "#2563EB",
//               marginBottom: "0.5rem",
//             }}
//           >
//             {totalSubmissions}
//           </div>
//           <div style={{ color: "#64748B", fontSize: "1rem" }}>Submissions</div>
//         </div>

//         <div
//           style={{
//             backgroundColor: "#F1F5F9",
//             padding: "1.5rem",
//             borderRadius: "12px",
//             textAlign: "center",
//             boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <div
//             style={{
//               fontSize: "2.5rem",
//               fontWeight: "bold",
//               color: "#2563EB",
//               marginBottom: "0.5rem",
//             }}
//           >
//             {acceptedSubmissions}
//           </div>
//           <div style={{ color: "#64748B", fontSize: "1rem" }}>Accepted</div>
//         </div>

//         <div
//           style={{
//             backgroundColor: "#F1F5F9",
//             padding: "1.5rem",
//             borderRadius: "12px",
//             textAlign: "center",
//             boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <div
//             style={{
//               fontSize: "2.5rem",
//               fontWeight: "bold",
//               color: "#2563EB",
//               marginBottom: "0.5rem",
//             }}
//           >
//             {underReviewSubmissions}
//           </div>
//           <div style={{ color: "#64748B", fontSize: "1rem" }}>Under Review</div>
//         </div>
//       </div>

//       {/* Submissions Table */}
//       <div
//         style={{
//           backgroundColor: "white",
//           borderRadius: "12px",
//           padding: "1.5rem",
//           boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "1.5rem",
//           }}
//         >
//           <h2
//             style={{
//               fontSize: "1.5rem",
//               fontWeight: "bold",
//               color: "#2563EB",
//               margin: 0,
//             }}
//           >
//             My Submissions
//           </h2>
//           <button
//             onClick={() => setShowWizard(true)}
//             style={{
//               backgroundColor: "#2563EB",
//               color: "white",
//               border: "none",
//               padding: "0.75rem 1.5rem",
//               borderRadius: "8px",
//               fontSize: "1rem",
//               fontWeight: "500",
//               cursor: "pointer",
//               transition: "background-color 0.2s",
//             }}
//             onMouseOver={(e) =>
//               (e.currentTarget.style.backgroundColor = "#1D4ED8")
//             }
//             onMouseOut={(e) =>
//               (e.currentTarget.style.backgroundColor = "#2563EB")
//             }
//           >
//             + New Submission
//           </button>
//         </div>

//         {/* Table */}
//         <div style={{ overflowX: "auto" }}>
//           {loading ? (
//             <div
//               style={{
//                 textAlign: "center",
//                 padding: "2rem",
//                 color: "#64748B",
//               }}
//             >
//               Loading submissions...
//             </div>
//           ) : error ? (
//             <div
//               style={{
//                 textAlign: "center",
//                 padding: "2rem",
//                 color: "#DC2626",
//                 backgroundColor: "#FEF2F2",
//                 borderRadius: "8px",
//                 border: "1px solid #FECACA",
//               }}
//             >
//               {error}
//             </div>
//           ) : submissions.length === 0 ? (
//             <div
//               style={{
//                 textAlign: "center",
//                 padding: "2rem",
//                 color: "#64748B",
//               }}
//             >
//               No submissions yet. Create your first submission!
//             </div>
//           ) : (
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
//                   <th
//                     style={{
//                       textAlign: "left",
//                       padding: "1rem 0",
//                       color: "#64748B",
//                       fontWeight: "600",
//                       fontSize: "0.875rem",
//                     }}
//                   >
//                     ID
//                   </th>
//                   <th
//                     style={{
//                       textAlign: "left",
//                       padding: "1rem 0",
//                       color: "#64748B",
//                       fontWeight: "600",
//                       fontSize: "0.875rem",
//                     }}
//                   >
//                     Title
//                   </th>
//                   <th
//                     style={{
//                       textAlign: "right",
//                       padding: "1rem 0",
//                       color: "#64748B",
//                       fontWeight: "600",
//                       fontSize: "0.875rem",
//                     }}
//                   >
//                     Date
//                   </th>
//                   <th
//                     style={{
//                       textAlign: "right",
//                       padding: "1rem 0",
//                       color: "#64748B",
//                       fontWeight: "600",
//                       fontSize: "0.875rem",
//                     }}
//                   >
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submissions.map((submission) => (
//                   <tr
//                     key={submission.id}
//                     style={{ borderBottom: "1px solid #F1F5F9" }}
//                   >
//                     <td
//                       style={{
//                         padding: "1rem 0",
//                         color: "#1E293B",
//                         fontWeight: "500",
//                       }}
//                     >
//                       {submission.id}
//                     </td>
//                     <td
//                       style={{
//                         padding: "1rem 0",
//                         color: "#1E293B",
//                       }}
//                     >
//                       {submission.title}
//                     </td>
//                     <td
//                       style={{
//                         padding: "1rem 0",
//                         color: "#64748B",
//                         textAlign: "right",
//                       }}
//                     >
//                       {submission.date}
//                     </td>
//                     <td
//                       style={{
//                         padding: "1rem 0",
//                         textAlign: "right",
//                       }}
//                     >
//                       <span
//                         style={{
//                           backgroundColor: getStatusBgColor(submission.status),
//                           color: getStatusColor(submission.status),
//                           padding: "0.25rem 0.75rem",
//                           borderRadius: "9999px",
//                           fontSize: "0.875rem",
//                           fontWeight: "500",
//                         }}
//                       >
//                         {getStatusDisplay(submission.status)}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import SubmissionWizard from "./SubmissionWizard";

interface Submission {
  id: number;
  title: string;
  date: string;
  status: "pending" | "under_review" | "accepted" | "rejected" | "published";
  abstract?: string;
  authors?: string;
  institution?: string;
}

const StudentDashboard = () => {
  const navigate = useNavigate(); // Add this hook
  const [showWizard, setShowWizard] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch submissions from API
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        // Try the new endpoint first, fallback to existing one
        let response;

        // Option 1: Try the dedicated "my papers" endpoint
        response = await fetch(
          "https://yrs-api-8.onrender.com/api/papers/my-papers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // If that fails, try getting all papers and filter client-side
        if (!response.ok) {
          response = await fetch(
            "https://yrs-api-8.onrender.com/api/papers?status=all",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        }

        if (response.ok) {
          const data = await response.json();

          // If we got all papers, filter for current user's papers
          let userPapers = data;
          if (response.url.includes("status=all")) {
            // Get current user ID from token
            const payload = JSON.parse(atob(token.split(".")[1]));
            userPapers = data.filter(
              (paper: any) => paper.authorId === payload.id
            );
          }

          // Transform the API data to match our frontend format
          const transformedSubmissions = userPapers.map((paper: any) => ({
            id: paper.id,
            title: paper.title,
            date: new Date(paper.createdAt).toLocaleDateString(),
            status: paper.status || "pending",
            abstract: paper.abstract,
            authors: paper.authors,
            institution: paper.institution,
          }));

          setSubmissions(transformedSubmissions);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to load submissions");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Function to handle paper click
  const handlePaperClick = (paperId: number) => {
    navigate(`/paper/${paperId}`);
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "under_review":
        return "Under Review";
      case "rejected":
        return "Rejected";
      case "published":
        return "Published";
      default:
        return "Pending";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
      case "published":
        return "#10B981"; // green
      case "under_review":
        return "#F59E0B"; // yellow
      case "rejected":
        return "#EF4444"; // red
      default:
        return "#6B7280"; // gray
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "accepted":
      case "published":
        return "#D1FAE5"; // light green
      case "under_review":
        return "#FEF3C7"; // light yellow
      case "rejected":
        return "#FEE2E2"; // light red
      default:
        return "#F3F4F6"; // light gray
    }
  };

  // Calculate summary statistics
  const totalSubmissions = submissions.length;
  const acceptedSubmissions = submissions.filter(
    (s) => s.status === "accepted" || s.status === "published"
  ).length;
  const underReviewSubmissions = submissions.filter(
    (s) => s.status === "under_review"
  ).length;
  const pendingSubmissions = submissions.filter(
    (s) => s.status === "pending"
  ).length;

  if (showWizard) {
    return (
      <SubmissionWizard
        onClose={() => setShowWizard(false)}
        onSubmissionSuccess={() => {
          setShowWizard(false);
          // Refresh submissions after successful submission
          window.location.reload();
        }}
      />
    );
  }

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#F1F5F9",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#2563EB",
              marginBottom: "0.5rem",
            }}
          >
            {totalSubmissions}
          </div>
          <div style={{ color: "#64748B", fontSize: "1rem" }}>
            Total Submissions
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#F1F5F9",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#10B981",
              marginBottom: "0.5rem",
            }}
          >
            {acceptedSubmissions}
          </div>
          <div style={{ color: "#64748B", fontSize: "1rem" }}>
            Accepted/Published
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#F1F5F9",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#F59E0B",
              marginBottom: "0.5rem",
            }}
          >
            {underReviewSubmissions}
          </div>
          <div style={{ color: "#64748B", fontSize: "1rem" }}>Under Review</div>
        </div>

        <div
          style={{
            backgroundColor: "#F1F5F9",
            padding: "1.5rem",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#6B7280",
              marginBottom: "0.5rem",
            }}
          >
            {pendingSubmissions}
          </div>
          <div style={{ color: "#64748B", fontSize: "1rem" }}>Pending</div>
        </div>
      </div>

      {/* Submissions Table */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#2563EB",
              margin: 0,
            }}
          >
            My Submissions ({totalSubmissions})
          </h2>
          <button
            onClick={() => setShowWizard(true)}
            style={{
              backgroundColor: "#2563EB",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#1D4ED8")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563EB")
            }
          >
            + New Submission
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                color: "#64748B",
              }}
            >
              Loading submissions...
            </div>
          ) : error ? (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                color: "#DC2626",
                backgroundColor: "#FEF2F2",
                borderRadius: "8px",
                border: "1px solid #FECACA",
              }}
            >
              {error}
              <div style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
                <button
                  onClick={() => window.location.reload()}
                  style={{
                    backgroundColor: "#DC2626",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Retry
                </button>
              </div>
            </div>
          ) : submissions.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                color: "#64748B",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📝</div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                No submissions yet
              </h3>
              <p style={{ marginBottom: "1.5rem" }}>
                Create your first research paper submission to get started!
              </p>
              <button
                onClick={() => setShowWizard(true)}
                style={{
                  backgroundColor: "#2563EB",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Create First Submission
              </button>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem 0",
                      color: "#64748B",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                    }}
                  >
                    Title
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "1rem 0",
                      color: "#64748B",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                    }}
                  >
                    Institution
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "1rem 0",
                      color: "#64748B",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                    }}
                  >
                    Date Submitted
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "1rem 0",
                      color: "#64748B",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr
                    key={submission.id}
                    style={{
                      borderBottom: "1px solid #F1F5F9",
                      cursor: "pointer", // Make row clickable
                      transition: "background-color 0.2s",
                    }}
                    onClick={() => handlePaperClick(submission.id)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#F8FAFC";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td
                      style={{
                        padding: "1rem 0",
                        color: "#1E293B",
                        fontWeight: "500",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          marginBottom: "0.25rem",
                          color: "#2563EB", // Make title blue to indicate clickable
                          textDecoration: "none",
                        }}
                      >
                        {submission.title}
                      </div>
                      {submission.abstract && (
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: "#64748B",
                            maxWidth: "300px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {submission.abstract}
                        </div>
                      )}
                    </td>
                    <td
                      style={{
                        padding: "1rem 0",
                        color: "#64748B",
                        fontSize: "0.875rem",
                      }}
                    >
                      {submission.institution || "Not specified"}
                    </td>
                    <td
                      style={{
                        padding: "1rem 0",
                        color: "#64748B",
                        textAlign: "right",
                        fontSize: "0.875rem",
                      }}
                    >
                      {submission.date}
                    </td>
                    <td
                      style={{
                        padding: "1rem 0",
                        textAlign: "right",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: getStatusBgColor(submission.status),
                          color: getStatusColor(submission.status),
                          padding: "0.5rem 1rem",
                          borderRadius: "9999px",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          display: "inline-block",
                          minWidth: "120px",
                          textAlign: "center",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click when clicking status
                        }}
                      >
                        {getStatusDisplay(submission.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Instructions for users */}
        {submissions.length > 0 && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              backgroundColor: "#F0F9FF",
              border: "1px solid #BAE6FD",
              borderRadius: "8px",
              fontSize: "0.875rem",
              color: "#0369A1",
              textAlign: "center",
            }}
          >
            💡 Click on any paper to view its details
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
