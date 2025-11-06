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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Province = {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export default function ProvincesPage() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProvince, setEditingProvince] = useState<Province | null>(null);
  const [deletingProvinceId, setDeletingProvinceId] = useState<string | null>(
    null,
  );
  const [formData, setFormData] = useState({ name: "", code: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await fetch("/api/admin/provinces");
      if (!response.ok) throw new Error("Failed to fetch provinces");
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      toast.error("Failed to load provinces");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = "/api/admin/provinces";
      const method = editingProvince ? "PUT" : "POST";
      const body = editingProvince
        ? { id: editingProvince.id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to save province");

      toast.success(
        editingProvince
          ? "Province updated successfully"
          : "Province created successfully",
      );
      setDialogOpen(false);
      setFormData({ name: "", code: "" });
      setEditingProvince(null);
      fetchProvinces();
    } catch (error) {
      toast.error("Failed to save province");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (province: Province) => {
    setEditingProvince(province);
    setFormData({ name: province.name, code: province.code });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingProvinceId) return;

    try {
      const response = await fetch(
        `/api/admin/provinces?id=${deletingProvinceId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) throw new Error("Failed to delete province");

      toast.success("Province deleted successfully");
      setDeleteDialogOpen(false);
      setDeletingProvinceId(null);
      fetchProvinces();
    } catch (error) {
      toast.error("Failed to delete province");
      console.error(error);
    }
  };

  const openDeleteDialog = (id: string) => {
    setDeletingProvinceId(id);
    setDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: "", code: "" });
    setEditingProvince(null);
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
          <h1 className="text-3xl font-bold tracking-tight">Provinces</h1>
          <p className="text-muted-foreground">
            Manage province data for culinary items
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
              Add Province
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingProvince ? "Edit Province" : "Add New Province"}
                </DialogTitle>
                <DialogDescription>
                  {editingProvince
                    ? "Update the province information below."
                    : "Fill in the details to create a new province."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Province Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Jawa Barat"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Province Code</Label>
                  <Input
                    id="code"
                    placeholder="e.g., JB"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    required
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
                    : editingProvince
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
              <TableHead>Code</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {provinces.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="text-muted-foreground">
                    No provinces found. Add your first province to get started.
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              provinces.map((province) => (
                <TableRow key={province.id}>
                  <TableCell className="font-medium">{province.name}</TableCell>
                  <TableCell>{province.code}</TableCell>
                  <TableCell>
                    {new Date(province.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(province)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteDialog(province.id)}
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
              province and all associated culinary items.
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
