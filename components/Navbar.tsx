"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "./ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 backdrop-blur-md bg-background/80 border-b">
      <div className="w-full flex justify-between items-center px-4 md:px-8 py-2">
        <div className="flex items-center">
          <Image
            src="/logo.webp"
            width={32}
            height={32}
            alt="Logo"
            className="h-8 mr-2"
          />
          <span className="font-serif text-xl md:text-2xl font-semibold text-primary">
            Cakranesia
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle className="mr-2" />

          {session ? (
            <>
              <Button size="sm" variant="outline" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button
                size="sm"
                variant="default"
                onClick={() => {
                  authClient.signOut().then(() => {
                    redirect("/auth/sign-in");
                  });
                }}
              >
                Sign Out
              </Button>
            </>
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
        </div>
      </div>
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
