// // // import { useState, useEffect } from "react";
// // // import {
// // //   Card,
// // //   CardContent,
// // //   CardHeader,
// // //   CardTitle,
// // // } from "@/Components/LandingpageComponenets/card";
// // // import { Users, FileText, CheckCircle, UserCheck } from "lucide-react";

// // // interface StatsData {
// // //   totalUsers: number;
// // //   totalSubmissions: number;
// // //   acceptanceRate: number;
// // //   submissionsPerMonth: Array<{ month: string; count: number }>;
// // //   statusDistribution: Record<string, number>;
// // // }

// // // interface Activity {
// // //   id: number;
// // //   action: string;
// // //   user: string;
// // //   time: string;
// // // }

// // // const Dashboard = () => {
// // //   const [stats, setStats] = useState<StatsData | null>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");

// // //   useEffect(() => {
// // //     const fetchStats = async () => {
// // //       try {
// // //         const token = localStorage.getItem("token");
// // //         if (!token) {
// // //           setError("Authentication required");
// // //           setLoading(false);
// // //           return;
// // //         }

// // //         const response = await fetch(
// // //           "https://yrs-api-8.onrender.com/api/admin/stats",
// // //           {
// // //             headers: {
// // //               Authorization: `Bearer ${token}`,
// // //             },
// // //           }
// // //         );

// // //         if (response.ok) {
// // //           const data = await response.json();
// // //           setStats(data);
// // //         } else {
// // //           setError("Failed to load dashboard statistics");
// // //         }
// // //       } catch (err) {
// // //         setError("Network error. Please check your connection.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchStats();
// // //   }, []);

// // //   // Generate recent activities based on actual data
// // //   const recentActivities: Activity[] = [
// // //     {
// // //       id: 1,
// // //       action: `System has ${stats?.totalUsers || 0} total users`,
// // //       user: "System",
// // //       time: "Just now",
// // //     },
// // //     {
// // //       id: 2,
// // //       action: `${stats?.totalSubmissions || 0} total submissions processed`,
// // //       user: "System",
// // //       time: "Just now",
// // //     },
// // //     {
// // //       id: 3,
// // //       action: `Acceptance rate: ${
// // //         stats ? (stats.acceptanceRate * 100).toFixed(1) : 0
// // //       }%`,
// // //       user: "System",
// // //       time: "Just now",
// // //     },
// // //   ];

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50">
// // //         <div className="max-w-7xl mx-auto p-6">
// // //           <div className="text-center">Loading dashboard...</div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <div className="max-w-7xl mx-auto p-6 space-y-6">
// // //         <div>
// // //           <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
// // //           <p className="text-gray-600 mt-1">
// // //             Overview of your research management system
// // //           </p>
// // //         </div>

