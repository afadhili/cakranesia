import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { culinary, culinaryCategory } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

// GET all culinaries
export async function GET() {
  try {
    const culinaries = await db.query.culinary.findMany({
      with: {
        province: true,
        culinaryCategories: {
          with: {
            category: true,
          },
        },
      },
    });
    return NextResponse.json(culinaries);
  } catch (error) {
    console.error("Error fetching culinaries:", error);
    return NextResponse.json(
      { error: "Failed to fetch culinaries" },
      { status: 500 },
    );
  }
}

// POST create new culinary
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, image, description, type, provinceId, categoryIds } = body;

    if (!name || !image || !description || !type || !provinceId) {
      return NextResponse.json(
        {
          error: "Name, image, description, type, and provinceId are required",
        },
        { status: 400 },
      );
    }

    // Validate type
    if (!["food", "drink", "beverage"].includes(type)) {
      return NextResponse.json(
        { error: "Type must be food, drink, or beverage" },
        { status: 400 },
      );
    }

    const culinaryId = nanoid();

    // Insert culinary
    await db
      .insert(culinary)
      .values({
        id: culinaryId,
        name,
        image,
        description,
        type,
        provinceId,
      })
      .returning();

    // Insert category relationships if provided
    if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
      await db.insert(culinaryCategory).values(
        categoryIds.map((categoryId: string) => ({
          culinaryId,
          categoryId,
        })),
      );
    }

    // Fetch the complete culinary with relations
    const completeCulinary = await db.query.culinary.findFirst({
      where: eq(culinary.id, culinaryId),
      with: {
        province: true,
        culinaryCategories: {
          with: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(completeCulinary, { status: 201 });
  } catch (error) {
    console.error("Error creating culinary:", error);
    return NextResponse.json(
      { error: "Failed to create culinary" },
      { status: 500 },
    );
  }
}

// PUT update culinary
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, image, description, type, provinceId, categoryIds } =
      body;

    if (!id || !name || !image || !description || !type || !provinceId) {
      return NextResponse.json(
        {
          error:
            "ID, name, image, description, type, and provinceId are required",
        },
        { status: 400 },
      );
    }

    // Validate type
    if (!["food", "drink", "beverage"].includes(type)) {
      return NextResponse.json(
        { error: "Type must be food, drink, or beverage" },
        { status: 400 },
      );
    }

    // Update culinary
    const updatedCulinary = await db
      .update(culinary)
      .set({ name, image, description, type, provinceId })
      .where(eq(culinary.id, id))
      .returning();

    if (updatedCulinary.length === 0) {
      return NextResponse.json(
        { error: "Culinary not found" },
        { status: 404 },
      );
    }

    // Update category relationships
    if (categoryIds && Array.isArray(categoryIds)) {
      // Delete existing relationships
      await db
        .delete(culinaryCategory)
        .where(eq(culinaryCategory.culinaryId, id));

      // Insert new relationships
      if (categoryIds.length > 0) {
        await db.insert(culinaryCategory).values(
          categoryIds.map((categoryId: string) => ({
            culinaryId: id,
            categoryId,
          })),
        );
      }
    }

    // Fetch the complete culinary with relations
    const completeCulinary = await db.query.culinary.findFirst({
      where: eq(culinary.id, id),
      with: {
        province: true,
        culinaryCategories: {
          with: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(completeCulinary);
  } catch (error) {
    console.error("Error updating culinary:", error);
    return NextResponse.json(
      { error: "Failed to update culinary" },
      { status: 500 },
    );
  }
}

// DELETE culinary
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Culinary ID is required" },
        { status: 400 },
      );
    }

    const deletedCulinary = await db
      .delete(culinary)
      .where(eq(culinary.id, id))
      .returning();

    if (deletedCulinary.length === 0) {
      return NextResponse.json(
        { error: "Culinary not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Culinary deleted successfully" });
  } catch (error) {
    console.error("Error deleting culinary:", error);
    return NextResponse.json(
      { error: "Failed to delete culinary" },
      { status: 500 },
    );
  }
}
