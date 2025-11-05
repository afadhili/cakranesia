"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Loader2, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/lib/validations/auth";
import { toast } from "sonner";
import { PasswordStrength } from "@/components/auth/password-strength";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    function checkToken() {
      const tokenParam = searchParams.get("token");
      if (!tokenParam) {
        setError(
          "Invalid or missing reset token. Please request a new password reset link.",
        );
      } else {
        setToken(tokenParam);
      }
    }
    checkToken();
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    if (!token) {
      setError("Invalid reset token");
      return;
    }

    try {
      setError(null);
      const result = await authClient.resetPassword({
        newPassword: data.password,
        token: token,
      });

      if (result.error) {
        setError(
          result.error.message || "Failed to reset password. Please try again.",
        );
        toast.error("Failed to reset password");
        return;
      }

      setSuccess(true);
      toast.success("Password reset successful!", {
        description: "You can now sign in with your new password.",
      });

      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 3000);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred");
      console.error("Reset password error:", err);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-4">
            <Link href="/" className="flex flex-col items-center space-y-2">
              <Image
                src="/logo.webp"
                alt="Cakranesia Logo"
                width={80}
                height={80}
                className="rounded-lg"
              />
              <h1 className="text-3xl font-semibold font-serif text-primary text-center">
                Cakranesia
              </h1>
            </Link>
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Password reset successful!
            </CardTitle>
            <CardDescription className="text-center">
              Your password has been successfully reset. You will be redirected
              to the sign in page shortly.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/auth/sign-in">Sign in now</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <Link href="/" className="flex flex-col items-center space-y-2">
            <Image
              src="/logo.webp"
              alt="Cakranesia Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
            <h1 className="text-3xl font-semibold font-serif text-primary text-center">
              Cakranesia
            </h1>
          </Link>
          <CardTitle className="text-xl font-bold text-center">
            Reset your password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!token && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Invalid or missing reset token. Please request a new password
                reset link.
              </AlertDescription>
            </Alert>
          )}

          {!token ? (
            <div className="text-center py-4">
              <Button asChild variant="outline">
                <Link href="/auth/forgot-password">Request new reset link</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    className="pl-9"
                    {...register("password", {
                      onChange: (e) => setPassword(e.target.value),
                    })}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
                <PasswordStrength password={password} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    className="pl-9"
                    {...register("confirmPassword")}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting password...
                  </>
                ) : (
                  "Reset password"
                )}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/auth/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

function ResetPasswordLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <Link href="/" className="flex flex-col items-center space-y-2">
            <Image
              src="/logo.webp"
              alt="Cakranesia Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
            <h1 className="text-3xl font-semibold font-serif text-primary text-center">
              Cakranesia
            </h1>
          </Link>
          <CardTitle className="text-xl font-bold text-center">
            Reset your password
          </CardTitle>
          <CardDescription className="text-center">Loading...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
