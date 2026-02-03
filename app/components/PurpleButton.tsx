"use client";

import { ReactNode } from "react";

interface PurpleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

export default function PurpleButton({
  children,
  onClick,
  className = "",
  compact = false,
}: PurpleButtonProps) {
  return (
    <>
      <style jsx>{`
        .purple-btn {
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
          border: 2px solid #a855f7;
          border-radius: 0.75em;
          transform-style: preserve-3d;
          transition:
            transform 150ms cubic-bezier(0, 0, 0.58, 1),
            background 150ms cubic-bezier(0, 0, 0.58, 1);
        }

        .purple-btn::before {
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
          box-shadow: 0 0 0 2px #a855f7;
          transform: translate3d(0, 0.75em, -1em);
          transition:
            transform 150ms cubic-bezier(0, 0, 0.58, 1),
            box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
        }

        .purple-btn:hover {
          background: #171717;
          transform: translate(0, 0.25em);
        }

        .purple-btn:hover::before {
          box-shadow: 0 0 0 2px #a855f7;
          transform: translate3d(0, 0.5em, -1em);
        }

        .purple-btn:active {
          background: #171717;
          transform: translate(0em, 0.75em);
        }

        .purple-btn:active::before {
          box-shadow: 0 0 0 2px #a855f7;
          transform: translate3d(0, 0, -1em);
        }

        .purple-btn.compact {
          font-size: 11px;
          padding: 0.6em 1.2em;
          border-radius: 0.5em;
        }

        .purple-btn.compact::before {
          transform: translate3d(0, 0.5em, -0.6em);
        }

        .purple-btn.compact:hover::before {
          transform: translate3d(0, 0.35em, -0.6em);
        }

        .purple-btn.compact:active::before {
          transform: translate3d(0, 0, -0.6em);
        }
      `}</style>

      <button onClick={onClick} className={`purple-btn ${compact ? "compact" : ""} ${className}`}>
        {children}
      </button>
    </>
  );
}
