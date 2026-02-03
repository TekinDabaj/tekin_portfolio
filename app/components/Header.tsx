"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface HeaderProps {
  userEmail?: string;
}

export default function Header({ userEmail }: HeaderProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          height: 64px;
          background: rgba(10, 10, 10, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
          position: fixed;
          top: 0;
          left: 240px;
          right: 0;
          z-index: 100;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.85rem;
          color: #666666;
        }

        .breadcrumb-item {
          color: #888888;
          transition: color 0.2s ease;
        }

        .breadcrumb-item:hover {
          color: #ffffff;
        }

        .breadcrumb-separator {
          color: #404040;
        }

        .breadcrumb-current {
          color: #ffffff;
          font-weight: 500;
        }

        .search-container {
          position: relative;
        }

        .search-input {
          width: 280px;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.8rem;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.5rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 255, 255, 0.3);
        }

        .search-input::placeholder {
          color: #555555;
        }

        .search-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          width: 14px;
          height: 14px;
          color: #555555;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: background 0.2s ease;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00ffff 0%, #0088ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Montserrat", sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: #000000;
        }

        .user-email {
          font-family: "Montserrat", sans-serif;
          font-size: 0.8rem;
          color: #888888;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          color: #ff6b6b;
          background: rgba(255, 107, 107, 0.1);
          border: 1px solid rgba(255, 107, 107, 0.2);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .logout-btn:hover {
          background: rgba(255, 107, 107, 0.15);
          border-color: rgba(255, 107, 107, 0.4);
          box-shadow: 0 0 20px rgba(255, 107, 107, 0.1);
        }

        .logout-icon {
          width: 14px;
          height: 14px;
        }
      `}</style>

      <header className="header">
        <div className="header-left">
          <div className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Dashboard</span>
          </div>
          <div className="search-container">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search issues, events, users..."
            />
          </div>
        </div>

        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="user-email">{userEmail || "User"}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <svg className="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </header>
    </>
  );
}
