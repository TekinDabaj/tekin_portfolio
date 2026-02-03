"use client";

import { ReactNode } from "react";

interface HomePageButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

export default function HomePageButton({
  children,
  onClick,
  className = "",
  compact = false,
}: HomePageButtonProps) {
  return (
    <>
      <style jsx>{`
        .learn-more {
          position: relative;
          display: inline-block;
          cursor: pointer;
          outline: none;
          border: 0;
          vertical-align: middle;
          text-decoration: none;
          font-family: "Montserrat", sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #e5e5e5;
          text-transform: uppercase;
          padding: 1.25em 2em;
          background: #0a0a0a;
          border: 2px solid #404040;
          border-radius: 0.75em;
          transform-style: preserve-3d;
          transition:
            transform 150ms cubic-bezier(0, 0, 0.58, 1),
            background 150ms cubic-bezier(0, 0, 0.58, 1);
        }

        .learn-more::before {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #1a1a1a;
          border-radius: inherit;
          box-shadow: 0 0 0 2px #404040;
          transform: translate3d(0, 0.75em, -1em);
          transition:
            transform 150ms cubic-bezier(0, 0, 0.58, 1),
            box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
        }

        .learn-more:hover {
          background: #171717;
          transform: translate(0, 0.25em);
        }

        .learn-more:hover::before {
          box-shadow: 0 0 0 2px #404040;
          transform: translate3d(0, 0.5em, -1em);
        }

        .learn-more:active {
          background: #171717;
          transform: translate(0em, 0.75em);
        }

        .learn-more:active::before {
          box-shadow: 0 0 0 2px #404040;
          transform: translate3d(0, 0, -1em);
        }

        .learn-more.compact {
          font-size: 11px;
          padding: 0.6em 1.2em;
          border-radius: 0.5em;
        }

        .learn-more.compact::before {
          transform: translate3d(0, 0.5em, -0.6em);
        }

        .learn-more.compact:hover::before {
          transform: translate3d(0, 0.35em, -0.6em);
        }

        .learn-more.compact:active::before {
          transform: translate3d(0, 0, -0.6em);
        }
      `}</style>

      <button onClick={onClick} className={`learn-more ${compact ? "compact" : ""} ${className}`}>
        {children}
      </button>
    </>
  );
}
