"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, LoaderCircle, Users } from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { IStudio } from "@/types/studio-type";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toastError, toastSuccess } from "@/lib/toast";
import { getClientToken } from "@/lib/getClientToken";

type BookingStudio = IStudio;

const BookingModal = ({ studio }: { studio: BookingStudio }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [open, setOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const hourlyRate = Number(studio.hourlyRate) || 0;
  const securityDeposit = Number(studio.securityDeposit) || 0;

  const capacity = Math.max(1, Number(studio.capacity) || 1);

  // Calculate duration from start and end time
  const duration =
    startTime && endTime
      ? (new Date(`1970-01-01T${endTime}`).getTime() -
          new Date(`1970-01-01T${startTime}`).getTime()) /
        (1000 * 60 * 60)
      : 0;

  const totalAmount = hourlyRate * duration;

  // Local date format: YYYY-MM-DD
  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleBookClick = () => {
    if (isPending) return;

    if (!session?.user) {
      toastError("Please log in to book this workspace.");
      router.push("/login");
      return;
    }

    setOpen(true);
  };

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user) {
      toastError("Please log in to book this workspace.");
      router.push("/login");
      return;
    }

    if (!bookingDate || !startTime || !endTime) {
      toastError("Please select booking date, start time and end time.");
      return;
    }

    const selectedDateTime = new Date(`${bookingDate}T${startTime}`);

    if (selectedDateTime <= new Date()) {
      toastError("Please select a future date and time.");
      return;
    }

    if (duration <= 0) {
      toastError("End time must be later than start time.");
      return;
    }

    if (Number(guestCount) < 1 || Number(guestCount) > capacity) {
      toastError(`Guest count must be between 1 and ${capacity}.`);
      return;
    }

    setLoading(true);

    const bookingData = {
      studioId: String(studio._id),
      studioTitle: studio.title,
      ownerEmail: studio.ownerEmail,

      userId: session.user.id,
      userName: session.user.name,
      userEmail: session.user.email,

      bookingDate,
      startTime,
      endTime,
      duration,
      guestCount: Number(guestCount),
      message,

      hourlyRate,
      totalAmount,
      securityDeposit,

      bookingTime: new Date().toISOString(),
    };

    const token = await getClientToken();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        toastError(result, "Booking request failed.");
        return;
      }

      toastSuccess("Your booking request has been submitted!");

      setOpen(false);
      setBookingDate("");
      setStartTime("");
      setEndTime("");
      setGuestCount("1");
      setMessage("");

      router.push("/my-bookings");
      router.refresh();
    } catch (error) {
      console.error("Booking error:", error);
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleBookClick}
        className="cursor-pointer h-12 w-full bg-[#d1234c] font-semibold text-white hover:bg-[#b51f43]"
      >
        Book Workspace Now
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-125">
          <DialogHeader>
            <DialogTitle className=" text-xl">Book Your Workspace</DialogTitle>

            <DialogDescription>
              Choose your preferred date, time, and booking details.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl bg-muted/60 p-4">
            <h3 className="font-semibold">{studio.title}</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              ${hourlyRate} / hour
            </p>
          </div>

          <form onSubmit={handleBooking} className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays className="size-4 text-[#d1234c]" />
                Booking Date
              </label>

              <Input
                type="date"
                min={minDate}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
                className="h-11 focus-visible:ring-2 focus-visible:ring-[#d1234c]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="size-4 text-[#d1234c]" />
                  Start Time
                </label>

                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="h-11 focus-visible:ring-2 focus-visible:ring-[#d1234c]"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="size-4 text-[#d1234c]" />
                  End Time
                </label>

                <Input
                  type="time"
                  min={startTime || undefined}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="h-11 focus-visible:ring-2 focus-visible:ring-[#d1234c]"
                />
              </div>
            </div>

            {duration > 0 && (
              <p className="text-xs text-muted-foreground">
                Booking Duration: {duration} {duration === 1 ? "hour" : "hours"}
              </p>
            )}

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Users className="size-4 text-[#d1234c]" />
                Number of Guests
              </label>

              <Input
                type="number"
                min={1}
                max={capacity}
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                required
                className="h-11 focus-visible:ring-2 focus-visible:ring-[#d1234c]"
              />

              <p className="text-xs text-muted-foreground">
                Maximum capacity: {capacity} people
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Additional Message (Optional)
              </label>

              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell the host about your requirements..."
                rows={3}
                className="resize-none focus-visible:ring-2 focus-visible:ring-[#d1234c]"
              />
            </div>

            <div className="space-y-3 rounded-xl border p-4">
              <h3 className="font-semibold">Booking Summary</h3>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  ${hourlyRate} × {duration > 0 ? duration : 0} hours
                </span>
                <span>${totalAmount}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Security Deposit</span>
                <span>${securityDeposit}</span>
              </div>

              <div className="flex justify-between border-t pt-3 font-bold">
                <span>Estimated Total</span>
                <span className="text-[#d1234c]">
                  ${totalAmount + securityDeposit}
                </span>
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                The security deposit is shown separately and may be refundable
                according to the host&apos;s booking policy.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="cursor-pointer h-12 w-full gap-2 bg-[#d1234c] font-semibold text-white hover:bg-[#b51f43]"
            >
              {loading && <LoaderCircle className="size-4 animate-spin" />}
              {loading ? "Submitting Request..." : "Confirm Booking Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingModal;
