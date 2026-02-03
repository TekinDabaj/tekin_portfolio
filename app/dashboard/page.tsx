import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface Profile {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default async function DashboardPage() {
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

  // Redirect based on role
  if (userRole === "admin") {
    redirect("/dashboard/admin");
  } else {
    redirect("/dashboard/user");
  }
}
