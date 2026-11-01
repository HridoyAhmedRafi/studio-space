"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
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
        toast.error(backendRes.message || "Unable to delete studio.");
        return;
      }

      toast.success("Studio deleted successfully.");
      router.refresh();
    } catch (error) {
      console.error("Error deleting studio:", error);
      toast.error("Something went wrong. Please try again.");
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
      title="Delete Studio"
      aria-label="Delete Studio"
    >
      <Trash2 size={16} />
    </Button>
  );
};

export default DeleteListing;
