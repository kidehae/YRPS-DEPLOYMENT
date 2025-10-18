// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Button } from "@/Components/LandingpageComponenets/button";
// import { Input } from "@/Components/LandingpageComponenets/input";
// import { Label } from "@/Components/LandingpageComponenets/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/LandingpageComponenets/card";
// import { GraduationCap } from "lucide-react";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     navigate("/admin");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background p-4">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader className="space-y-4 text-center">
//           <div className="flex justify-center">
//             <div className="p-3 rounded-full bg-primary/10">
//               <GraduationCap className="h-8 w-8 text-primary" />
//             </div>
//           </div>
//           <div>
//             <CardTitle className="text-2xl font-semibold">Sign In to the Research Portal</CardTitle>
//             <CardDescription className="mt-2">Enter your credentials to access your account</CardDescription>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="your.email@university.edu"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <Button type="submit" className="w-full transition-all hover:scale-[1.02]">
//               Sign In
//             </Button>
//             <p className="text-center text-sm text-muted-foreground">
//               Don't have an account?{" "}
//               <Link to="/register" className="text-primary hover:underline font-medium">
//                 Register
//               </Link>
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/Components/LandingpageComponenets/button";
import { Input } from "@/Components/LandingpageComponenets/input";
import { Label } from "@/Components/LandingpageComponenets/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/LandingpageComponenets/card";
import { GraduationCap } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get success message from registration
  const successMessage = location.state?.message;

  const getDashboardPath = (role: string) => {
    switch (role) {
      case "admin":
        return "/admin";
      case "reviewer":
        return "/reviewer-dashboard"; // You can create this route if needed
      case "student":
      default:
        return "/dashboard";
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://yrs-api-8.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store the token in localStorage
      localStorage.setItem("token", data.token);

      // Decode the token to get user role
      try {
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        const userRole = payload.role;

        // Redirect based on user role
        const dashboardPath = getDashboardPath(userRole);
        navigate(dashboardPath);
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
        // Fallback to default dashboard if token decoding fails
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold">
              Sign In to the Research Portal
            </CardTitle>
            <CardDescription className="mt-2">
              Enter your credentials to access your account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <div className="mb-4 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="text-gray-900"
              />
            </div>
            <Button
              type="submit"
              className="w-full transition-all hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
