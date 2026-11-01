"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Trash2 } from "lucide-react";
import { toastError, toastSuccess } from "@/lib/toast";
import { Button } from "../ui/button";

interface DeleteListingProps {
  studioId: string;
}

const DeleteListing = ({ studioId }: DeleteListingProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-studio/${studioId}`,
        {
          method: "DELETE",
        },
      );

      const backendRes = await res.json();

      if (!res.ok || backendRes.deletedCount === 0) {
        toastError(backendRes, "Unable to delete studio.");
        return;
      }

      toastSuccess("Studio deleted successfully.");
      router.refresh();
    } catch (error) {
      console.error("Error deleting studio:", error);
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="cursor-pointer"
      variant="destructive"
      type="button"
      onClick={handleDelete}
      disabled={loading}
      aria-busy={loading}
      title="Delete Studio"
      aria-label="Delete Studio"
    >
      {loading ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <Trash2 size={16} />
      )}
    </Button>
  );
};

export default DeleteListing;
