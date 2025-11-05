"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft, ChefHat } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

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

            {/* 404 Text */}
            <div className="space-y-2">
              <h1 className="text-8xl md:text-9xl font-bold text-primary/20">
                404
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Halaman Tidak Ditemukan
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-3 max-w-md">
              <p className="text-lg text-muted-foreground">
                Maaf, sepertinya resep yang Anda cari belum tersedia di dapur
                kami.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <ChefHat className="h-4 w-4" />
                <p>Halaman ini mungkin telah dipindahkan atau tidak ada.</p>
              </div>
            </div>

            {/* Decorative Quote */}
            <div className="pt-4 pb-2">
              <p className="text-sm italic text-muted-foreground/80">
                &quot;Setiap hidangan dimulai dengan langkah pertama&quot;
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Kembali ke Beranda
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/search">
                  <Search className="mr-2 h-4 w-4" />
                  Cari Resep
                </Link>
              </Button>
            </div>

            {/* Back Link */}
            <Button
              onClick={() => router.back()}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke halaman sebelumnya
            </Button>

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
