// import Navbar from "@/Components/Admin/Navbar";
// import Sidebar from "@/Components/Admin/Sidebar";
// import { Button } from "@/Components/LandingpageComponenets/button";
// import { Input } from "@/Components/LandingpageComponenets/input";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/LandingpageComponenets/table";
// import { Badge } from "@/Components/LandingpageComponenets/badge";
// import { Search, Filter, UserPlus } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/LandingpageComponenets/select";

// const SubmissionsManagement = () => {
//   const submissions = [
//     {
//       id: 1,
//       title: "Machine Learning Applications in Healthcare",
//       author: "John Doe",
//       reviewer: "Dr. Sarah Johnson",
//       status: "In Review",
//       date: "2025-01-05",
//     },
//     {
//       id: 2,
//       title: "Quantum Computing Algorithms",
//       author: "Michael Chen",
//       reviewer: "Prof. David Lee",
//       status: "Approved",
//       date: "2024-12-28",
//     },
//     {
//       id: 3,
//       title: "Climate Change Impact Studies",
//       author: "Emily Wang",
//       reviewer: "Dr. Sarah Johnson",
//       status: "Pending",
//       date: "2025-01-08",
//     },
//     {
//       id: 4,
//       title: "Blockchain Security Analysis",
//       author: "Robert Brown",
//       reviewer: "-",
//       status: "Pending",
//       date: "2025-01-09",
//     },
//     {
//       id: 5,
//       title: "Neural Network Optimization",
//       author: "John Doe",
//       reviewer: "Prof. David Lee",
//       status: "Rejected",
//       date: "2025-01-02",
//     },
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Approved":
//         return "default";
//       case "In Review":
//         return "secondary";
//       case "Pending":
//         return "outline";
//       case "Rejected":
//         return "destructive";
//       default:
//         return "outline";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="flex">
//         <Sidebar />
//         <main className="flex-1 p-6">
//           <div className="max-w-7xl mx-auto space-y-6">
//             <div>
//               <h2 className="text-3xl font-bold text-foreground">Submissions Management</h2>
//               <p className="text-muted-foreground mt-1">Track and manage research submissions</p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input placeholder="Search submissions by title or author..." className="pl-10" />
//               </div>
//               <Select>
//                 <SelectTrigger className="w-full sm:w-[180px]">
//                   <Filter className="h-4 w-4 mr-2" />
//                   <SelectValue placeholder="Filter by status" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="in-review">In Review</SelectItem>
//                   <SelectItem value="approved">Approved</SelectItem>
//                   <SelectItem value="rejected">Rejected</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="border rounded-lg bg-card shadow-sm overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Title</TableHead>
//                     <TableHead>Author</TableHead>
//                     <TableHead>Reviewer</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {submissions.map((submission) => (
//                     <TableRow key={submission.id}>
//                       <TableCell className="font-medium max-w-[300px]">{submission.title}</TableCell>
//                       <TableCell className="text-muted-foreground">{submission.author}</TableCell>
//                       <TableCell className="text-muted-foreground">{submission.reviewer}</TableCell>
//                       <TableCell>
//                         <Badge variant={getStatusColor(submission.status)}>{submission.status}</Badge>
//                       </TableCell>
//                       <TableCell className="text-muted-foreground">{submission.date}</TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex justify-end gap-2">
//                           <Select>
//                             <SelectTrigger className="w-[140px] h-8 text-xs">
//                               <SelectValue placeholder="Update status" />
//                             </SelectTrigger>
//                             <SelectContent className="bg-popover">
//                               <SelectItem value="pending">Pending</SelectItem>
//                               <SelectItem value="in-review">In Review</SelectItem>
//                               <SelectItem value="approved">Approved</SelectItem>
//                               <SelectItem value="rejected">Rejected</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <Button variant="outline" size="sm" className="h-8">
//                             <UserPlus className="h-3 w-3 mr-1" />
//                             Assign
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SubmissionsManagement;

