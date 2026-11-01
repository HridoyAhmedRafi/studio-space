export interface IBooking {
  _id: string;
  studioId: string;
  studioTitle: string;
  ownerEmail: string;
  userId: string;
  userName: string;
  userEmail: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  guestCount: number;
  message: string;
  hourlyRate: number;
  totalAmount: number;
  securityDeposit: number;
  bookingTime: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}
