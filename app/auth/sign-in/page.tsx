"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";
import { toast } from "sonner";
import { SocialLogin } from "@/components/auth/social-login";
import { FormField } from "@/components/auth/form-field";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInInput) => {
    try {
      setError(null);
      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        setError(
          result.error.message ||
            "Failed to sign in. Please check your credentials.",
        );
        toast.error("Failed to sign in", {
          description: "Please check your credentials and try again.",
        });
        return;
      }

      toast.success("Signed in successfully!", {
        description: "Welcome back! Redirecting you now...",
      });

      if (result.data?.user && !result.data.user.emailVerified) {
        toast.info("Verification email sent", {
          description: "Please check your email to verify your account.",
          duration: 5000,
        });
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred");
      console.error("Sign in error:", err);
    }
  };

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
            Sign in to your account to continue
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <SocialLogin callbackURL="/" disabled={isSubmitting} mode="signin" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <FormField
              id="password"
              label=""
              type="password"
              placeholder="Enter your password"
              icon={Lock}
              error={errors.password?.message}
              disabled={isSubmitting}
              {...register("password")}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
