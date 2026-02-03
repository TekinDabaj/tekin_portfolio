import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

        .dashboard-layout {
          min-height: 100vh;
          background: #000000;
        }

        .dashboard-main {
          margin-left: 240px;
          padding-top: 64px;
          min-height: 100vh;
        }

        .dashboard-content {
          padding: 2rem;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-title {
          font-family: "Montserrat", sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
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

        .stat-icon.cyan {
          background: rgba(0, 255, 255, 0.1);
          color: #00ffff;
        }

        .stat-icon.green {
          background: rgba(0, 255, 136, 0.1);
          color: #00ff88;
        }

        .stat-icon.orange {
          background: rgba(255, 170, 0, 0.1);
          color: #ffaa00;
        }

        .stat-icon.red {
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
        }

        .stat-trend {
          font-family: "Montserrat", sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 0.35rem;
        }

        .stat-trend.up {
          background: rgba(0, 255, 136, 0.1);
          color: #00ff88;
        }

        .stat-trend.down {
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
        }

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

        .card-action:hover {
          opacity: 0.8;
        }

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

        .issue-item:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        .issue-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-top: 0.35rem;
          flex-shrink: 0;
        }

        .issue-status.error {
          background: #ff6b6b;
          box-shadow: 0 0 8px rgba(255, 107, 107, 0.5);
        }

        .issue-status.warning {
          background: #ffaa00;
          box-shadow: 0 0 8px rgba(255, 170, 0, 0.5);
        }

        .issue-content {
          flex: 1;
          min-width: 0;
        }

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

        .activity-content {
          flex: 1;
        }

        .activity-text {
          font-family: "Montserrat", sans-serif;
          font-size: 0.8rem;
          color: #888888;
          margin-bottom: 0.25rem;
        }

        .activity-text strong {
          color: #ffffff;
          font-weight: 500;
        }

        .activity-time {
          font-family: "Montserrat", sans-serif;
          font-size: 0.7rem;
          color: #555555;
        }

        .empty-state {
          text-align: center;
          padding: 2rem;
        }

        .empty-state-text {
          font-family: "Montserrat", sans-serif;
          font-size: 0.85rem;
          color: #555555;
        }
      `}</style>

      <div className="dashboard-layout">
        <Sidebar />
        <Header userEmail={user.email} />

        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="page-header">
              <h1 className="page-title">Dashboard Overview</h1>
              <p className="page-subtitle">Monitor your application performance and issues in real-time</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon cyan">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <span className="stat-trend up">+12%</span>
                </div>
                <div className="stat-value">2,847</div>
                <div className="stat-label">Total Events</div>
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
                <div className="stat-value">98.2%</div>
                <div className="stat-label">Crash Free Rate</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon orange">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                  </div>
                  <span className="stat-trend up">+5%</span>
                </div>
                <div className="stat-value">1.2s</div>
                <div className="stat-label">Avg Response Time</div>
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
                    <div className="issue-item">
                      <div className="issue-status warning"></div>
                      <div className="issue-content">
                        <div className="issue-title">Unhandled Promise Rejection: Network Error</div>
                        <div className="issue-meta">services/api.ts - First seen 2 days ago</div>
                      </div>
                      <div className="issue-count">34</div>
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
                        <div className="activity-text"><strong>Issue #234</strong> marked as resolved</div>
                        <div className="activity-time">15 minutes ago</div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-dot"></div>
                      <div className="activity-content">
                        <div className="activity-text"><strong>New release</strong> v2.4.1 published</div>
                        <div className="activity-time">1 hour ago</div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-dot"></div>
                      <div className="activity-content">
                        <div className="activity-text"><strong>Alert</strong> threshold updated</div>
                        <div className="activity-time">3 hours ago</div>
                      </div>
                    </div>
                    <div className="activity-item">
                      <div className="activity-dot"></div>
                      <div className="activity-content">
                        <div className="activity-text"><strong>Team member</strong> joined project</div>
                        <div className="activity-time">5 hours ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
