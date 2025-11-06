import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { recipe } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

// GET all recipes
export async function GET() {
  try {
    const recipes = await db.query.recipe.findMany({
      with: {
        culinary: {
          with: {
            province: true,
          },
        },
      },
    });
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}

// POST create new recipe
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, ingredients, steps, culinaryId } = body;

    if (!name || !description || !ingredients || !steps || !culinaryId) {
      return NextResponse.json(
        {
          error:
            "Name, description, ingredients, steps, and culinaryId are required",
        },
        { status: 400 },
      );
    }

    const recipeId = nanoid();

    await db
      .insert(recipe)
      .values({
        id: recipeId,
        name,
        description,
        ingredients,
        steps,
        culinaryId,
      })
      .returning();

    // Fetch the complete recipe with relations
    const completeRecipe = await db.query.recipe.findFirst({
      where: eq(recipe.id, recipeId),
      with: {
        culinary: {
          with: {
            province: true,
          },
        },
      },
    });

    return NextResponse.json(completeRecipe, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 },
    );
  }
}

// PUT update recipe
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, ingredients, steps, culinaryId } = body;

    if (!id || !name || !description || !ingredients || !steps || !culinaryId) {
      return NextResponse.json(
        {
          error:
            "ID, name, description, ingredients, steps, and culinaryId are required",
        },
        { status: 400 },
      );
    }

    const updatedRecipe = await db
      .update(recipe)
      .set({ name, description, ingredients, steps, culinaryId })
      .where(eq(recipe.id, id))
      .returning();

    if (updatedRecipe.length === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // Fetch the complete recipe with relations
    const completeRecipe = await db.query.recipe.findFirst({
      where: eq(recipe.id, id),
      with: {
        culinary: {
          with: {
            province: true,
          },
        },
      },
    });

    return NextResponse.json(completeRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 },
    );
  }
}

// DELETE recipe
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Recipe ID is required" },
        { status: 400 },
      );
    }

    const deletedRecipe = await db
      .delete(recipe)
      .where(eq(recipe.id, id))
      .returning();

    if (deletedRecipe.length === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 },
    );
  }
}
