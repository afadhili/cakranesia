import { NextRequest, NextResponse } from "next/server";
import db from "@/db";
import { province } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

// GET all provinces
export async function GET() {
  try {
    const provinces = await db.select().from(province);
    return NextResponse.json(provinces);
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return NextResponse.json(
      { error: "Failed to fetch provinces" },
      { status: 500 }
    );
  }
}

// POST create new province
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, code } = body;

    if (!name || !code) {
      return NextResponse.json(
        { error: "Name and code are required" },
        { status: 400 }
      );
    }

    const newProvince = await db
      .insert(province)
      .values({
        id: nanoid(),
        name,
        code,
      })
      .returning();

    return NextResponse.json(newProvince[0], { status: 201 });
  } catch (error) {
    console.error("Error creating province:", error);
    return NextResponse.json(
      { error: "Failed to create province" },
      { status: 500 }
    );
  }
}

// PUT update province
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, code } = body;

    if (!id || !name || !code) {
      return NextResponse.json(
        { error: "ID, name, and code are required" },
        { status: 400 }
      );
    }

    const updatedProvince = await db
      .update(province)
      .set({ name, code })
      .where(eq(province.id, id))
      .returning();

    if (updatedProvince.length === 0) {
      return NextResponse.json(
        { error: "Province not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProvince[0]);
  } catch (error) {
    console.error("Error updating province:", error);
    return NextResponse.json(
      { error: "Failed to update province" },
      { status: 500 }
    );
  }
}

// DELETE province
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Province ID is required" },
        { status: 400 }
      );
    }

    const deletedProvince = await db
      .delete(province)
      .where(eq(province.id, id))
      .returning();

    if (deletedProvince.length === 0) {
      return NextResponse.json(
        { error: "Province not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Province deleted successfully" });
  } catch (error) {
    console.error("Error deleting province:", error);
    return NextResponse.json(
      { error: "Failed to delete province" },
      { status: 500 }
    );
  }
}
