"use client";

import { useMemo } from "react";
import { useTheme, teamThemes } from "@/providers/theme";
import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faRss, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/archive", label: "Archive" },
  { href: "/topics", label: "Topics" },
  { href: "/about", label: "About" },
];

const connectLinks = [
  {
    href: "https://x.com/aarondurant80",
    label: "X",
    icon: faXTwitter,
    lightColor: "#000000",
    darkColor: "#FFFFFF",
  },
  {
    href: "https://aarondurant.com/",
    label: "RSS",
    icon: faRss,
    defaultColor: "#FF6600",
  },
  {
    href: "mailto:moto@aarondurant.com",
    label: "Email",
    icon: faEnvelope,
    defaultColor: "#D44638",
  },
  {
    href: "https://www.youtube.com/@aarondurant80",
    label: "YouTube",
    icon: faYoutube,
    defaultColor: "#FF0000",
  },
  {
    href: "https://www.instagram.com/aarondurant80/",
    label: "Instagram",
    icon: faInstagram,
    defaultColor: "#C13584",
  },
];

export default function Sidebar() {
  const { theme, toggleTheme, setTeam, team } = useTheme();

  const memoizedConnectLinks = useMemo(
    () =>
      connectLinks.map(
        ({ href, label, icon, lightColor, darkColor, defaultColor }) => ({
          href,
          label,
          icon,
          color: defaultColor || (theme === "light" ? lightColor : darkColor),
        })
      ),
    [theme]
  );

  const themeKeys = Object.keys(teamThemes) as Array<keyof typeof teamThemes>;

  return (
    <aside className="flex-shrink-0 basis-[270px] p-6 border-l border-[var(--accent)]">
      <div className="flex items-center mb-6">
        <Image
          src="/Table-Over-Two-logo.png"
          alt="Table Over Two motocross website logo"
          width={48}
          height={48}
          className="mr-3 rounded"
        />
        <h1 className="text-xl font-bold text-foreground">Table Over Two</h1>
      </div>

      <nav className="flex flex-col space-y-2">
        {navigationLinks.map(({ href, label }) => (
          <Link key={href} href={href} className="text-[22px] font-bold">
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        <div className="grid grid-cols-4 gap-4">
          {themeKeys.map((teamKey) => (
            <button
              key={teamKey}
              onClick={() => setTeam(teamKey)}
              className={`w-7 h-7 rounded-full ${
                team === teamKey
                  ? "ring-2 ring-offset-1 ring-offset-background ring-link"
                  : ""
              }`}
              style={{
                backgroundColor: teamThemes[teamKey].bubble,
              }}
              aria-label={teamKey}
            />
          ))}
        </div>
        <div className="mt-4 text-gray-500">
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-1 hover:underline"
          >
            {theme === "light" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
                <span>Dark</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-yellow-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
                <span>Light</span>
              </>
            )}
          </button>
          {team !== "default" && teamThemes[team].teamName && (
            <div className="mt-1">{teamThemes[team].teamName}</div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Connect</h2>
        <ul className="space-y-2">
          {memoizedConnectLinks.map(({ href, label, icon, color }) => (
            <li key={href} className="flex items-center space-x-2">
              <a
                href={href}
                className="flex items-center hover:underline"
                aria-label={label}
              >
                <FontAwesomeIcon
                  icon={icon}
                  style={{ color }}
                  className="w-5 h-5 mr-2"
                />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 space-y-4 text-sm">
        <p>
          <strong>Table Over Two</strong>: Breaking down motocross success since
          2025.
        </p>
      </div>
    </aside>
  );
}
