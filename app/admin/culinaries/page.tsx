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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

type Province = {
  id: string;
  name: string;
  code: string;
};

type Category = {
  id: string;
  name: string;
  description: string;
};

type Culinary = {
  id: string;
  name: string;
  image: string;
  description: string;
  type: string;
  provinceId: string;
  createdAt: string;
  updatedAt: string;
  province?: Province;
  culinaryCategories?: {
    category: Category;
  }[];
};

export default function CulinariesPage() {
  const [culinaries, setCulinaries] = useState<Culinary[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCulinary, setEditingCulinary] = useState<Culinary | null>(null);
  const [deletingCulinaryId, setDeletingCulinaryId] = useState<string | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    type: "food",
    provinceId: "",
    categoryIds: [] as string[],
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [culinariesRes, provincesRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/culinaries"),
        fetch("/api/admin/provinces"),
        fetch("/api/admin/categories"),
      ]);

      if (!culinariesRes.ok || !provincesRes.ok || !categoriesRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [culinariesData, provincesData, categoriesData] = await Promise.all(
        [culinariesRes.json(), provincesRes.json(), categoriesRes.json()],
      );

      setCulinaries(culinariesData);
      setProvinces(provincesData);
      setCategories(categoriesData);
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
      const url = "/api/admin/culinaries";
      const method = editingCulinary ? "PUT" : "POST";
      const body = editingCulinary
        ? { id: editingCulinary.id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to save culinary");

      toast.success(
        editingCulinary
          ? "Culinary updated successfully"
          : "Culinary created successfully",
      );
      setDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error) {
      toast.error("Failed to save culinary");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (culinary: Culinary) => {
    setEditingCulinary(culinary);
    setFormData({
      name: culinary.name,
      image: culinary.image,
      description: culinary.description,
      type: culinary.type,
      provinceId: culinary.provinceId,
      categoryIds:
        culinary.culinaryCategories?.map((cc) => cc.category.id) || [],
    });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingCulinaryId) return;

    try {
      const response = await fetch(
        `/api/admin/culinaries?id=${deletingCulinaryId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Failed to delete culinary");

      toast.success("Culinary deleted successfully");
      setDeleteDialogOpen(false);
      setDeletingCulinaryId(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to delete culinary");
      console.error(error);
    }
  };

  const openDeleteDialog = (id: string) => {
    setDeletingCulinaryId(id);
    setDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      image: "",
      description: "",
      type: "food",
      provinceId: "",
      categoryIds: [],
    });
    setEditingCulinary(null);
  };

  const toggleCategory = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }));
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
          <h1 className="text-3xl font-bold tracking-tight">Culinaries</h1>
          <p className="text-muted-foreground">
            Manage culinary items from across Indonesia
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
              Add Culinary
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingCulinary ? "Edit Culinary" : "Add New Culinary"}
                </DialogTitle>
                <DialogDescription>
                  {editingCulinary
                    ? "Update the culinary information below."
                    : "Fill in the details to create a new culinary item."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Rendang, Sate"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe this culinary item..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={4}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                    required
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="drink">Drink</SelectItem>
                      <SelectItem value="beverage">Beverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="province">Province</Label>
                  <Select
                    value={formData.provinceId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, provinceId: value })
                    }
                    required
                  >
                    <SelectTrigger id="province">
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province.id} value={province.id}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Categories</Label>
                  <div className="border rounded-md p-4 space-y-2 max-h-48 overflow-y-auto">
                    {categories.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No categories available
                      </p>
                    ) : (
                      categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={formData.categoryIds.includes(category.id)}
                            onCheckedChange={() => toggleCategory(category.id)}
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
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
                    : editingCulinary
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
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {culinaries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="text-muted-foreground">
                    No culinaries found. Add your first culinary item to get
                    started.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              culinaries.map((culinary) => (
                <TableRow key={culinary.id}>
                  <TableCell className="font-medium">{culinary.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {culinary.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{culinary.province?.name || "-"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {culinary.culinaryCategories?.length === 0 ? (
                        <span className="text-sm text-muted-foreground">-</span>
                      ) : (
                        culinary.culinaryCategories?.map((cc) => (
                          <Badge
                            key={cc.category.id}
                            variant="secondary"
                            className="text-xs"
                          >
                            {cc.category.name}
                          </Badge>
                        ))
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(culinary.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(culinary)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteDialog(culinary.id)}
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
              culinary item and all associated recipes.
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
