import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { appShellStyles } from "../assets/dummyStyles";

/* =========================================================
   APP SHELL (PRIVATE DASHBOARD LAYOUT)
========================================================= */

export default function AppShell() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  /* =========================================================
     STATE
  ========================================================= */

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* =========================================================
     RESPONSIVE & EFFECTS
  ========================================================= */

  // Screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setCollapsed(false);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Persist sidebar state
  useEffect(() => {
    try {
      localStorage.setItem("sidebar_collapsed", collapsed ? "true" : "false");
    } catch {}
  }, [collapsed]);

  // Lock body scroll for mobile drawer
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Header scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* =========================================================
     USER HELPERS
  ========================================================= */

  const displayName = (() => {
    if (!user) return "User";
    const name = user.fullName || user.firstName || user.username || "";
    return name.trim() || (user.email || "").split("@")[0] || "User";
  })();

  const firstName = () => {
    const parts = displayName.split(" ").filter(Boolean);
    return parts.length ? parts[0] : displayName;
  };

  const initials = () => {
    const parts = displayName.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  /* =========================================================
     ICONS
  ========================================================= */

  const DashboardIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );

  const InvoiceIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );

  const CreateIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );

  const ProfileIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const LogoutIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  const CollapseIcon = ({ className = "w-4 h-4", collapsed }) => (
    <svg
      className={`${className} transition-transform ${collapsed ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
  );

  /* =========================================================
     SIDEBAR LINK
  ========================================================= */

  const SidebarLink = ({ to, icon, children }) => (
    <NavLink
      to={to}
      onClick={() => setMobileOpen(false)}
      className={({ isActive }) =>
        `
        ${appShellStyles.sidebarLink}
        ${collapsed ? appShellStyles.sidebarLinkCollapsed : ""}
        ${isActive ? appShellStyles.sidebarLinkActive : appShellStyles.sidebarLinkInactive}
      `
      }
    >
      {({ isActive }) => (
        <>
          <div className={`${appShellStyles.sidebarIcon} ${isActive ? appShellStyles.sidebarIconActive : ""}`}>
            {icon}
          </div>
          {!collapsed && <span className={appShellStyles.sidebarText}>{children}</span>}
          {!collapsed && isActive && <div className={appShellStyles.sidebarActiveIndicator} />}
        </>
      )}
    </NavLink>
  );

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className={appShellStyles.root}>
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`${appShellStyles.sidebar}
        ${collapsed ? appShellStyles.sidebarCollapsed : ""}
        ${mobileOpen ? appShellStyles.sidebarMobileOpen : ""}`}
      >
        <div className={appShellStyles.sidebarHeader}>
          {!collapsed && <span className={appShellStyles.logo}>InvoicePro</span>}
          <button onClick={() => setCollapsed(v => !v)} className={appShellStyles.collapseBtn}>
            <CollapseIcon collapsed={collapsed} />
          </button>
        </div>

        <nav className={appShellStyles.nav}>
          <SidebarLink to="/app/dashboard" icon={<DashboardIcon />}>Dashboard</SidebarLink>
          <SidebarLink to="/app/invoices" icon={<InvoiceIcon />}>Invoices</SidebarLink>
          <SidebarLink to="/app/create-invoice" icon={<CreateIcon />}>Create Invoice</SidebarLink>
          <SidebarLink to="/app/business" icon={<ProfileIcon />}>Business Profile</SidebarLink>
        </nav>

        <div className={appShellStyles.sidebarFooter}>
          <button onClick={handleLogout} className={appShellStyles.logoutBtn}>
            <LogoutIcon />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className={appShellStyles.main}>
        <header className={`${appShellStyles.header} ${scrolled ? appShellStyles.headerScrolled : ""}`}>
          {isMobile && (
            <button onClick={() => setMobileOpen(true)} className={appShellStyles.mobileMenuBtn}>
              <svg className={appShellStyles.mobileMenuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          <div className={appShellStyles.headerRight}>
            <div className={appShellStyles.avatar}>{initials()}</div>
            <span className={appShellStyles.welcome}>Hi, {firstName()}</span>
          </div>
        </header>

        <main className={appShellStyles.content}>
          <Outlet />
        </main>
      </div>

      {mobileOpen && (
        <div className={appShellStyles.mobileOverlay} onClick={() => setMobileOpen(false)} />
      )}
    </div>
  );
}
