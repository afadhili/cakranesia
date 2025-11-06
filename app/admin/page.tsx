import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Tag, UtensilsCrossed, BookOpen } from "lucide-react";
import db from "@/db";
import { province, category, culinary, recipe } from "@/db/schema";
import { count } from "drizzle-orm";

async function getStats() {
  try {
    const [provincesCount, categoriesCount, culinariesCount, recipesCount] =
      await Promise.all([
        db.select({ count: count() }).from(province),
        db.select({ count: count() }).from(category),
        db.select({ count: count() }).from(culinary),
        db.select({ count: count() }).from(recipe),
      ]);

    return {
      provinces: provincesCount[0]?.count || 0,
      categories: categoriesCount[0]?.count || 0,
      culinaries: culinariesCount[0]?.count || 0,
      recipes: recipesCount[0]?.count || 0,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      provinces: 0,
      categories: 0,
      culinaries: 0,
      recipes: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your culinary content from here
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Provinces</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.provinces}</div>
            <p className="text-xs text-muted-foreground">
              Manage province data
            </p>
            <Link href="/admin/provinces">
              <Button variant="link" className="mt-2 h-auto p-0">
                View all →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories}</div>
            <p className="text-xs text-muted-foreground">
              Manage category data
            </p>
            <Link href="/admin/categories">
              <Button variant="link" className="mt-2 h-auto p-0">
                View all →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Culinaries</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.culinaries}</div>
            <p className="text-xs text-muted-foreground">
              Manage culinary items
            </p>
            <Link href="/admin/culinaries">
              <Button variant="link" className="mt-2 h-auto p-0">
                View all →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recipes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recipes}</div>
            <p className="text-xs text-muted-foreground">Manage recipe data</p>
            <Link href="/admin/recipes">
              <Button variant="link" className="mt-2 h-auto p-0">
                View all →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link href="/admin/provinces">
            <Button>
              <MapPin className="mr-2 h-4 w-4" />
              Add Province
            </Button>
          </Link>
          <Link href="/admin/categories">
            <Button>
              <Tag className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </Link>
          <Link href="/admin/culinaries">
            <Button>
              <UtensilsCrossed className="mr-2 h-4 w-4" />
              Add Culinary
            </Button>
          </Link>
          <Link href="/admin/recipes">
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              Add Recipe
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
