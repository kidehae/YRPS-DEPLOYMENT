import { NavLink } from "react-router-dom";
import { cn } from "@/Components/LandingpageComponenets/utils";
import { LayoutDashboard, Users, FileText, Settings } from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { title: "User Management", icon: Users, path: "/admin/users" },
  { title: "Submissions", icon: FileText, path: "/admin/submissions" },
  { title: "Settings", icon: Settings, path: "/admin/settings" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 border-r bg-muted/20 min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                "hover:bg-accent hover:text-accent-foreground",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm font-medium"
                  : "text-muted-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
