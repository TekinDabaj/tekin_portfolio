"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GridBackground from "./components/GridBackground";
import HomePageButton from "./components/HomePageButton";
import Loading from "./components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoginClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  const handleAboutClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/about");
    }, 2000);
  };

  const handleServicesClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/services");
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(0,0,0,0.5)_200%)] flex items-center justify-center">
        <GridBackground />
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-[radial-gradient(circle,rgba(255,255,255,1)_0%,rgba(0,0,0,0.5)_200%)]">
      <GridBackground />
      <div className="hero relative h-full flex flex-col items-center justify-center">
        <h1 className="m-0 p-0 text-white uppercase text-[80px] font-bold leading-none select-none [text-shadow:0_0_20px_rgba(0,0,0,1)]">
          TEKOWORLD
        </h1>
        <div className="flex gap-4 mt-8">
          <HomePageButton onClick={handleServicesClick}>Services</HomePageButton>
          <HomePageButton onClick={handleAboutClick}>About Us</HomePageButton>
          <HomePageButton onClick={handleLoginClick}>Dashboard Login</HomePageButton>
        </div>
      </div>
    </div>
  );
}
