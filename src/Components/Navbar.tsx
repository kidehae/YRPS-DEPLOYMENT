// import { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/Components/LandingpageComponenets/button";
// import {
//   GraduationCap,
//   User,
//   LogOut,
//   LayoutDashboard,
//   Menu,
//   X,
// } from "lucide-react";

// interface UserData {
//   id: string;
//   email: string;
//   role: string;
//   firstName?: string;
//   lastName?: string;
// }

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [user, setUser] = useState<UserData | null>(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         // Simple token parsing
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         setUser(payload);
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         handleLogout();
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//     setIsMenuOpen(false);
//   };

//   const getDashboardPath = () => {
//     if (!user) return "/dashboard";

//     switch (user.role) {
//       case "admin":
//         return "/admin";
//       case "reviewer":
//         return "/dashboard";
//       case "student":
//       default:
//         return "/dashboard";
//     }
//   };

//   const getRoleDisplayName = (role: string) => {
//     switch (role) {
//       case "admin":
//         return "Administrator";
//       case "reviewer":
//         return "Reviewer";
//       case "student":
//         return "Student";
//       default:
//         return "User";
//     }
//   };

//   const isActiveRoute = (path: string) => {
//     return location.pathname === path;
//   };

//   return (
//     <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo and Brand */}
//           <div className="flex items-center">
//             <Link
//               to="/"
//               className="flex items-center space-x-2 text-xl font-semibold text-gray-900 no-underline"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               <GraduationCap className="h-8 w-8 text-blue-600" />
//               <span className="text-gray-900">Research Portal</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             {user ? (
//               <>
//                 {/* Navigation Links */}
//                 <Link to="/allresearches">
//                   <Button
//                     variant={
//                       isActiveRoute("/allresearches") ? "default" : "ghost"
//                     }
//                     className="transition-colors text-gray-900"
//                   >
//                     Research Archive
//                   </Button>
//                 </Link>

//                 <Link to={getDashboardPath()}>
//                   <Button
//                     variant={
//                       isActiveRoute(getDashboardPath()) ? "default" : "ghost"
//                     }
//                     className="transition-colors flex items-center gap-2 text-gray-900"
//                   >
//                     <LayoutDashboard className="h-4 w-4" />
//                     Dashboard
//                   </Button>
//                 </Link>

//                 {/* Profile and Logout */}
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm text-gray-700">
//                     {user.firstName || user.email}
//                   </span>
//                   <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
//                     {getRoleDisplayName(user.role)}
//                   </span>

//                   <Link to="/profile">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="flex items-center gap-1 text-gray-700"
//                     >
//                       <User className="h-4 w-4" />
//                       Profile
//                     </Button>
//                   </Link>

//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={handleLogout}
//                     className="flex items-center gap-1 text-red-600 hover:text-red-700"
//                   >
//                     <LogOut className="h-4 w-4" />
//                     Logout
//                   </Button>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <Link to="/login">
//                   <Button variant="ghost" className="text-gray-700">
//                     Login
//                   </Button>
//                 </Link>
//                 <Link to="/register">
//                   <Button className="text-white">Register</Button>
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-700"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t border-gray-200 bg-white">
//             {user ? (
//               <div className="space-y-2">
//                 <Link to="/allresearches">
//                   <Button
//                     variant={
//                       isActiveRoute("/allresearches") ? "default" : "ghost"
//                     }
//                     className="w-full justify-start text-gray-900"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Research Archive
//                   </Button>
//                 </Link>

//                 <Link to={getDashboardPath()}>
//                   <Button
//                     variant={
//                       isActiveRoute(getDashboardPath()) ? "default" : "ghost"
//                     }
//                     className="w-full justify-start text-gray-900"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <LayoutDashboard className="h-4 w-4 mr-2" />
//                     Dashboard
//                   </Button>
//                 </Link>

//                 <Link to="/profile">
//                   <Button
//                     variant="ghost"
//                     className="w-full justify-start text-gray-700"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <User className="h-4 w-4 mr-2" />
//                     Profile
//                   </Button>
//                 </Link>

//                 <div className="px-4 py-2 text-sm text-gray-600">
//                   Signed in as: {user.email}
//                   <br />
//                   Role: {getRoleDisplayName(user.role)}
//                 </div>

//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start text-red-600"
//                   onClick={handleLogout}
//                 >
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Logout
//                 </Button>
//               </div>
//             ) : (
//               <div className="space-y-2">
//                 <Link to="/login">
//                   <Button
//                     variant="ghost"
//                     className="w-full justify-start text-gray-700"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Login
//                   </Button>
//                 </Link>
//                 <Link to="/register">
//                   <Button
//                     className="w-full justify-start text-white"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Register
//                   </Button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/Components/LandingpageComponenets/button";
import {
  GraduationCap,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  BookOpen,
} from "lucide-react";

interface UserData {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<UserData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (error) {
        console.error("Error decoding token:", error);
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    setIsMenuOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return "/dashboard";

    switch (user.role) {
      case "admin":
        return "/admin";
      case "reviewer":
        return "/reviewer-dashboard";
      case "student":
      default:
        return "/dashboard";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrator";
      case "reviewer":
        return "Reviewer";
      case "student":
        return "Student";
      default:
        return "User";
    }
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo and Brand */}
        <div className="logo-section">
          <Link
            to="/"
            className="logo-link"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="logo-icon">
              <GraduationCap className="icon-lg" />
            </div>
            <span className="logo-text">Research Portal</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          {user ? (
            <>
              {/* Navigation Links */}
              <div className="nav-links">
                <Link to="/allresearches">
                  <Button
                    variant={
                      isActiveRoute("/allresearches") ? "default" : "ghost"
                    }
                    className={`nav-btn ${
                      isActiveRoute("/allresearches") ? "nav-btn-active" : ""
                    }`}
                  >
                    <BookOpen className="icon-sm" />
                    Research Archive
                  </Button>
                </Link>

                <Link to={getDashboardPath()}>
                  <Button
                    variant={
                      isActiveRoute(getDashboardPath()) ? "default" : "ghost"
                    }
                    className={`nav-btn ${
                      isActiveRoute(getDashboardPath()) ? "nav-btn-active" : ""
                    }`}
                  >
                    <LayoutDashboard className="icon-sm" />
                    Dashboard
                  </Button>
                </Link>
              </div>

              {/* User Profile Section */}
              <div className="user-section">
                <div className="user-info">
                  <span className="user-name">
                    {user.firstName || user.email}
                  </span>
                  <span className="user-role">
                    {getRoleDisplayName(user.role)}
                  </span>
                </div>

                <div className="user-actions">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="logout-btn"
                  >
                    <LogOut className="icon-sm" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login">
                <Button variant="ghost" className="login-btn">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="register-btn">Register</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-btn">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-toggle"
          >
            {isMenuOpen ? (
              <X className="icon-lg" />
            ) : (
              <Menu className="icon-lg" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            {user ? (
              <div className="mobile-nav-content">
                <div className="mobile-user-info">
                  <div className="user-avatar">
                    <User className="icon-md" />
                  </div>
                  <div>
                    <div className="mobile-user-name">
                      {user.firstName || user.email}
                    </div>
                    <div className="mobile-user-role">
                      {getRoleDisplayName(user.role)}
                    </div>
                  </div>
                </div>

                <div className="mobile-nav-links">
                  <Link
                    to="/allresearches"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant={
                        isActiveRoute("/allresearches") ? "default" : "ghost"
                      }
                      className={`mobile-nav-btn ${
                        isActiveRoute("/allresearches")
                          ? "mobile-nav-btn-active"
                          : ""
                      }`}
                    >
                      <BookOpen className="icon-sm" />
                      Research Archive
                    </Button>
                  </Link>

                  <Link
                    to={getDashboardPath()}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant={
                        isActiveRoute(getDashboardPath()) ? "default" : "ghost"
                      }
                      className={`mobile-nav-btn ${
                        isActiveRoute(getDashboardPath())
                          ? "mobile-nav-btn-active"
                          : ""
                      }`}
                    >
                      <LayoutDashboard className="icon-sm" />
                      Dashboard
                    </Button>
                  </Link>
                </div>

                <Button onClick={handleLogout} className="mobile-logout-btn">
                  <LogOut className="icon-sm" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="mobile-login-btn">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="mobile-register-btn">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add the CSS styles */}
      <style>{`
        .navbar {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        /* Logo Section */
        .logo-section {
          display: flex;
          align-items: center;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          transition: transform 0.2s ease;
        }

        .logo-link:hover {
          transform: translateY(-1px);
        }

        .logo-icon {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          letter-spacing: -0.025em;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: none;
          align-items: center;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
          }
        }

        .nav-links {
          display: flex;
          gap: 0.5rem;
        }

        .nav-btn {
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid transparent;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .nav-btn-active {
          color: white;
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }

        /* User Section */
        .user-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .user-name {
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .user-role {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.125rem 0.5rem;
          border-radius: 8px;
          margin-top: 0.125rem;
        }

        .user-actions {
          display: flex;
          gap: 0.25rem;
        }

        .profile-btn, .logout-btn {
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid transparent;
        }

        .profile-btn:hover, .logout-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Auth Buttons */
        .auth-buttons {
          display: flex;
          gap: 0.75rem;
        }

        .login-btn {
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .login-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .register-btn {
          background: white;
          color: #2563eb;
          border: 1px solid white;
        }

        .register-btn:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
        }

        /* Mobile Menu */
        .mobile-menu-btn {
          display: block;
        }

        @media (min-width: 768px) {
          .mobile-menu-btn {
            display: none;
          }
        }

        .menu-toggle {
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .menu-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-nav {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(20px);
        }

        .mobile-nav-content {
          padding: 1.5rem;
        }

        .mobile-user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .user-avatar {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.75rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-user-name {
          color: white;
          font-weight: 600;
          font-size: 1rem;
        }

        .mobile-user-role {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .mobile-nav-btn {
          width: 100%;
          justify-content: flex-start;
          color: rgba(255, 255, 255, 0.9);
          border: 1px solid transparent;
          padding: 0.875rem 1rem;
        }

        .mobile-nav-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .mobile-nav-btn-active {
          color: white;
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .mobile-logout-btn {
          width: 100%;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          border: none;
          padding: 0.875rem 1rem;
        }

        .mobile-logout-btn:hover {
          background: rgba(239, 68, 68, 1);
        }

        .mobile-auth-buttons {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-login-btn {
          width: 100%;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0.875rem 1rem;
        }

        .mobile-login-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .mobile-register-btn {
          width: 100%;
          background: white;
          color: #2563eb;
          border: 1px solid white;
          padding: 0.875rem 1rem;
        }

        .mobile-register-btn:hover {
          background: rgba(255, 255, 255, 0.9);
        }

        /* Icon Sizes */
        .icon-sm {
          width: 1rem;
          height: 1rem;
        }

        .icon-md {
          width: 1.25rem;
          height: 1.25rem;
        }

        .icon-lg {
          width: 1.5rem;
          height: 1.5rem;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
