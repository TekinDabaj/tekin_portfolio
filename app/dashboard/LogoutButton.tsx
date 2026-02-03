"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <style jsx>{`
        .logout-btn {
          padding: 0.75rem 1.5rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #e5e5e5;
          background: transparent;
          border: 2px solid #404040;
          border-radius: 0.5rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: #1a1a1a;
          border-color: #555555;
        }
      `}</style>

      <button className="logout-btn" onClick={handleLogout}>
        Sign Out
      </button>
    </>
  );
}
