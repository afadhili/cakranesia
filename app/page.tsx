import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Bot, Users, BookOpen, ChefHat, MapPin } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { generateMetadata, generateBreadcrumbSchema } from "@/lib/metadata";
import { StructuredData } from "@/components/structured-data";
import { HeroCarousel } from "@/components/HeroCarousel";

export const metadata: Metadata = generateMetadata({
  title: "Beranda",
  description:
    "Jelajahi kekayaan kuliner Nusantara dari Sabang sampai Merauke. Temukan resep autentik, berbagi cerita kuliner, dan bergabung dengan komunitas pecinta kuliner Indonesia.",
  keywords: [
    "kuliner indonesia",
    "resep indonesia",
    "makanan nusantara",
    "resep tradisional",
    "masakan indonesia",
    "komunitas kuliner",
    "resep daerah",
    "makanan khas",
    "34 provinsi indonesia",
    "kuliner tradisional",
  ],
  url: "/",
});

export default function Home() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", url: "/" },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <Navbar />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative flex flex-col gap-16 md:gap-6 lg:flex-row items-center py-20 lg:py-32 px-8 md:px-32">
          <div className="absolute inset-0 bg-[url('../public/image/batik_dark.png')] dark:bg-[url('../public/image/batik_light.png')] bg-contain bg-center opacity-30 dark:opacity-20" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="space-y-6">
              <div className="animate-pulse inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <ChefHat className="h-4 w-4" />
                <span>Platform Kuliner Nusantara</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-serif">
                Melestarikan Cita Rasa
                <span className="text-primary mt-2"> Indonesia</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Jelajahi kekayaan kuliner Nusantara dari Sabang sampai Merauke.
                Temukan resep autentik, berbagi cerita, dan bergabung dengan
                komunitas pecinta kuliner Indonesia.
              </p>

              <div className="flex gap-4 items-center pt-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                  >
                    Gabung Komunitas
                  </Button>
                </Link>
                <Link href="/pencarian">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Jelajahi Resep
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="container z-10 flex gap-8">
            <HeroCarousel />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 md:py-24 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Fitur Unggulan
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Segala yang Anda butuhkan untuk menjelajahi dan berbagi kekayaan
                kuliner Indonesia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Pencarian Makanan</CardTitle>
                  <CardDescription>
                    Cari makanan khas berdasarkan provinsi atau nama. Temukan
                    ribuan resep autentik dari seluruh Indonesia.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Rekomendasi AI</CardTitle>
                  <CardDescription>
                    Chatbot AI yang membantu menemukan makanan sesuai selera,
                    bahan yang tersedia, atau acara spesial Anda.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Komunitas Aktif</CardTitle>
                  <CardDescription>
                    Bergabung dengan komunitas pecinta kuliner. Berbagi resep,
                    tips memasak, dan cerita kuliner Anda.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Resep & Blog</CardTitle>
                  <CardDescription>
                    Upload dan bagikan resep favorit Anda. Tulis blog tentang
                    petualangan kuliner dan cerita di balik masakan.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>34 Provinsi</CardTitle>
                  <CardDescription>
                    Jelajahi kuliner dari 34 provinsi Indonesia. Dari Aceh
                    sampai Papua, semua ada di satu tempat.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <ChefHat className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Resep Autentik</CardTitle>
                  <CardDescription>
                    Resep-resep yang dijaga keasliannya. Dari resep
                    turun-temurun hingga inovasi modern yang tetap autentik.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 md:py-24">
          <div className="container mx-auto max-w-4xl">
            <Card className="border-2 border-primary/20 bg-linear-to-br from-primary/5 via-background to-accent/5">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Siap Bergabung dengan Komunitas?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Ribuan pecinta kuliner Indonesia sudah bergabung. Bagikan
                  resep, temukan makanan favorit, dan lestarikan cita rasa
                  Nusantara bersama kami.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                    >
                      Daftar Sekarang
                    </Button>
                  </Link>
                  <Link href="/komunitas">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      Lihat Komunitas
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-8 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <ChefHat className="h-5 w-5 text-primary" />
                <span className="font-bold text-primary">Cakranesia</span>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                © 2024 Cakranesia. Melestarikan Cita Rasa Indonesia.
              </p>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <Link
                  href="/tentang"
                  className="hover:text-primary transition-colors"
                >
                  Tentang
                </Link>
                <Link
                  href="/kontak"
                  className="hover:text-primary transition-colors"
                >
                  Kontak
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privasi
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Ketentuan
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
