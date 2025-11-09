import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer>
      <div className="border-t py-4 px-6 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 gap-6">
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold text-primary font-serif">
                Tentang Cakranesia
              </h3>
              <p className="max-w-md">
                Platform digital untuk melestarikan dan mempromosikan kekayaan
                kuliner tradisional Indonesia melalui teknologi modern dan
                interaktif. Bagian dari kompetisi BudayaGO! 2025.
              </p>
            </div>
            <div className="flex-1 flex flex-col space-y-2">
              <h3 className="text-xl font-semibold text-primary font-serif">
                Hubungi Kami
              </h3>
              <p className="flex gap-2">
                <Mail size={24} className="p-1 rounded-full bg-primary" />
                <a
                  className="hover:text-primary transition-all duration-300"
                  href="mailto:id.cakranesia@gmail.com"
                >
                  id.cakranesia@gmail.com
                </a>
              </p>
              <p className="flex gap-2">
                <Phone size={24} className="p-1 rounded-full bg-primary" />
                <a
                  className="hover:text-primary transition-all duration-300"
                  href="https://wa.me/6288805226080"
                >
                  +62 8880-5226-080
                </a>
              </p>
              <p className="flex gap-2">
                <MapPin size={24} className="p-1 rounded-full bg-primary" />
                <span>Gresik, Jawa Timur</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t py-4 px-6 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.webp"
                alt="Cakranesia Logo"
                width={32}
                height={32}
              />
              <span className="font-semibold font-serif text-primary">
                Cakranesia
              </span>
            </Link>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 Cakranesia. Melestarikan Cita Rasa Indonesia.
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link
                href="/team"
                className="hover:text-primary transition-colors"
              >
                Developer
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
      </div>
    </footer>
  );
}
