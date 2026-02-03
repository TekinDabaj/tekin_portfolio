import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PurpleButton from "@/app/components/PurpleButton";

interface Profile {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default async function UserDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  // If admin tries to access user dashboard, redirect to admin
  if (profile?.role === "admin") {
    redirect("/dashboard/admin");
  }

  return (
    <>
      <style>{`
        .user-dashboard {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 64px - 4rem);
        }

        .greeting {
          font-family: "Montserrat", sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 2rem;
        }
      `}</style>

      <div className="user-dashboard">
        <h1 className="greeting">Hello, {user.email}</h1>
        <PurpleButton>Create Project</PurpleButton>
      </div>
    </>
  );
}
