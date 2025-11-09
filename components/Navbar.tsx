"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "./ui/button";
import { Moon, Sun, Menu, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserNav } from "./auth/user-nav";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Pencarian", href: "/pencarian" },
  { label: "Chat Bot", href: "/chatbot" },
  { label: "Komunitas", href: "/komunitas" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const mobileMenu = document.getElementById("mobile-menu");
    const menuButton = document.getElementById("menu-button");

    const handleClickOutside = (event: MouseEvent) => {
      if (menuButton && menuButton.contains(event.target as Node)) {
        return;
      }
      if (mobileMenu && !mobileMenu.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex flex-col">
      <div className="z-10 w-full flex justify-between items-center px-4 md:px-8 py-2 backdrop-blur-md bg-background/80 border-b">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            id="menu-button"
            className="lg:hidden rounded-full"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.webp"
              width={40}
              height={40}
              alt="Logo"
              className="h-8 w-8 md:h-12 md:w-12 mr-2"
            />
            <span className="font-serif text-xl md:text-2xl font-semibold text-primary">
              Cakranesia
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-6 font-serif">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary text-muted-foreground hover:underline underline-offset-4 text-lg duration-300 transition-all font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle className="mr-2" />
          {session ? (
            <UserNav />
          ) : isPending ? (
            <Button
              size="sm"
              className="rounded-full text-xs"
              variant="default"
              disabled
            >
              <Loader2 className="animate-spin" size={8} />
            </Button>
          ) : (
            <Button
              size="sm"
              className="rounded-full text-xs"
              variant="default"
              asChild
            >
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="lg:hidden backdrop-blur-md bg-background/80 border-r -z-10 w-2/3 h-screen"
            id="mobile-menu"
          >
            <div className="flex flex-col px-4 pt-2 pb-4 gap-2 font-serif">
              {links.map((link) => (
                <Link
                  key={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-[70%] border-b px-4 py-2 hover:text-primary text-muted-foreground hover:underline underline-offset-4 duration-300 transition-all font-semibold"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        className={cn(className, "rounded-full cursor-pointer")}
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        suppressHydrationWarning
        {...props}
      >
        <div className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      className={cn(className, "rounded-full cursor-pointer")}
      variant="outline"
      size="icon"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      aria-label="Toggle theme"
      {...props}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};
