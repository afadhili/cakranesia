"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";
import { Loader2, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const emailParam = searchParams.get("email");

      if (emailParam) {
        setEmail(emailParam);
      }

      if (!token) {
        setStatus("error");
        setError("Invalid or missing verification token.");
        toast.error("Verification failed", {
          description: "Invalid or missing verification token.",
        });
        return;
      }

      try {
        const result = await authClient.verifyEmail({
          query: {
            token: token,
          },
        });

        if (result.error) {
          setStatus("error");
          setError(
            result.error.message ||
              "Failed to verify email. The token may have expired.",
          );
          toast.error("Verification failed", {
            description: result.error.message || "The token may have expired.",
          });
          return;
        }

        setStatus("success");
        toast.success("Email verified successfully!", {
          description:
            "You can now access all features. Redirecting to dashboard...",
          duration: 3000,
        });

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } catch (err) {
        setStatus("error");
        setError("An unexpected error occurred. Please try again.");
        toast.error("Verification failed", {
          description: "An unexpected error occurred.",
        });
        console.error("Email verification error:", err);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  const handleResendVerification = async () => {
    if (!email) {
      toast.error("Cannot resend verification", {
        description: "Email address not found. Please sign in again.",
      });
      return;
    }

    try {
      // Request new verification email
      const result = await authClient.sendVerificationEmail({
        email: email,
        callbackURL: "/auth/verify-email",
      });

      if (result.error) {
        toast.error("Failed to send verification email", {
          description: result.error.message,
        });
        return;
      }

      toast.success("Verification email sent!", {
        description: "Please check your inbox for the verification link.",
      });
    } catch (err) {
      toast.error("Failed to send verification email");
      console.error("Resend verification error:", err);
    }
  };

  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-4">
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
            <div className="flex justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Verifying your email...
            </CardTitle>
            <CardDescription className="text-center">
              Please wait while we verify your email address.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-4">
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
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Email verified!
            </CardTitle>
            <CardDescription className="text-center">
              Your email has been successfully verified. You now have full
              access to all features.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Go to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
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
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-3">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Verification failed
          </CardTitle>
          <CardDescription className="text-center">
            {error || "We couldn't verify your email address."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              The verification link may have expired or is invalid. Please
              request a new verification email.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {email && (
            <Button onClick={handleResendVerification} className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Resend verification email
            </Button>
          )}
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/sign-in">Back to Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
