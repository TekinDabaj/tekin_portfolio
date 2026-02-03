"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import HomePageButton from "./HomePageButton";
import Loading from "./Loading";

interface HeaderProps {
  userEmail?: string;
  userRole?: string;
}

export default function Header({ userEmail, userRole = "user" }: HeaderProps) {
  const isAdmin = userRole === "admin";
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();

    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 2000);
  };

  if (isLoggingOut) {
    return (
      <div className="logout-loading-overlay">
        <style jsx>{`
          .logout-loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
          }
        `}</style>
        <Loading />
      </div>
    );
  }

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
          left: 0;
          right: 0;
          z-index: 300;
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

        .role-badge {
          font-family: "Montserrat", sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.25rem 0.5rem;
          border-radius: 0.35rem;
        }

        .role-badge.admin {
          background: linear-gradient(135deg, rgba(255, 170, 0, 0.2) 0%, rgba(255, 100, 0, 0.2) 100%);
          color: #ffaa00;
          border: 1px solid rgba(255, 170, 0, 0.3);
        }

        .role-badge.user {
          background: rgba(0, 255, 255, 0.1);
          color: #00ffff;
          border: 1px solid rgba(0, 255, 255, 0.2);
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
          <span className={`role-badge ${isAdmin ? "admin" : "user"}`}>
            {isAdmin ? "Admin" : "User"}
          </span>
          <div className="user-info">
            <div className="user-avatar">
              {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="user-email">{userEmail || "User"}</span>
          </div>
          <HomePageButton onClick={handleLogout} compact>Logout</HomePageButton>
        </div>
      </header>
    </>
  );
}