// // //         {error ? (
// // //           <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
// // //             {error}
// // //           </div>
// // //         ) : (
// // //           <>
// // //             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
// // //               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // //                 <div className="flex items-center">
// // //                   <div className="p-2 rounded-full bg-blue-100">
// // //                     <Users className="h-6 w-6 text-blue-600" />
// // //                   </div>
// // //                   <div className="ml-4">
// // //                     <p className="text-sm font-medium text-gray-600">
// // //                       Total Users
// // //                     </p>
// // //                     <p className="text-2xl font-bold text-gray-900">
// // //                       {stats?.totalUsers || 0}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // //                 <div className="flex items-center">
// // //                   <div className="p-2 rounded-full bg-orange-100">
// // //                     <FileText className="h-6 w-6 text-orange-600" />
// // //                   </div>
// // //                   <div className="ml-4">
// // //                     <p className="text-sm font-medium text-gray-600">
// // //                       Total Submissions
// // //                     </p>
// // //                     <p className="text-2xl font-bold text-gray-900">
// // //                       {stats?.totalSubmissions || 0}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // //                 <div className="flex items-center">
// // //                   <div className="p-2 rounded-full bg-green-100">
// // //                     <CheckCircle className="h-6 w-6 text-green-600" />
// // //                   </div>
// // //                   <div className="ml-4">
// // //                     <p className="text-sm font-medium text-gray-600">
// // //                       Acceptance Rate
// // //                     </p>
// // //                     <p className="text-2xl font-bold text-gray-900">
// // //                       {stats ? (stats.acceptanceRate * 100).toFixed(1) : 0}%
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
// // //                 <div className="flex items-center">
// // //                   <div className="p-2 rounded-full bg-purple-100">
// // //                     <UserCheck className="h-6 w-6 text-purple-600" />
// // //                   </div>
// // //                   <div className="ml-4">
// // //                     <p className="text-sm font-medium text-gray-600">
// // //                       Status Distribution
// // //                     </p>
// // //                     <p className="text-2xl font-bold text-gray-900">
// // //                       {stats ? Object.keys(stats.statusDistribution).length : 0}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="grid gap-6 md:grid-cols-2">
// // //               {/* Status Distribution */}
// // //               <Card className="shadow-sm border border-gray-200">
// // //                 <CardHeader>
// // //                   <CardTitle className="text-gray-900">
// // //                     Submission Status
// // //                   </CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent>
// // //                   <div className="space-y-3">
// // //                     {stats?.statusDistribution ? (
// // //                       Object.entries(stats.statusDistribution).map(
// // //                         ([status, count]) => (
// // //                           <div
// // //                             key={status}
// // //                             className="flex justify-between items-center"
// // //                           >
// // //                             <span className="text-sm font-medium text-gray-700 capitalize">
// // //                               {status.replace("_", " ")}
// // //                             </span>
// // //                             <span className="text-sm text-gray-600">
// // //                               {count}
// // //                             </span>
// // //                           </div>
// // //                         )
// // //                       )
// // //                     ) : (
// // //                       <div className="text-center text-gray-500 py-4">
// // //                         No data available
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>

// // //               {/* Recent Activity */}
// // //               <Card className="shadow-sm border border-gray-200">
// // //                 <CardHeader>
// // //                   <CardTitle className="text-gray-900">
// // //                     Recent Activity
// // //                   </CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent>
// // //                   <div className="space-y-4">
// // //                     {recentActivities.map((activity) => (
// // //                       <div
// // //                         key={activity.id}
// // //                         className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0"
// // //                       >
// // //                         <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
// // //                         <div className="flex-1">
// // //                           <p className="text-sm font-medium text-gray-900">
// // //                             {activity.action}
// // //                           </p>
// // //                           <p className="text-xs text-gray-500">
// // //                             by {activity.user} • {activity.time}
// // //                           </p>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>
// // //             </div>

