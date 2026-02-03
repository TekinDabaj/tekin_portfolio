import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

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
        .dashboard-container {
          min-height: 100vh;
          background: radial-gradient(
            circle,
            rgba(20, 20, 20, 1) 0%,
            rgba(0, 0, 0, 1) 100%
          );
          padding: 2rem;
        }

        .dashboard-header {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: rgba(15, 15, 15, 0.9);
          border: 1px solid #2a2a2a;
          border-radius: 1rem;
        }

        .dashboard-title {
          font-family: "Montserrat", sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .dashboard-email {
          font-family: "Montserrat", sans-serif;
          font-size: 1rem;
          color: #888888;
          margin-bottom: 1.5rem;
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-email">Logged in as: {user.email}</p>
          <LogoutButton />
        </div>
      </div>
    </>
  );
}
