"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

type Culinary = {
  id: string;
  name: string;
  type: string;
  province?: {
    id: string;
    name: string;
  };
};

type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  steps: string;
  culinaryId: string;
  createdAt: string;
  updatedAt: string;
  culinary?: Culinary;
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [culinaries, setCulinaries] = useState<Culinary[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [deletingRecipeId, setDeletingRecipeId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    steps: "",
    culinaryId: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [recipesRes, culinariesRes] = await Promise.all([
        fetch("/api/admin/recipes"),
        fetch("/api/admin/culinaries"),
      ]);

      if (!recipesRes.ok || !culinariesRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [recipesData, culinariesData] = await Promise.all([
        recipesRes.json(),
        culinariesRes.json(),
      ]);

      setRecipes(recipesData);
      setCulinaries(culinariesData);
    } catch (error) {
      toast.error("Failed to load data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = "/api/admin/recipes";
      const method = editingRecipe ? "PUT" : "POST";
      const body = editingRecipe
        ? { id: editingRecipe.id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to save recipe");

      toast.success(
        editingRecipe
          ? "Recipe updated successfully"
          : "Recipe created successfully",
      );
      setDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      toast.error("Failed to save recipe");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setFormData({
      name: recipe.name,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      culinaryId: recipe.culinaryId,
    });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingRecipeId) return;

    try {
      const response = await fetch(
        `/api/admin/recipes?id=${deletingRecipeId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Failed to delete recipe");

      toast.success("Recipe deleted successfully");
      setDeleteDialogOpen(false);
      setDeletingRecipeId(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to delete recipe");
      console.error(error);
    }
  };

  const openDeleteDialog = (id: string) => {
    setDeletingRecipeId(id);
    setDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      ingredients: "",
      steps: "",
      culinaryId: "",
    });
    setEditingRecipe(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recipes</h1>
          <p className="text-muted-foreground">
            Manage recipes for culinary items
          </p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Recipe
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingRecipe ? "Edit Recipe" : "Add New Recipe"}
                </DialogTitle>
                <DialogDescription>
                  {editingRecipe
                    ? "Update the recipe information below."
                    : "Fill in the details to create a new recipe."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="culinary">Culinary Item</Label>
                  <Select
                    value={formData.culinaryId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, culinaryId: value })
                    }
                    required
                  >
                    <SelectTrigger id="culinary">
                      <SelectValue placeholder="Select culinary item" />
                    </SelectTrigger>
                    <SelectContent>
                      {culinaries.map((culinary) => (
                        <SelectItem key={culinary.id} value={culinary.id}>
                          {culinary.name} (
                          {culinary.province?.name || "No province"})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Recipe Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Traditional Rendang Recipe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the recipe..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ingredients">Ingredients</Label>
                  <Textarea
                    id="ingredients"
                    placeholder="List all ingredients (one per line or comma-separated)..."
                    value={formData.ingredients}
                    onChange={(e) =>
                      setFormData({ ...formData, ingredients: e.target.value })
                    }
                    required
                    rows={6}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="steps">Cooking Steps</Label>
                  <Textarea
                    id="steps"
                    placeholder="Describe the cooking steps (numbered or bullet points)..."
                    value={formData.steps}
                    onChange={(e) =>
                      setFormData({ ...formData, steps: e.target.value })
                    }
                    required
                    rows={8}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting
                    ? "Saving..."
                    : editingRecipe
                      ? "Update"
                      : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipe Name</TableHead>
              <TableHead>Culinary Item</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="text-muted-foreground">
                    No recipes found. Add your first recipe to get started.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell className="font-medium">{recipe.name}</TableCell>
                  <TableCell>
                    {recipe.culinary?.name || "-"}
                    {recipe.culinary?.type && (
                      <Badge
                        variant="outline"
                        className="ml-2 capitalize text-xs"
                      >
                        {recipe.culinary.type}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {recipe.culinary?.province?.name || "-"}
                  </TableCell>
                  <TableCell>
                    {new Date(recipe.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(recipe)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteDialog(recipe.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              recipe.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
