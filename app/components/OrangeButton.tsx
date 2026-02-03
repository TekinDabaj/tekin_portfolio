"use client";

import { ReactNode } from "react";

interface OrangeButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

export default function OrangeButton({
  children,
  onClick,
  className = "",
  compact = false,
}: OrangeButtonProps) {
  return (
    <>
      <style jsx>{`
        .orange-btn {
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
          border: 2px solid #f97316;
          border-radius: 0.75em;
          transform-style: preserve-3d;
          transition:
            transform 150ms cubic-bezier(0, 0, 0.58, 1),
            background 150ms cubic-bezier(0, 0, 0.58, 1);
        }

        .orange-btn::before {
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
          box-shadow: 0 0 0 2px #f97316;
          transform: translate3d(0, 0.75em, -1em);
          transition:
            transform 150ms cubic-bezier(0, 0, 0.58, 1),
            box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
        }

        .orange-btn:hover {
          background: #171717;
          transform: translate(0, 0.25em);
        }

        .orange-btn:hover::before {
          box-shadow: 0 0 0 2px #f97316;
          transform: translate3d(0, 0.5em, -1em);
        }

        .orange-btn:active {
          background: #171717;
          transform: translate(0em, 0.75em);
        }

        .orange-btn:active::before {
          box-shadow: 0 0 0 2px #f97316;
          transform: translate3d(0, 0, -1em);
        }

        .orange-btn.compact {
          font-size: 11px;
          padding: 0.6em 1.2em;
          border-radius: 0.5em;
        }

        .orange-btn.compact::before {
          transform: translate3d(0, 0.5em, -0.6em);
        }

        .orange-btn.compact:hover::before {
          transform: translate3d(0, 0.35em, -0.6em);
        }

        .orange-btn.compact:active::before {
          transform: translate3d(0, 0, -0.6em);
        }
      `}</style>

      <button onClick={onClick} className={`orange-btn ${compact ? "compact" : ""} ${className}`}>
        {children}
      </button>
    </>
  );
}
