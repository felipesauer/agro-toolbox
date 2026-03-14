"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Search,
  Moon,
  Sun,
  Github,
  Leaf,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIAS } from "@/data/ferramentas";
import { cn } from "@/lib/utils";
import { CommandPalette } from "./CommandPalette";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-primary-800/20 bg-primary-900 text-white shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-lg shrink-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-400 text-primary-900">
              <Leaf className="h-4.5 w-4.5" />
            </div>
            <span className="hidden sm:block tracking-tight">AgroToolbox</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-2 flex-1">
            {CATEGORIAS.map((cat) => {
              const Icon = cat.icon;
              const active = pathname.startsWith(`/${cat.slug}`);
              return (
                <Link
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-white/20 text-white"
                      : "text-primary-200 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.nomeAbrev}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            <Button
              variant="ghost"
              onClick={() => setCommandOpen(true)}
              className="hidden sm:flex items-center gap-2 text-primary-200 hover:text-white hover:bg-white/10 h-9 px-3"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:block text-sm">Buscar...</span>
              <kbd className="hidden md:flex items-center gap-0.5 rounded bg-white/10 px-1.5 py-0.5 text-xs font-mono">
                <span className="text-[10px]">⌘</span>K
              </kbd>
            </Button>

            {/* History */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden md:flex text-primary-200 hover:text-white hover:bg-white/10 h-9 w-9"
            >
              <Link href="/historico">
                <History className="h-4 w-4" />
                <span className="sr-only">Histórico</span>
              </Link>
            </Button>

            {/* GitHub */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:flex text-primary-200 hover:text-white hover:bg-white/10 h-9 w-9"
            >
              <a
                href="https://github.com/felipesauer/agro-toolbox"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>

            {/* Dark Mode */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-primary-200 hover:text-white hover:bg-white/10 h-9 w-9"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="sr-only">Alternar tema</span>
              </Button>
            )}

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-primary-200 hover:text-white hover:bg-white/10 h-9 w-9"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-primary-800/30 bg-primary-950 px-4 py-3">
            {/* Mobile Search */}
            <button
              onClick={() => { setCommandOpen(true); setMobileOpen(false); }}
              className="flex w-full items-center gap-2 rounded-md border border-primary-800/40 bg-primary-900/50 px-3 py-2 text-sm text-primary-300 mb-3"
            >
              <Search className="h-4 w-4" />
              Buscar ferramenta...
              <kbd className="ml-auto flex items-center gap-0.5 rounded bg-primary-800/60 px-1.5 py-0.5 text-xs font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Categories Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {CATEGORIAS.map((cat) => {
                const Icon = cat.icon;
                const active = pathname.startsWith(`/${cat.slug}`);
                return (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-white/20 text-white"
                        : "text-primary-300 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {cat.nomeAbrev}
                  </Link>
                );
              })}

              <Link
                href="/historico"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-primary-300 hover:bg-white/10 hover:text-white"
              >
                <History className="h-4 w-4" />
                Histórico
              </Link>
              <a
                href="https://github.com/felipesauer/agro-toolbox"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-primary-300 hover:bg-white/10 hover:text-white"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        )}
      </header>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
