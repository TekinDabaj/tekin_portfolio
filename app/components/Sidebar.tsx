"use client";

import { useState } from "react";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  active?: boolean;
}

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Issues");

  const mainItems: SidebarItem[] = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      label: "Issues",
      badge: "24",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      label: "Performance",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
      label: "Projects",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 20V10" />
          <path d="M18 20V4" />
          <path d="M6 20v-4" />
        </svg>
      ),
      label: "Stats",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      label: "Releases",
      badge: "3",
    },
  ];

  const insightsItems: SidebarItem[] = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      label: "Discover",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      label: "Settings",
    },
  ];

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

        .sidebar {
          width: 240px;
          height: 100vh;
          background: #0a0a0a;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          z-index: 200;
        }

        .sidebar-header {
          padding: 1.25rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #00ffff 0%, #0088ff 100%);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-icon svg {
          width: 18px;
          height: 18px;
          color: #000000;
        }

        .logo-text {
          font-family: "Montserrat", sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 0;
        }

        .nav-section {
          margin-bottom: 1.5rem;
        }

        .nav-section-title {
          font-family: "Montserrat", sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          color: #555555;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0 1.25rem;
          margin-bottom: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 1.25rem;
          margin: 0.15rem 0.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .nav-item.active {
          background: rgba(0, 255, 255, 0.08);
        }

        .nav-item.active .nav-icon {
          color: #00ffff;
        }

        .nav-item.active .nav-label {
          color: #ffffff;
        }

        .nav-icon {
          width: 18px;
          height: 18px;
          color: #666666;
          transition: color 0.15s ease;
        }

        .nav-label {
          font-family: "Montserrat", sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #888888;
          transition: color 0.15s ease;
          flex: 1;
        }

        .nav-badge {
          font-family: "Montserrat", sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          color: #00ffff;
          background: rgba(0, 255, 255, 0.1);
          padding: 0.15rem 0.5rem;
          border-radius: 1rem;
        }

        .sidebar-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #00ff88;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(0, 255, 136, 0.5);
        }

        .status-text {
          font-family: "Montserrat", sans-serif;
          font-size: 0.75rem;
          color: #666666;
        }
      `}</style>

      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="logo-text">TEKOWORLD</span>
          </div>
        </div>

        <nav className="sidebar-content">
          <div className="nav-section">
            <div className="nav-section-title">Main</div>
            {mainItems.map((item) => (
              <div
                key={item.label}
                className={`nav-item ${activeItem === item.label ? "active" : ""}`}
                onClick={() => setActiveItem(item.label)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Insights</div>
            {insightsItems.map((item) => (
              <div
                key={item.label}
                className={`nav-item ${activeItem === item.label ? "active" : ""}`}
                onClick={() => setActiveItem(item.label)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span className="status-text">All systems operational</span>
          </div>
        </div>
      </aside>
    </>
  );
}
