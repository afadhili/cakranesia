"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  Mail,
  Lock,
  User,
  AlertCircle,
  RefreshCw,
  MailCheckIcon,
  Timer,
} from "lucide-react";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";
import { toast } from "sonner";
import { SocialLogin } from "@/components/auth/social-login";
import { FormField } from "@/components/auth/form-field";
import { PasswordStrength } from "@/components/auth/password-strength";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    try {
      setError(null);
      const result = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (result.error) {
        setError(
          result.error.message || "Failed to create account. Please try again.",
        );
        toast.error("Failed to create account", {
          description: result.error.message || "Please try again.",
        });
        return;
      }

      toast.success("Account created successfully!", {
        description:
          "Welcome to Cakranesia! A verification email has been sent.",
        duration: 5000,
      });

      setUserEmail(data.email);
      setSuccess(true);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred");
      console.error("Sign up error:", err);
    }
  };

  const handleResendEmail = async () => {
    if (!userEmail) return;

    try {
      setIsResending(true);
      const result = await authClient.sendVerificationEmail({
        email: userEmail,
        callbackURL: "/auth/verify-email",
      });

      if (result.error) {
        toast.error("Failed to resend email", {
          description: result.error.message || "Please try again.",
        });
        return;
      }

      toast.success("Verification email resent!", {
        description: "Please check your inbox.",
      });
    } catch (err) {
      toast.error("Failed to resend verification email");
      console.error("Resend email error:", err);
    } finally {
      setIsResending(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-col items-center space-y-2 mb-4">
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
          </div>

          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3 animate-pulse">
              <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <p className="text-center text-muted-foreground">
            We&apos;ve sent a verification email to{" "}
            <strong className="text-foreground">{userEmail}</strong>
          </p>

          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              Please check your inbox and click the verification link to
              activate your account. The link will expire in 24 hours.
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-sm px-4 text-muted-foreground">
            <p className="flex gap-2">
              <MailCheckIcon className="w-4 h-4" /> Check your spam folder if
              you don&apos;t see the email
            </p>
            <p className="flex gap-2">
              <Timer className="w-4 h-4" /> The email may take a few minutes to
              arrive
            </p>
          </div>

          <Button
            onClick={handleResendEmail}
            variant="outline"
            className="w-full"
            disabled={isResending}
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Resend verification email
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/auth/sign-in">Go to Sign In</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="space-y-4 pt-6">
        <div className="flex flex-col items-center space-y-2 mb-4">
          <Link href={"/"}>
            <Image
              src="/logo.webp"
              alt="Cakranesia Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
          </Link>
          <h1 className="text-3xl font-semibold font-serif text-primary text-center">
            Cakranesia
          </h1>
          <p className="text-center text-muted-foreground">
            Enter your details to get started
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <SocialLogin callbackURL="/" disabled={isSubmitting} mode="signup" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            id="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            icon={User}
            error={errors.name?.message}
            disabled={isSubmitting}
            {...register("name")}
          />

          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
            icon={Mail}
            error={errors.email?.message}
            disabled={isSubmitting}
            {...register("email")}
          />

          <div className="space-y-2">
            <FormField
              id="password"
              label="Password"
              type="password"
              placeholder="Create a strong password"
              icon={Lock}
              error={errors.password?.message}
              disabled={isSubmitting}
              {...register("password", {
                onChange: (e) => setPassword(e.target.value),
              })}
            />
            <PasswordStrength password={password} />
          </div>

          <FormField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            icon={Lock}
            error={errors.confirmPassword?.message}
            disabled={isSubmitting}
            {...register("confirmPassword")}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-primary">
            Privacy Policy
          </Link>
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
