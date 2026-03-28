"use client";

import {
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ThemeSidebarSection } from "@/components/theme/ThemeSidebarSection";
import { useTheme } from "@/providers/theme";

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
    href: "mailto:moto@aarondurant.com",
    label: "Email",
    icon: faEnvelope,
    defaultColor: "#1E90FF",
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

/** kottke.org-inspired sidebar; type stays below main headlines. Site wordmark is one line, always full text (no truncation). */
export default function Sidebar() {
  const { resolvedAppearance } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const memoizedConnectLinks = useMemo(
    () =>
      connectLinks.map(
        ({ href, label, icon, lightColor, darkColor, defaultColor }) => ({
          href,
          label,
          icon,
          color:
            defaultColor ||
            (resolvedAppearance === "light" ? lightColor : darkColor),
        })
      ),
    [resolvedAppearance]
  );

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.querySelector("aside");
      if (isOpen && sidebar && !sidebar.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <div className="relative">
      <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between gap-2 bg-background/70 px-3 shadow-lg backdrop-blur-md sm:hidden">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex min-w-0 items-center gap-2 no-underline hover:no-underline"
        >
          <Image
            src="/Table-Over-Two-logo.png"
            alt="Table Over Two logo"
            width={36}
            height={36}
            className="size-9 shrink-0 rounded"
          />
          <h2 className="whitespace-nowrap text-base font-bold leading-tight text-foreground">
            Table Over Two
          </h2>
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-transparent rounded-md p-2"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className="text-sm font-bold tracking-wide text-foreground">
            MENU
          </span>
          {isOpen ? (
            <XMarkIcon className="h-5 w-5 text-foreground" />
          ) : (
            <Bars3Icon className="h-5 w-5 text-foreground" />
          )}
        </button>
      </div>

      <aside
        className={`fixed top-0 right-0 h-full z-40 bg-background shadow-lg p-6 transition-transform w-full sm:w-[260px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } sm:translate-x-0 sm:relative sm:top-auto sm:right-auto sm:h-auto sm:shadow-none max-w-[220px] sm:max-w-none pt-20 sm:pt-6`}
      >
        <div className="mb-6 hidden items-center gap-3 sm:flex sm:w-full">
          <Image
            src="/Table-Over-Two-logo.png"
            alt="Table Over Two logo"
            width={48}
            height={48}
            className="size-12 shrink-0 rounded"
          />
          <h2 className="whitespace-nowrap text-xl font-bold leading-tight text-foreground">
            Table Over Two
          </h2>
        </div>
        <nav className="flex flex-col gap-2.5" aria-label="Primary">
          {navigationLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="block w-fit text-lg font-semibold leading-snug hover:underline"
            >
              {label}
            </Link>
          ))}
        </nav>

        <ThemeSidebarSection />

        <div className="mt-8">
          <h2 className="mb-1 text-base font-bold leading-snug">
            By Aaron Durant
          </h2>
          <p className="text-sm leading-relaxed text-secondary">
            On the mindset and strategy behind motocross success.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="mb-2 text-base font-bold leading-snug">Connect</h2>
          <ul className="space-y-1.5">
            {memoizedConnectLinks.map(({ href, label, icon, color }) => (
              <li key={href} className="w-fit">
                <a
                  href={href}
                  className="flex items-center text-sm leading-snug hover:underline"
                  aria-label={label}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    style={{ color }}
                    className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                  />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
