"use client";

import { useRouter } from "next/navigation";
import PyramidBackground from "../components/Pyramid";

export default function AboutPage() {
  const router = useRouter();

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

        .about-container {
          height: 100vh;
          background: #000000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .about-header {
          padding: 1.5rem 2rem;
          flex-shrink: 0;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          font-family: "Montserrat", sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: #888888;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-button:hover {
          color: #00ffff;
          border-color: rgba(0, 255, 255, 0.4);
          background: rgba(0, 255, 255, 0.05);
        }

        .back-button svg {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }

        .back-button:hover svg {
          transform: translateX(-3px);
        }

        .about-main {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 4rem 2rem;
          gap: 4rem;
        }

        .about-left {
          flex: 1;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-self: flex-start;
          margin-top: 2rem;
        }

        .pyramid-wrapper {
          width: 300px;
          height: 260px;
          margin-bottom: 1rem;
          position: relative;
        }

        .about-title {
          font-family: "Montserrat", sans-serif;
          font-size: 3.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
          line-height: 1.1;
        }

        .about-subtitle {
          font-family: "Montserrat", sans-serif;
          font-size: 1.1rem;
          color: #00ffff;
          margin-bottom: 1.5rem;
        }

        .about-text {
          font-family: "Montserrat", sans-serif;
          font-size: 0.9rem;
          color: #888888;
          line-height: 1.7;
        }

        .about-right {
          flex: 2;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 1rem;
          height: 100%;
          max-height: 400px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1rem;
          padding: 1.25rem;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .feature-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(0, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          background: rgba(0, 255, 255, 0.1);
          border-radius: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          color: #00ffff;
        }

        .feature-icon svg {
          width: 20px;
          height: 20px;
        }

        .feature-title {
          font-family: "Montserrat", sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.35rem;
        }

        .feature-desc {
          font-family: "Montserrat", sans-serif;
          font-size: 0.8rem;
          color: #666666;
          line-height: 1.5;
        }
      `}</style>

      <div className="about-container">
        <div className="about-header">
          <button className="back-button" onClick={() => router.push("/")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        <div className="about-main">
          <div className="about-left">
            <div className="pyramid-wrapper">
              <PyramidBackground
                containerId="about-pyramid"
                width={300}
                height={260}
                className="w-full h-full"
                cameraDistance={2.5}
              />
            </div>
            <h1 className="about-title">About Us</h1>
            <p className="about-subtitle">Building the future of technology</p>
            <p className="about-text">
              Tekoworld is a cutting-edge technology company dedicated to creating innovative
              solutions that transform the way businesses operate. We combine technical expertise
              with creative thinking to solve complex challenges and deliver excellence.
            </p>
          </div>

          <div className="about-right">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="feature-title">Innovation</h3>
              <p className="feature-desc">
                Pushing boundaries with cutting-edge technologies and creative solutions.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="feature-title">Collaboration</h3>
              <p className="feature-desc">
                Working together with clients to achieve exceptional results.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="feature-title">Quality</h3>
              <p className="feature-desc">
                Delivering excellence through rigorous standards and best practices.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="feature-title">Reliability</h3>
              <p className="feature-desc">
                Building robust systems you can depend on, 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
