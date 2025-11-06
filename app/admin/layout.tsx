import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  const user = session?.user;
  if (!user || user.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link
                href="/admin"
                className="text-xl font-semibold text-primary font-serif"
              >
                Admin Panel
              </Link>
              <div className="flex gap-4">
                <Link href="/admin/provinces">
                  <Button variant="ghost">Provinces</Button>
                </Link>
                <Link href="/admin/categories">
                  <Button variant="ghost">Categories</Button>
                </Link>
                <Link href="/admin/culinaries">
                  <Button variant="ghost">Culinaries</Button>
                </Link>
                <Link href="/admin/recipes">
                  <Button variant="ghost">Recipes</Button>
                </Link>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="mr-2 h-4 w-4" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
