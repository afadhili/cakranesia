"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted p-4">
      <Card className="w-full max-w-2xl border-none shadow-2xl">
        <CardContent className="pt-12 pb-10 px-6 md:px-12">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Logo */}
            <div className="relative">
              <Image
                src="/logo.webp"
                alt="Cakranesia Logo"
                width={120}
                height={120}
                className="rounded-2xl opacity-90"
              />
            </div>

            {/* Error Icon */}
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>

            {/* Error Text */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Terjadi Kesalahan
              </h1>
              <p className="text-lg text-muted-foreground">
                Maaf, ada yang tidak beres di dapur kami
              </p>
            </div>

            {/* Error Details */}
            {process.env.NODE_ENV === "development" && (
              <div className="w-full max-w-md p-4 bg-muted rounded-lg">
                <p className="text-xs font-mono text-left break-all text-muted-foreground">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-muted-foreground max-w-md">
              Jangan khawatir! Tim kami sudah mengetahui masalah ini. Silakan
              coba lagi atau kembali ke beranda.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-4">
              <Button onClick={reset} size="lg" className="w-full sm:w-auto">
                <RefreshCw className="mr-2 h-4 w-4" />
                Coba Lagi
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Kembali ke Beranda
                </Link>
              </Button>
            </div>

            {/* Tagline */}
            <div className="pt-6 border-t border-border/50 w-full">
              <p className="text-xs text-muted-foreground font-medium">
                Melestarikan Cita Rasa Indonesia 🇮🇩
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
