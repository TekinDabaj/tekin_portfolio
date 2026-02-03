"use client";

import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();

  const services = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment on AWS, Google Cloud, and Azure platforms.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      title: "API Development",
      description: "RESTful and GraphQL APIs designed for performance, security, and seamless integration.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Cybersecurity",
      description: "Security audits, penetration testing, and implementation of robust security measures.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title: "Consulting",
      description: "Technical consulting and strategic guidance to help your business leverage technology effectively.",
    },
  ];

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

        .services-container {
          min-height: 100vh;
          background: #000000;
          display: flex;
          flex-direction: column;
        }

        .services-header {
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

        .services-main {
          flex: 1;
          padding: 0 4rem 3rem;
        }

        .services-title {
          font-family: "Montserrat", sans-serif;
          font-size: 3rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .services-subtitle {
          font-family: "Montserrat", sans-serif;
          font-size: 1.1rem;
          color: #00ffff;
          margin-bottom: 3rem;
          text-align: center;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .service-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1rem;
          padding: 1.75rem;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .service-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(0, 255, 255, 0.3);
          transform: translateY(-4px);
        }

        .service-icon {
          width: 48px;
          height: 48px;
          background: rgba(0, 255, 255, 0.1);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          color: #00ffff;
        }

        .service-icon svg {
          width: 24px;
          height: 24px;
        }

        .service-title {
          font-family: "Montserrat", sans-serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .service-desc {
          font-family: "Montserrat", sans-serif;
          font-size: 0.85rem;
          color: #666666;
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr;
          }

          .services-main {
            padding: 0 1.5rem 2rem;
          }
        }


      `}</style>

      <div className="services-container">
        <div className="services-header">
          <button className="back-button" onClick={() => router.push("/")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        <div className="services-main">
          <h1 className="services-title">Our Services</h1>
          <p className="services-subtitle">Comprehensive solutions for your digital needs</p>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
