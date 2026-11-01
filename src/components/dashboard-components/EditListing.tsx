"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { IStudio } from "@/lib/studio-type";
import { LoaderCircle, Pencil } from "lucide-react";
import { toastError, toastSuccess } from "@/lib/toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Creative Space",
];

const amenities = [
  "Free Wi-Fi",
  "Air Conditioning",
  "Parking",
  "Lighting Equipment",
  "Soundproof Room",
  "Green Screen",
  "Cameras",
  "Restroom",
  "Kitchen",
  "Natural Lighting",
  "Furniture",
  "Power Backup",
];

const EditListing = ({ studio }: { studio: IStudio }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    Array.isArray(studio.amenities) ? studio.amenities : [],
  );

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setSelectedAmenities((prev) =>
      checked ? [...prev, amenity] : prev.filter((item) => item !== amenity),
    );
  };

  const handleUpdateStudio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);

      const updatedData = {
        ...Object.fromEntries(formData.entries()),
        capacity: Number(formData.get("capacity")),
        hourlyRate: Number(formData.get("hourlyRate")),
        securityDeposit: Number(formData.get("securityDeposit")),
        amenities: selectedAmenities,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-studio/${studio._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      const backendRes = await res.json();

      if (!res.ok) {
        toastError(backendRes, "Failed to update studio.");
        return;
      }
      toastSuccess("Studio updated successfully!");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating studio:", error);
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            title="Edit Studio"
            aria-label="Edit Studio"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
          >
            <Pencil size={16} />
          </button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#CD274E]">
            Update Studio Listing
          </DialogTitle>

          <DialogDescription>
            Update your studio information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <Card className="p-6 border-0 shadow-none">
          <CardHeader className="px-0">
            <CardTitle className="text-xl">Studio Details</CardTitle>
            <CardDescription>
              Update the information about your creative space.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0">
            <form
              onSubmit={handleUpdateStudio}
              onReset={() =>
                setSelectedAmenities(
                  Array.isArray(studio.amenities) ? studio.amenities : [],
                )
              }
              className="space-y-5"
            >
              <div className="space-y-4">
                <h3 className="font-semibold">Studio Information</h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="title">Studio Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={studio.title}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>

                    <Select
                      name="category"
                      defaultValue={studio.category}
                      required
                    >
                      <SelectTrigger id="category" className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>

                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Max Capacity *</Label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      min="1"
                      defaultValue={studio.capacity}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="border-t" />

              <div className="space-y-4">
                <h3 className="font-semibold">Pricing</h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate ($) *</Label>
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      min="0"
                      defaultValue={studio.hourlyRate}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="securityDeposit">
                      Security Deposit ($) *
                    </Label>
                    <Input
                      id="securityDeposit"
                      name="securityDeposit"
                      type="number"
                      min="0"
                      defaultValue={studio.securityDeposit}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="border-t" />

              <div className="space-y-4">
                <h3 className="font-semibold">Location & Images</h3>

                <div className="space-y-2">
                  <Label htmlFor="location">Location / Address *</Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={studio.location}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Studio Image URL *</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    defaultValue={studio.imageUrl}
                    required
                  />
                </div>
              </div>

              <div className="border-t" />

              <div className="space-y-4">
                <h3 className="font-semibold">Studio Amenities</h3>

                <p className="text-sm text-muted-foreground">
                  Select all available facilities.
                </p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <Checkbox
                        id={amenity}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={(checked) =>
                          handleAmenityChange(amenity, checked === true)
                        }
                      />

                      <Label
                        htmlFor={amenity}
                        className="cursor-pointer text-sm font-normal"
                      >
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t" />

              <div className="space-y-4">
                <h3 className="font-semibold">Detailed Overview</h3>

                <Textarea
                  id="overview"
                  name="overview"
                  rows={6}
                  defaultValue={studio.overview}
                  required
                />
              </div>

              <div className="border-t" />

              <div className="space-y-4">
                <h3 className="font-semibold">Owner Information</h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input id="ownerName" value={studio.ownerName} readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerEmail">Owner Email</Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      value={studio.ownerEmail}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="border-t" />

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="reset"
                  variant="outline"
                  disabled={loading}
                  className="cursor-pointer"
                >
                  Reset Form
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="cursor-pointer gap-2 bg-[#CD274E] text-white hover:bg-[#b92144]"
                >
                  {loading && <LoaderCircle className="size-4 animate-spin" />}
                  {loading ? "Updating..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default EditListing;
