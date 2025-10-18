// import Navbar from "@/Components/Admin/Navbar";
// import Sidebar from "@/Components/Admin/Sidebar";
// import { Button } from "@/Components/LandingpageComponenets/button";
// import { Input } from "@/Components/LandingpageComponenets/input";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/LandingpageComponenets/table";
// import { Badge } from "@/Components/LandingpageComponenets/badge";
// import { Search, Filter, Edit, Trash2 } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/LandingpageComponenets/select";

// const UserManagement = () => {
//   const users = [
//     { id: 1, name: "John Doe", email: "john@university.edu", role: "Student", status: "Active" },
//     { id: 2, name: "Dr. Sarah Johnson", email: "sarah@university.edu", role: "Reviewer", status: "Active" },
//     { id: 3, name: "Michael Chen", email: "michael@university.edu", role: "Student", status: "Active" },
//     { id: 4, name: "Prof. David Lee", email: "david@university.edu", role: "Reviewer", status: "Active" },
//     { id: 5, name: "Emily Wang", email: "emily@university.edu", role: "Admin", status: "Active" },
//     { id: 6, name: "Robert Brown", email: "robert@university.edu", role: "Student", status: "Inactive" },
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="flex">
//         <Sidebar />
//         <main className="flex-1 p-6">
//           <div className="max-w-7xl mx-auto space-y-6">
//             <div>
//               <h2 className="text-3xl font-bold text-foreground">User Management</h2>
//               <p className="text-muted-foreground mt-1">Manage all users in the system</p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input placeholder="Search users by name or email..." className="pl-10" />
//               </div>
//               <Select>
//                 <SelectTrigger className="w-full sm:w-[180px]">
//                   <Filter className="h-4 w-4 mr-2" />
//                   <SelectValue placeholder="Filter by role" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-popover">
//                   <SelectItem value="all">All Roles</SelectItem>
//                   <SelectItem value="student">Student</SelectItem>
//                   <SelectItem value="reviewer">Reviewer</SelectItem>
//                   <SelectItem value="admin">Admin</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="border rounded-lg bg-card shadow-sm">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>Role</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {users.map((user) => (
//                     <TableRow key={user.id}>
//                       <TableCell className="font-medium">{user.name}</TableCell>
//                       <TableCell className="text-muted-foreground">{user.email}</TableCell>
//                       <TableCell>
//                         <Badge variant="outline" className="font-normal">
//                           {user.role}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant={user.status === "Active" ? "default" : "secondary"}>
//                           {user.status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex justify-end gap-2">
//                           <Button variant="ghost" size="icon" className="h-8 w-8">
//                             <Edit className="h-4 w-4" />
//                           </Button>
//                           <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
//                             <Trash2 className="h-4 w-4" />
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

// export default UserManagement;

import { useState, useEffect } from "react";
import { Input } from "@/Components/LandingpageComponenets/input";
import { Search, Filter, Edit, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/LandingpageComponenets/select";

interface User {
  userId: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://yrs-api-8.onrender.com/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          setError("Failed to load users");
        }
      } catch (err) {
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleUpdate = async (userId: number, newRole: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://yrs-api-8.onrender.com/api/admin/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (response.ok) {
        // Update local state
        setUsers(
          users.map((user) =>
            user.userId === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        alert("Failed to update user role");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "all" || user.role.toLowerCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">Manage all users in the system</p>
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
              placeholder="Search users by name or email..."
              className="pl-10 text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px] text-gray-900">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="reviewer">Reviewer</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-900">
                  Name
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Email
                </th>
                <th className="text-left p-4 font-semibold text-gray-900">
                  Role
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
              {filteredUsers.map((user) => (
                <tr
                  key={user.userId}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="p-4 font-medium text-gray-900">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <Select
                      value={user.role.toLowerCase()}
                      onValueChange={(value) =>
                        handleRoleUpdate(user.userId, value)
                      }
                    >
                      <SelectTrigger className="w-[120px] text-gray-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="reviewer">Reviewer</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-md hover:bg-gray-100">
                        <Edit className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-md hover:bg-gray-100">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
