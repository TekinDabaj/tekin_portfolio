import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

interface Profile {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user profile with role
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  const userRole = profile?.role || "user";

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

        .dashboard-layout {
          min-height: 100vh;
          background: #000000;
        }

        .dashboard-main {
          margin-left: 56px;
          padding-top: 64px;
          min-height: 100vh;
        }

        .dashboard-content {
          padding: 2rem;
        }
      `}</style>

      <div className="dashboard-layout">
        <Sidebar />
        <Header userEmail={user.email} userRole={userRole} />
        <main className="dashboard-main">
          <div className="dashboard-content">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
