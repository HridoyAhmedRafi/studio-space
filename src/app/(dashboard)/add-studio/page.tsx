"use client";

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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "@/lib/auth-client";
import { toastError, toastSuccess } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

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

export default function AddStudioForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitting) return;

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const backendRes = await res.json();
      if (!res.ok) {
        toastError(backendRes, "Failed to create studio.");
        return;
      } else {
        toastSuccess("Studio added successfully!");
        router.push("/my-listings");
      }
    } catch (error) {
      console.error("Studio creation error:", error);
      toastError(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <div className="mb-4">
        <h1 className="text-2xl font-bold sm:text-3xl text-[#cd274e]">
          Add New Studio
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          List your creative space for other creators.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Studio Details</CardTitle>
          <CardDescription>
            Provide all the necessary information about your studio.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Studio Information</h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="title">Studio Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Premium Photography Studio"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select name="category" required>
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
                    placeholder="20"
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
                    placeholder="50"
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
                    placeholder="100"
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
                  placeholder="Enter full studio address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Studio Image URL *</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/studio.jpg"
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
                    <Checkbox id={amenity} name="amenities" value={amenity} />
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
                placeholder="Describe your studio, equipment, environment and available facilities..."
                required
              />
            </div>

            <div className="border-t" />
            <div className="space-y-4">
              <h3 className="font-semibold">Owner Information</h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    value={session?.user?.name || ""}
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerEmail">Owner Email</Label>
                  <Input
                    id="ownerEmail"
                    name="ownerEmail"
                    type="email"
                    value={session?.user?.email || ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="border-t" />

            <div className=" flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                className="cursor-pointer"
                type="reset"
                variant="outline"
                disabled={submitting}
              >
                Reset Form
              </Button>

              <Button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="cursor-pointer gap-2 bg-[#cd274e] text-white hover:bg-[#b92144]"
              >
                {submitting && <LoaderCircle className="size-4 animate-spin" />}
                {submitting ? "Creating..." : "Create Studio Listing"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
