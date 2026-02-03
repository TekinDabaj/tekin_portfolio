"use client";

import { ReactNode } from "react";

interface BlueButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

export default function BlueButton({
  children,
  onClick,
  className = "",
  compact = false,
}: BlueButtonProps) {
  return (
    <>
      <style jsx>{`
        .blue-btn {
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
          border: 2px solid #3b82f6;
          border-radius: 0.75em;
          transform-style: preserve-3d;
          transition:
            transform 150ms cubic-bezier(0, 0, 0.58, 1),
            background 150ms cubic-bezier(0, 0, 0.58, 1);
        }

        .blue-btn::before {
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
          box-shadow: 0 0 0 2px #3b82f6;
          transform: translate3d(0, 0.75em, -1em);
          transition:
            transform 150ms cubic-bezier(0, 0, 0.58, 1),
            box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
        }

        .blue-btn:hover {
          background: #171717;
          transform: translate(0, 0.25em);
        }

        .blue-btn:hover::before {
          box-shadow: 0 0 0 2px #3b82f6;
          transform: translate3d(0, 0.5em, -1em);
        }

        .blue-btn:active {
          background: #171717;
          transform: translate(0em, 0.75em);
        }

        .blue-btn:active::before {
          box-shadow: 0 0 0 2px #3b82f6;
          transform: translate3d(0, 0, -1em);
        }

        .blue-btn.compact {
          font-size: 11px;
          padding: 0.6em 1.2em;
          border-radius: 0.5em;
        }

        .blue-btn.compact::before {
          transform: translate3d(0, 0.5em, -0.6em);
        }

        .blue-btn.compact:hover::before {
          transform: translate3d(0, 0.35em, -0.6em);
        }

        .blue-btn.compact:active::before {
          transform: translate3d(0, 0, -0.6em);
        }
      `}</style>

      <button onClick={onClick} className={`blue-btn ${compact ? "compact" : ""} ${className}`}>
        {children}
      </button>
    </>
  );
}
