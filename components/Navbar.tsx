"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "./ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserNav } from "./auth/user-nav";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 backdrop-blur-md bg-background/50 border-b">
      <div className="w-full flex justify-between items-center px-4 md:px-8 py-2">
        <div className="flex items-center">
          <Image
            src="/logo.webp"
            width={40}
            height={40}
            alt="Logo"
            className="h-12 w-12 mr-2"
          />
          <span className="font-serif text-xl md:text-2xl font-semibold text-primary">
            Cakranesia
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle className="mr-2" />

          <Suspense fallback={<div>Loading...</div>}>
            {session ? (
              <div className="flex items-center gap-2">
                {session.user.role === "admin" && (
                  <Button size="sm" variant="default" asChild>
                    <Link href="/admin">Admin Panel</Link>
                  </Button>
                )}
                <UserNav />
              </div>
            ) : (
              <>
                <Button
                  size="sm"
                  className="rounded-none text-xs"
                  variant="default"
                  asChild
                >
                  <Link href="/auth/sign-in">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  className="rounded-none text-xs"
                  variant="secondary"
                  asChild
                >
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </Suspense>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-2 border-t">
              <Suspense fallback={<div>Loading...</div>}>
                {session ? (
                  <div className="flex flex-col gap-2">
                    {session.user.role === "admin" && (
                      <Button size="sm" variant="default" asChild>
                        <Link href="/admin">Admin Panel</Link>
                      </Button>
                    )}
                    <UserNav />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      className="rounded-none text-xs"
                      variant="default"
                      asChild
                    >
                      <Link href="/auth/sign-in">Sign In</Link>
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-none text-xs"
                      variant="secondary"
                      asChild
                    >
                      <Link href="/auth/sign-up">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const ThemeToggle = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  return (
    <Button
      className={cn(className, "rounded-full cursor-pointer")}
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      {...props}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};
