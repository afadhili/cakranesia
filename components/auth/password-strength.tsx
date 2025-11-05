"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

interface StrengthResult {
  score: number;
  label: string;
  color: string;
  feedback: string[];
}

function calculatePasswordStrength(password: string): StrengthResult {
  let score = 0;
  const feedback: string[] = [];

  if (!password) {
    return {
      score: 0,
      label: "No password",
      color: "bg-muted",
      feedback: [],
    };
  }

  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  if (password.length < 8) {
    feedback.push("Use at least 8 characters");
  }

  // Character variety checks
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add lowercase letters");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add uppercase letters");
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add numbers");
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Add special characters (!@#$%^&*)");
  }

  // Common patterns penalty
  const commonPatterns = [
    /^123/,
    /abc/i,
    /qwerty/i,
    /password/i,
    /admin/i,
    /letmein/i,
  ];

  if (commonPatterns.some((pattern) => pattern.test(password))) {
    score = Math.max(0, score - 2);
    feedback.push("Avoid common patterns");
  }

  // Determine strength label and color
  let label = "";
  let color = "";

  if (score <= 2) {
    label = "Weak";
    color = "bg-destructive";
  } else if (score <= 4) {
    label = "Fair";
    color = "bg-orange-500";
  } else if (score <= 6) {
    label = "Good";
    color = "bg-yellow-500";
  } else {
    label = "Strong";
    color = "bg-green-500";
  }

  return { score, label, color, feedback };
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const strength = useMemo(() => calculatePasswordStrength(password), [password]);

  if (!password) return null;

  const strengthPercentage = Math.min((strength.score / 7) * 100, 100);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Password strength:</span>
        <span
          className={cn(
            "font-medium",
            strength.score <= 2 && "text-destructive",
            strength.score > 2 && strength.score <= 4 && "text-orange-500",
            strength.score > 4 && strength.score <= 6 && "text-yellow-600",
            strength.score > 6 && "text-green-600"
          )}
        >
          {strength.label}
        </span>
      </div>

      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-300", strength.color)}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>

      {strength.feedback.length > 0 && (
        <ul className="text-xs text-muted-foreground space-y-1">
          {strength.feedback.map((item, index) => (
            <li key={index} className="flex items-start gap-1">
              <span className="text-muted-foreground/70">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
