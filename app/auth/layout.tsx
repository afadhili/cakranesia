import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="-z-10 absolute inset-0 bg-[url('../public/image/batik_dark.png')] dark:bg-[url('../public/image/batik_light.png')] bg-center bg-fixed opacity-30 dark:opacity-20" />
      <div className="-z-10 absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
      {children}
    </div>
  );
}
