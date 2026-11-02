"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Trash2 } from "lucide-react";
import { toastError, toastSuccess } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getClientToken } from "@/lib/getClientToken";
// import { Button } from "../ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";

interface DeleteListingProps {
  studioId: string;
  studioTitle?: string;
}

const DeleteListing = ({ studioId, studioTitle }: DeleteListingProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (loading) return;

    const token = await getClientToken();
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-studio/${studioId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const backendRes = await res.json();

      if (!res.ok || backendRes.deletedCount === 0) {
        toastError(backendRes, "Unable to delete studio.");
        return;
      }

      toastSuccess("Studio deleted successfully.");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting studio:", error);
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="cursor-pointer"
        variant="destructive"
        type="button"
        onClick={() => setOpen(true)}
        disabled={loading}
        title="Delete Studio"
        aria-label="Delete Studio"
      >
        <Trash2 size={16} />
      </Button>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          // Keep the dialog open while the request is in flight.
          if (!loading) setOpen(next);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-1 flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
              <Trash2 size={22} />
            </div>

            <DialogTitle className="text-center text-xl">
              Delete this studio?
            </DialogTitle>

            <DialogDescription className="text-center leading-6">
              {studioTitle ? (
                <>
                  You&apos;re about to permanently delete{" "}
                  <span className="font-semibold text-foreground">
                    &quot;{studioTitle}&quot;
                  </span>
                  . This action can&apos;t be undone.
                </>
              ) : (
                "This will permanently remove the studio listing. This action can't be undone."
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter showCloseButton={false}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
              aria-busy={loading}
              className="gap-2"
            >
              {loading && <LoaderCircle className="size-4 animate-spin" />}
              {loading ? "Deleting..." : "Delete Studio"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteListing;