import { useState, useEffect } from "react";
import { Input } from "@/Components/LandingpageComponenets/input";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/LandingpageComponenets/select";

interface Submission {
  submissionId: number;
  title: string;
  author: number; // authorId
  status: string;
  assignedReviewer: number | null; // reviewerId
}

interface User {
  userId: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

const SubmissionsManagement = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        // Fetch submissions
        const submissionsResponse = await fetch(
          "https://yrs-api-8.onrender.com/api/admin/submissions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Fetch users for reviewer assignment
        const usersResponse = await fetch(
          "https://yrs-api-8.onrender.com/api/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (submissionsResponse.ok && usersResponse.ok) {
          const submissionsData = await submissionsResponse.json();
          const usersData = await usersResponse.json();
          setSubmissions(submissionsData.submissions);
          setUsers(usersData.users);
        } else {
          setError("Failed to load data");
        }
      } catch (err) {
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = async (
    submissionId: number,
    newStatus: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://yrs-api-8.onrender.com/api/admin/submissions/${submissionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setSubmissions(
          submissions.map((sub) =>
            sub.submissionId === submissionId
              ? { ...sub, status: newStatus }
              : sub
          )
        );
      } else {
        alert("Failed to update submission status");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  const handleReviewerAssignment = async (
    submissionId: number,
    reviewerId: string
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://yrs-api-8.onrender.com/api/admin/submissions/${submissionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reviewerId: reviewerId ? parseInt(reviewerId) : null,
          }),
        }
      );

      if (response.ok) {
        setSubmissions(
          submissions.map((sub) =>
            sub.submissionId === submissionId
              ? {
                  ...sub,
                  assignedReviewer: reviewerId ? parseInt(reviewerId) : null,
                }
              : sub
          )
        );
      } else {
        alert("Failed to assign reviewer");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusDisplay = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getReviewerName = (reviewerId: number | null) => {
    if (!reviewerId) return "-";
    const reviewer = users.find((user) => user.userId === reviewerId);
    return reviewer ? reviewer.name : `User ${reviewerId}`;
  };

  const getAuthorName = (authorId: number) => {
    const author = users.find((user) => user.userId === authorId);
    return author ? author.name : `User ${authorId}`;
  };

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getAuthorName(submission.author)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const reviewerUsers = users.filter(
    (user) => user.role === "reviewer" || user.role === "admin"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center">Loading submissions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Submissions Management
          </h2>
          <p className="text-gray-600 mt-1">
            Track and manage research submissions
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search submissions by title or author..."
              className="pl-10 text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] text-gray-900">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">In Review</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-900">
                  Title
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Author
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Reviewer
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-right p-4 font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr
                  key={submission.submissionId}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="p-4 font-medium text-gray-900 max-w-[300px] truncate">
                    {submission.title}
                  </td>
                  <td className="p-4 text-gray-600">
                    {getAuthorName(submission.author)}
                  </td>
                  <td className="p-4 text-gray-600">
                    {getReviewerName(submission.assignedReviewer)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        submission.status
                      )}`}
                    >
                      {getStatusDisplay(submission.status)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Select
                        onValueChange={(value) =>
                          handleStatusUpdate(submission.submissionId, value)
                        }
                      >
                        <SelectTrigger className="w-[140px] h-8 text-xs text-gray-900">
                          <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="under_review">
                            In Review
                          </SelectItem>
                          <SelectItem value="accepted">Accepted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        onValueChange={(value) =>
                          handleReviewerAssignment(
                            submission.submissionId,
                            value
                          )
                        }
                      >
                        <SelectTrigger className="w-[140px] h-8 text-xs text-gray-900">
                          <SelectValue placeholder="Assign reviewer" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="">Unassign</SelectItem>
                          {reviewerUsers.map((user) => (
                            <SelectItem
                              key={user.userId}
                              value={user.userId.toString()}
                            >
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No submissions found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionsManagement;
