import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import StudentDashboard from "./Components/StudentDashboard";
import ResearchArchive from "./Pages/ReserachPages/AllResearch";
import PaperDetail from "./Pages/ReserachPages/SinglePaper";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/Admin/Dashboard";
import UserManagement from "./Pages/Admin/UserManagement";
import SubmissionsManagement from "./Pages/Admin/SubmissionsManagement";
import ReviewerDashboard from "./Pages/Reviewer/ReviewerDashboard";
import ReviewPage from "./Pages/Reviewer/ReviewPage";
import Navbar from "./Components/Navbar";

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Simple token validation
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userRole = payload.role;

    // Check token expiration
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    // Check role-based access
    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

// Public Route Component (redirect if logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Redirect based on role
      if (payload.role === "admin") {
        return <Navigate to="/admin" replace />;
      } else if (payload.role === "reviewer") {
        return <Navigate to="/reviewer-dashboard" replace />;
      } else {
        return <Navigate to="/dashboard" replace />;
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
  }

  return <>{children}</>;
};

// Layout component with navbar
const Layout = ({
  children,
  showNavbar = true,
}: {
  children: React.ReactNode;
  showNavbar?: boolean;
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page WITHOUT navbar */}
        <Route path="/" element={<LandingPage />} />

        {/* Public routes WITH navbar */}
        <Route
          path="/allresearches"
          element={
            <Layout>
              <ResearchArchive />
            </Layout>
          }
        />
        <Route
          path="/paper/:id"
          element={
            <Layout>
              <PaperDetail />
            </Layout>
          }
        />

        {/* Auth routes WITH navbar */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Layout>
                <Login />
              </Layout>
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Layout>
                <Register />
              </Layout>
            </PublicRoute>
          }
        />

        {/* Protected routes with navbar */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <StudentDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Reviewer-only routes with navbar */}
        <Route
          path="/reviewer-dashboard"
          element={
            <ProtectedRoute requiredRole="reviewer">
              <Layout>
                <ReviewerDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviewer/:id"
          element={
            <ProtectedRoute requiredRole="reviewer">
              <Layout>
                <ReviewPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin-only routes with navbar */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <UserManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/submissions"
          element={
            <ProtectedRoute requiredRole="admin">
              <Layout>
                <SubmissionsManagement />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Unauthorized page with navbar */}
        <Route
          path="/unauthorized"
          element={
            <Layout>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-red-600">
                    Unauthorized Access
                  </h1>
                  <p className="mt-2 text-gray-700">
                    You don't have permission to access this page.
                  </p>
                  <button
                    onClick={() => window.history.back()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </Layout>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
