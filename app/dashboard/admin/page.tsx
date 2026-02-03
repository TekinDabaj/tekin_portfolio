import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface Profile {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Verify admin role
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  if (profile?.role !== "admin") {
    redirect("/dashboard/user");
  }

  return (
    <>
      <style>{`
        .page-header {
          margin-bottom: 2rem;
        }

        .page-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .page-title {
          font-family: "Montserrat", sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
        }

        .role-badge {
          font-family: "Montserrat", sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.3rem 0.6rem;
          border-radius: 0.35rem;
          background: linear-gradient(135deg, rgba(255, 170, 0, 0.2) 0%, rgba(255, 100, 0, 0.2) 100%);
          color: #ffaa00;
          border: 1px solid rgba(255, 170, 0, 0.3);
        }

        .page-subtitle {
          font-family: "Montserrat", sans-serif;
          font-size: 0.9rem;
          color: #666666;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: rgba(15, 15, 15, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          background: rgba(20, 20, 20, 0.8);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .stat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon svg {
          width: 20px;
          height: 20px;
        }

        .stat-icon.cyan { background: rgba(0, 255, 255, 0.1); color: #00ffff; }
        .stat-icon.green { background: rgba(0, 255, 136, 0.1); color: #00ff88; }
        .stat-icon.orange { background: rgba(255, 170, 0, 0.1); color: #ffaa00; }
        .stat-icon.red { background: rgba(255, 107, 107, 0.1); color: #ff6b6b; }
        .stat-icon.purple { background: rgba(168, 85, 247, 0.1); color: #a855f7; }

        .stat-trend {
          font-family: "Montserrat", sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 0.35rem;
        }

        .stat-trend.up { background: rgba(0, 255, 136, 0.1); color: #00ff88; }
        .stat-trend.down { background: rgba(255, 107, 107, 0.1); color: #ff6b6b; }

        .stat-value {
          font-family: "Montserrat", sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-family: "Montserrat", sans-serif;
          font-size: 0.8rem;
          color: #666666;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .card {
          background: rgba(15, 15, 15, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1rem;
          overflow: hidden;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .card-title {
          font-family: "Montserrat", sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
        }

        .card-action {
          font-family: "Montserrat", sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: #00ffff;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .card-action:hover { opacity: 0.8; }

        .card-body {
          padding: 1.25rem 1.5rem;
        }

        .issue-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .issue-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 0.75rem;
          transition: background 0.2s ease;
        }

        .issue-item:hover { background: rgba(255, 255, 255, 0.04); }

        .issue-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-top: 0.35rem;
          flex-shrink: 0;
        }

        .issue-status.error { background: #ff6b6b; box-shadow: 0 0 8px rgba(255, 107, 107, 0.5); }
        .issue-status.warning { background: #ffaa00; box-shadow: 0 0 8px rgba(255, 170, 0, 0.5); }

        .issue-content { flex: 1; min-width: 0; }

        .issue-title {
          font-family: "Montserrat", sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 0.35rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .issue-meta {
          font-family: "Montserrat", sans-serif;
          font-size: 0.75rem;
          color: #555555;
        }

        .issue-count {
          font-family: "Montserrat", sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: #888888;
          flex-shrink: 0;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .activity-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00ffff;
          margin-top: 0.4rem;
          flex-shrink: 0;
        }

        .activity-content { flex: 1; }

        .activity-text {
          font-family: "Montserrat", sans-serif;
          font-size: 0.8rem;
          color: #888888;
          margin-bottom: 0.25rem;
        }

        .activity-text strong { color: #ffffff; font-weight: 500; }

        .activity-time {
          font-family: "Montserrat", sans-serif;
          font-size: 0.7rem;
          color: #555555;
        }

        .admin-section {
          margin-top: 0;
        }

        .admin-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .admin-badge {
          font-family: "Montserrat", sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.75rem;
          border-radius: 0.35rem;
          background: linear-gradient(135deg, rgba(255, 170, 0, 0.2) 0%, rgba(255, 100, 0, 0.2) 100%);
          color: #ffaa00;
          border: 1px solid rgba(255, 170, 0, 0.3);
        }

        .admin-title {
          font-family: "Montserrat", sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
        }

        .admin-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        .admin-card {
          background: rgba(255, 170, 0, 0.03);
          border: 1px solid rgba(255, 170, 0, 0.1);
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .admin-card:hover {
          background: rgba(255, 170, 0, 0.06);
          border-color: rgba(255, 170, 0, 0.2);
          transform: translateY(-2px);
        }

        .admin-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 0.75rem;
          background: rgba(255, 170, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: #ffaa00;
        }

        .admin-card-icon svg {
          width: 22px;
          height: 22px;
        }

        .admin-card-title {
          font-family: "Montserrat", sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.35rem;
        }

        .admin-card-desc {
          font-family: "Montserrat", sans-serif;
          font-size: 0.8rem;
          color: #666666;
          line-height: 1.5;
        }
      `}</style>

      <div className="page-header">
        <div className="page-title-row">
          <h1 className="page-title">Admin Dashboard</h1>
          <span className="role-badge">Admin</span>
        </div>
        <p className="page-subtitle">
          Full administrative access to monitor and manage your application
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon cyan">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className="stat-trend up">+18%</span>
          </div>
          <div className="stat-value">1,284</div>
          <div className="stat-label">Total Users</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon red">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <span className="stat-trend down">-8%</span>
          </div>
          <div className="stat-value">24</div>
          <div className="stat-label">Unresolved Issues</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22,4 12,14.01 9,11.01" />
              </svg>
            </div>
            <span className="stat-trend up">+24%</span>
          </div>
          <div className="stat-value">99.9%</div>
          <div className="stat-label">System Uptime</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon purple">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span className="stat-trend up">+12%</span>
          </div>
          <div className="stat-value">847</div>
          <div className="stat-label">Events Today</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Issues</span>
            <span className="card-action">View All</span>
          </div>
          <div className="card-body">
            <div className="issue-list">
              <div className="issue-item">
                <div className="issue-status error"></div>
                <div className="issue-content">
                  <div className="issue-title">TypeError: Cannot read property &apos;map&apos; of undefined</div>
                  <div className="issue-meta">api/users/route.ts - First seen 2 hours ago</div>
                </div>
                <div className="issue-count">142</div>
              </div>
              <div className="issue-item">
                <div className="issue-status error"></div>
                <div className="issue-content">
                  <div className="issue-title">ReferenceError: window is not defined</div>
                  <div className="issue-meta">components/Chart.tsx - First seen 5 hours ago</div>
                </div>
                <div className="issue-count">89</div>
              </div>
              <div className="issue-item">
                <div className="issue-status warning"></div>
                <div className="issue-content">
                  <div className="issue-title">Warning: Each child should have a unique &quot;key&quot; prop</div>
                  <div className="issue-meta">components/List.tsx - First seen 1 day ago</div>
                </div>
                <div className="issue-count">56</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Activity</span>
            <span className="card-action">View All</span>
          </div>
          <div className="card-body">
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <div className="activity-text"><strong>Deploy</strong> completed successfully</div>
                  <div className="activity-time">2 minutes ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <div className="activity-text"><strong>New user</strong> registered</div>
                  <div className="activity-time">15 minutes ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <div className="activity-text"><strong>Role updated</strong> for user@example.com</div>
                  <div className="activity-time">1 hour ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <div className="activity-text"><strong>System backup</strong> completed</div>
                  <div className="activity-time">3 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <div className="admin-header">
          <span className="admin-badge">Admin Only</span>
          <span className="admin-title">Administration Panel</span>
        </div>
        <div className="admin-grid">
          <div className="admin-card">
            <div className="admin-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="admin-card-title">User Management</div>
            <div className="admin-card-desc">Manage user accounts, roles, and permissions across the platform.</div>
          </div>
          <div className="admin-card">
            <div className="admin-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
            <div className="admin-card-title">System Settings</div>
            <div className="admin-card-desc">Configure application settings, integrations, and global preferences.</div>
          </div>
          <div className="admin-card">
            <div className="admin-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <div className="admin-card-title">Audit Logs</div>
            <div className="admin-card-desc">View detailed activity logs and track all system events and changes.</div>
          </div>
        </div>
      </div>
    </>
  );
}
