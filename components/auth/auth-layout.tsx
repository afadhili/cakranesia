import { ReactNode } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  showLogo?: boolean;
}

export function AuthLayout({
  children,
  title,
  description,
  footer,
  showLogo = true,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          {showLogo && (
            <div className="flex flex-col items-center space-y-2">
              <Image
                src="/logo.webp"
                alt="Cakranesia Logo"
                width={80}
                height={80}
                className="rounded-lg"
              />
              <h1 className="text-3xl font-bold text-center">Cakranesia</h1>
            </div>
          )}
          {title && (
            <h2 className="text-2xl font-bold text-center">{title}</h2>
          )}
          {description && (
            <p className="text-center text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
        {footer && <CardFooter className="flex justify-center">{footer}</CardFooter>}
      </Card>
    </div>
  );
}