// // //             {/* Monthly Submissions Chart */}
// // //             <Card className="shadow-sm border border-gray-200">
// // //               <CardHeader>
// // //                 <CardTitle className="text-gray-900">
// // //                   Submissions Per Month (Last 6 Months)
// // //                 </CardTitle>
// // //               </CardHeader>
// // //               <CardContent>
// // //                 {stats?.submissionsPerMonth &&
// // //                 stats.submissionsPerMonth.length > 0 ? (
// // //                   <div className="space-y-2">
// // //                     {stats.submissionsPerMonth.map((monthData) => (
// // //                       <div
// // //                         key={monthData.month}
// // //                         className="flex items-center justify-between"
// // //                       >
// // //                         <span className="text-sm font-medium text-gray-700">
// // //                           {monthData.month}
// // //                         </span>
// // //                         <div className="flex items-center gap-2">
// // //                           <div className="w-32 bg-gray-200 rounded-full h-2">
// // //                             <div
// // //                               className="bg-blue-600 h-2 rounded-full"
// // //                               style={{
// // //                                 width: `${
// // //                                   (monthData.count /
// // //                                     Math.max(
// // //                                       ...stats.submissionsPerMonth.map(
// // //                                         (m) => m.count
// // //                                       )
// // //                                     )) *
// // //                                   100
// // //                                 }%`,
// // //                               }}
// // //                             />
// // //                           </div>
// // //                           <span className="text-sm text-gray-600 w-8">
// // //                             {monthData.count}
// // //                           </span>
// // //                         </div>
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 ) : (
// // //                   <div className="text-center text-gray-500 py-4">
// // //                     No submission data available
// // //                   </div>
// // //                 )}
// // //               </CardContent>
// // //             </Card>
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// import React, { useState, useEffect } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// // Types
// interface User {
//   id?: number;
//   userId?: number;
//   name: string;
//   email: string;
//   role: "student" | "reviewer" | "admin";
//   isActive: boolean;
//   status?: string;
// }

// interface Paper {
//   id: number;
//   title: string;
//   author?: string;
//   authors?: string;
//   authorId?: number;
//   status:
//     | "accepted"
//     | "rejected"
//     | "under_review"
//     | "review"
//     | "unpublished"
//     | "pending";
//   reviewerId?: number;
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface Stats {
//   totalUsers: number;
//   totalSubmissions: number;
//   acceptanceRate: number;
//   submissionsOverTime: Array<{ month: string; submissions: number }>;
//   statusDistribution: {
//     accepted: number;
//     review: number;
//     rejected: number;
//     unpublished?: number;
//   };
// }

// interface ChartData {
//   name: string;
//   value: number;
// }

// interface SubmissionTimeData {
//   month: string;
//   submissions: number;
// }

// interface AnimatedCardProps {
//   children: React.ReactNode;
//   delay?: number;
//   className?: string;
// }

// // AnimatedCard Component
// const AnimatedCard: React.FC<AnimatedCardProps> = ({
//   children,
//   delay = 0,
//   className = "",
// }) => {
//   return (
//     <div
//       className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 ${className}`}
//       style={{
//         animationDelay: `${delay}s`,
//         animation: "fadeInUp 0.6s ease-out forwards",
//       }}
//     >
//       {children}
//     </div>
//   );
// };

// // Main AdminDashboard Component
// const AdminDashboard: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [papers, setPapers] = useState<Paper[]>([]);
//   const [stats, setStats] = useState<Stats>({
//     totalUsers: 0,
//     totalSubmissions: 0,
//     acceptanceRate: 0,
//     submissionsOverTime: [],
//     statusDistribution: {
//       accepted: 0,
//       review: 0,
//       rejected: 0,
//       unpublished: 0,
//     },
//   });
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
//   const [showAssignmentModal, setShowAssignmentModal] =
//     useState<boolean>(false);
//   const [error, setError] = useState<string>("");

//   const COLORS = ["#2F9E44", "#F4C430", "#D64545"];
//   const API_BASE = "https://yrs-api-8.onrender.com/api";

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async (): Promise<void> => {
//     try {
//       setLoading(true);
//       setError("");
//       const token = localStorage.getItem("token");

//       const headers: HeadersInit = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers.Authorization = `Bearer ${token}`;
//       }

//       // Fetch papers
//       const papersResponse = await fetch(`${API_BASE}/papers?status=all`, {
//         headers,
//       });

//       if (!papersResponse.ok) {
//         throw new Error(`Failed to fetch papers: ${papersResponse.status}`);
//       }

//       const papersData: Paper[] = await papersResponse.json();

//       // Fetch users
//       let usersData: User[] = [];
//       try {
//         const usersResponse = await fetch(`${API_BASE}/admin/users`, {
//           headers,
//         });
//         if (usersResponse.ok) {
//           const usersResult = await usersResponse.json();
//           usersData = usersResult.users || [];
//         } else {
//           usersData = getMockUsers();
//         }
//       } catch (userError) {
//         console.warn("Failed to fetch users, using mock data:", userError);
//         usersData = getMockUsers();
//       }

//       const calculatedStats = calculateStats(papersData, usersData);

//       setPapers(papersData);
//       setUsers(usersData);
//       setStats(calculatedStats);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error instanceof Error ? error.message : "Failed to fetch data");
//       // Fallback to mock data
//       setPapers([]);
//       setUsers(getMockUsers());
//       setStats(calculateStats([], getMockUsers()));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getMockUsers = (): User[] => {
//     return [
//       {
//         userId: 1,
//         name: "Daniel M.",
//         email: "daniel@email.com",
//         role: "student",
//         isActive: true,
//       },
//       {
//         userId: 2,
//         name: "Selam A.",
//         email: "selam@email.com",
//         role: "reviewer",
//         isActive: true,
//       },
//       {
//         userId: 3,
//         name: "Marta G.",
//         email: "marta@email.com",
//         role: "student",
//         isActive: false,
//       },
//     ];
//   };

//   const calculateStats = (papersData: Paper[], usersData: User[]): Stats => {
//     const totalSubmissions = papersData.length;
//     const accepted = papersData.filter(
//       (p: Paper) => p.status === "accepted"
//     ).length;
//     const acceptanceRate = totalSubmissions
//       ? (accepted / totalSubmissions) * 100
//       : 0;

//     const statusDistribution = {
//       accepted: papersData.filter((p: Paper) => p.status === "accepted").length,
//       review: papersData.filter(
//         (p: Paper) => p.status === "under_review" || p.status === "review"
//       ).length,
//       rejected: papersData.filter((p: Paper) => p.status === "rejected").length,
//       unpublished: papersData.filter(
//         (p: Paper) =>
//           !p.status || p.status === "unpublished" || p.status === "pending"
//       ).length,
//     };

//     const submissionsOverTime: SubmissionTimeData[] = [
//       { month: "Apr", submissions: 4 },
//       { month: "May", submissions: 6 },
//       { month: "Jun", submissions: 3 },
//       { month: "Jul", submissions: 5 },
//       { month: "Aug", submissions: 8 },
//     ];

//     return {
//       totalUsers: usersData.length,
//       totalSubmissions,
//       acceptanceRate,
//       submissionsOverTime,
//       statusDistribution,
//     };
//   };

//   const handleAssignReviewer = async (
//     paperId: number,
//     reviewerId: number
//   ): Promise<void> => {
//     try {
//       const token = localStorage.getItem("token");
//       const headers: HeadersInit = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers.Authorization = `Bearer ${token}`;
//       }

//       const response = await fetch(`${API_BASE}/admin/submissions/${paperId}`, {
//         method: "PUT",
//         headers,
//         body: JSON.stringify({
//           reviewerId,
//           status: "under_review",
//         }),
//       });

//       if (response.ok) {
//         setShowAssignmentModal(false);
//         setSelectedPaper(null);
//         await fetchData(); // Refresh data
//         alert("Reviewer assigned successfully!");
//       } else {
//         throw new Error("Failed to assign reviewer");
//       }
//     } catch (error) {
//       console.error("Error assigning reviewer:", error);
//       alert("Error assigning reviewer");
//     }
//   };

//   const handleUserUpdate = async (
//     userId: number,
//     updates: Partial<User>
//   ): Promise<void> => {
//     try {
//       const token = localStorage.getItem("token");
//       const headers: HeadersInit = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers.Authorization = `Bearer ${token}`;
//       }

//       const response = await fetch(`${API_BASE}/admin/users/${userId}`, {
//         method: "PUT",
//         headers,
//         body: JSON.stringify(updates),
//       });

//       if (response.ok) {
//         await fetchData(); // Refresh data
//         alert("User updated successfully!");
//       } else {
//         throw new Error("Failed to update user");
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//       alert("Error updating user");
//     }
//   };

//   // Get unpublished papers for assignment
//   const unpublishedPapers: Paper[] = papers.filter(
//     (paper: Paper) =>
//       !paper.reviewerId ||
//       !paper.status ||
//       paper.status === "unpublished" ||
//       paper.status === "pending"
//   );

//   // Get reviewers from users
//   const reviewers: User[] = users.filter(
//     (user: User) => user.role === "reviewer" && user.isActive
//   );

//   // Chart data - Fixed to match Recharts expected type
//   const statusData: readonly any[] = [
//     { name: "Accepted", value: stats.statusDistribution.accepted },
//     { name: "Under Review", value: stats.statusDistribution.review },
//     { name: "Rejected", value: stats.statusDistribution.rejected },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg">Loading Admin Dashboard...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-500 text-lg">{error}</div>
//         <button
//           onClick={fetchData}
//           className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-4">
//       {/* KPI Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {[
//           { label: "Users", value: stats.totalUsers },
//           { label: "Submissions", value: stats.totalSubmissions },
//           {
//             label: "Acceptance Rate",
//             value: `${Math.round(stats.acceptanceRate)}%`,
//           },
//         ].map((kpi, index) => (
//           <AnimatedCard key={kpi.label} delay={0.1 + index * 0.05}>
//             <div className="text-3xl font-bold text-blue-600">{kpi.value}</div>
//             <div className="text-sm text-gray-600 mt-1">{kpi.label}</div>
//           </AnimatedCard>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <AnimatedCard>
//           <div className="font-semibold text-gray-800 mb-4">
//             Submissions Over Time
//           </div>
//           <ResponsiveContainer width="100%" height={200}>
//             <LineChart data={stats.submissionsOverTime}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="submissions"
//                 stroke="#3B82F6"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </AnimatedCard>

//         <AnimatedCard>
//           <div className="font-semibold text-gray-800 mb-4">
//             Submission Status
//           </div>
//           <ResponsiveContainer width="100%" height={200}>
//             <PieChart>
//               <Pie
//                 data={statusData}
//                 dataKey="value"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 label={({ name, value }: any) => `${name}: ${value}`}
//               >
//                 {statusData.map((_: any, index: number) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </AnimatedCard>
//       </div>

//       {/* Unpublished Papers - Assignment Section */}
//       <AnimatedCard>
//         <div className="flex justify-between items-center mb-4">
//           <div className="font-semibold text-gray-800">
//             Papers Needing Review Assignment
//           </div>
//           <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
//             {unpublishedPapers.length} papers
//           </span>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="text-left p-3 font-medium">Paper ID</th>
//                 <th className="text-left p-3 font-medium">Title</th>
//                 <th className="text-left p-3 font-medium">Author</th>
//                 <th className="text-left p-3 font-medium">Status</th>
//                 <th className="p-3 font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {unpublishedPapers.map((paper: Paper) => (
//                 <tr key={paper.id} className="border-b hover:bg-gray-50">
//                   <td className="p-3">{paper.id}</td>
//                   <td className="p-3 font-medium">{paper.title}</td>
//                   <td className="p-3">
//                     {paper.author || paper.authors || "Unknown"}
//                   </td>
//                   <td className="p-3">
//                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                       {paper.status || "Unassigned"}
//                     </span>
//                   </td>
//                   <td className="p-3">
//                     <button
//                       onClick={() => {
//                         setSelectedPaper(paper);
//                         setShowAssignmentModal(true);
//                       }}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
//                     >
//                       Assign Reviewer
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {unpublishedPapers.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="p-4 text-center text-gray-500">
//                     All papers have been assigned to reviewers!
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </AnimatedCard>

//       {/* Users Management */}
//       <AnimatedCard>
//         <div className="font-semibold text-gray-800 mb-4">User Management</div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="text-left p-3 font-medium">Name</th>
//                 <th className="text-left p-3 font-medium">Email</th>
//                 <th className="text-left p-3 font-medium">Role</th>
//                 <th className="text-left p-3 font-medium">Status</th>
//                 <th className="p-3 font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user: User) => (
//                 <tr
//                   key={user.userId || user.id}
//                   className="border-b hover:bg-gray-50"
//                 >
//                   <td className="p-3">{user.name}</td>
//                   <td className="p-3">{user.email}</td>
//                   <td className="p-3 capitalize">{user.role}</td>
//                   <td className="p-3">
//                     <span
//                       className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                         user.isActive
//                           ? "bg-green-100 text-green-800"
//                           : "bg-red-100 text-red-800"
//                       }`}
//                     >
//                       {user.isActive ? "Active" : "Inactive"}
//                     </span>
//                   </td>
//                   <td className="p-3 space-x-2">
//                     {user.role === "student" && (
//                       <button
//                         onClick={() =>
//                           handleUserUpdate(user.userId!, { role: "reviewer" })
//                         }
//                         className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
//                       >
//                         Promote to Reviewer
//                       </button>
//                     )}
//                     <button
//                       onClick={() =>
//                         handleUserUpdate(user.userId!, {
//                           isActive: !user.isActive,
//                         })
//                       }
//                       className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
//                     >
//                       {user.isActive ? "Suspend" : "Activate"}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </AnimatedCard>

//       {/* All Submissions */}
//       <AnimatedCard>
//         <div className="font-semibold text-gray-800 mb-4">
//           All Paper Submissions
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="text-left p-3 font-medium">Paper ID</th>
//                 <th className="text-left p-3 font-medium">Title</th>
//                 <th className="text-left p-3 font-medium">Author</th>
//                 <th className="text-left p-3 font-medium">Status</th>
//                 <th className="text-left p-3 font-medium">Reviewer</th>
//               </tr>
//             </thead>
//             <tbody>
//               {papers.map((paper: Paper) => (
//                 <tr key={paper.id} className="border-b hover:bg-gray-50">
//                   <td className="p-3">{paper.id}</td>
//                   <td className="p-3 font-medium">{paper.title}</td>
//                   <td className="p-3">
//                     {paper.author || paper.authors || "Unknown"}
//                   </td>
//                   <td className="p-3">
//                     <span
//                       className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                         paper.status === "accepted"
//                           ? "bg-green-100 text-green-800"
//                           : paper.status === "rejected"
//                           ? "bg-red-100 text-red-800"
//                           : paper.status === "under_review" ||
//                             paper.status === "review"
//                           ? "bg-blue-100 text-blue-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {paper.status || "Unpublished"}
//                     </span>
//                   </td>
//                   <td className="p-3">
//                     {paper.reviewerId ? (
//                       <span className="text-blue-600">
//                         Reviewer #{paper.reviewerId}
//                       </span>
//                     ) : (
//                       <span className="text-red-500">Not assigned</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </AnimatedCard>

//       {/* Assignment Modal */}
//       {showAssignmentModal && selectedPaper && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-md">
//             <div className="p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 Assign Reviewer
//               </h3>
//               <p className="text-sm text-gray-600 mb-4">
//                 Assign a reviewer to: <strong>{selectedPaper.title}</strong>
//               </p>

//               <div className="space-y-3 max-h-60 overflow-y-auto">
//                 {reviewers.map((reviewer: User) => (
//                   <div
//                     key={reviewer.userId}
//                     className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
//                   >
//                     <div>
//                       <div className="font-medium">{reviewer.name}</div>
//                       <div className="text-sm text-gray-500">
//                         {reviewer.email}
//                       </div>
//                     </div>
//                     <button
//                       onClick={() =>
//                         handleAssignReviewer(selectedPaper.id, reviewer.userId!)
//                       }
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors"
//                     >
//                       Assign
//                     </button>
//                   </div>
//                 ))}

//                 {reviewers.length === 0 && (
//                   <div className="text-center text-gray-500 py-4">
//                     No reviewers available. Please promote some users to
//                     reviewer role first.
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-end border-t px-6 py-4">
//               <button
//                 onClick={() => setShowAssignmentModal(false)}
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { adminAPI, isAuthenticated } from "./api";
import type { Stats, User, Submission } from "./types";
import StatsCards from "./StatsCards";
import UsersTable from "./UsersTable";
import SubmissionsTable from "./SubmissionsTable";
import AssignReviewersTable from "./AssignReviwersTables";
import ChartsSection from "./ChartsSection";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "submissions" | "assign-reviewers"
  >("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handleAuthRequired = () => {
      navigate("/login");
    };

    window.addEventListener("auth-required", handleAuthRequired);

    return () => {
      window.removeEventListener("auth-required", handleAuthRequired);
    };
  }, [navigate]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.role !== "admin") {
            setError("Access denied. Admin privileges required.");
            return;
          }
        } catch (error) {
          setError("Invalid token");
          return;
        }
      }

      const [statsData, usersData, submissionsData] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getUsers(),
        adminAPI.getSubmissions(),
      ]);

      setStats(statsData);
      setUsers(usersData.users);
      setSubmissions(submissionsData.submissions);
    } catch (error: any) {
      console.error("Error loading data:", error);
      if (error.response?.status === 401) {
        setError("Authentication required. Please login again.");
        navigate("/login");
      } else if (error.response?.status === 403) {
        setError("Access denied. Admin privileges required.");
      } else {
        setError("Failed to load data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUserUpdate = async (userId: string, updates: Partial<User>) => {
    try {
      await adminAPI.updateUser(userId, updates);
      await loadData();
    } catch (error: any) {
      console.error("Error updating user:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleSubmissionUpdate = async (
    submissionId: string,
    updates: Partial<Submission>
  ) => {
    try {
      await adminAPI.updateSubmission(submissionId, updates);
      await loadData();
    } catch (error: any) {
      console.error("Error updating submission:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleRetry = () => {
    loadData();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Get papers that need reviewer assignment (pending and under_review without reviewer)
  const papersNeedingReviewers = submissions.filter(
    (submission) =>
      (submission.status === "pending" ||
        submission.status === "under_review") &&
      !submission.assignedReviewer
  );

  if (loading) {
    return (
      <div className="admin-container flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <div className="text-black text-lg">Loading Admin Dashboard...</div>
        </div>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="admin-container flex items-center justify-center">
        <div className="text-center">
          <div className="text-black text-lg mb-4">{error}</div>
          <button onClick={handleRetry} className="btn-primary px-6 py-2 mr-2">
            Retry
          </button>
          <button onClick={handleLogout} className="btn-danger px-6 py-2">
            Login Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Navigation */}
      <nav className="admin-nav">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { key: "overview", label: "Overview", badge: null },
              {
                key: "assign-reviewers",
                label: "Assign Reviewers",
                badge: papersNeedingReviewers.length,
              },
              { key: "users", label: "Users", badge: null },
              { key: "submissions", label: "All Submissions", badge: null },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors relative ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.key as any)}
              >
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3">
          <div className="container mx-auto flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={handleRetry}
              className="btn-danger px-3 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === "overview" && stats && (
          <div className="space-y-8 fade-in">
            <StatsCards stats={stats} />
            <ChartsSection
              stats={stats}
              users={users}
              submissions={submissions}
            />
          </div>
        )}

        {activeTab === "assign-reviewers" && (
          <AssignReviewersTable
            submissions={papersNeedingReviewers}
            users={users}
            onSubmissionUpdate={handleSubmissionUpdate}
          />
        )}

        {activeTab === "users" && (
          <UsersTable users={users} onUserUpdate={handleUserUpdate} />
        )}

        {activeTab === "submissions" && (
          <SubmissionsTable
            submissions={submissions}
            users={users}
            onSubmissionUpdate={handleSubmissionUpdate}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
