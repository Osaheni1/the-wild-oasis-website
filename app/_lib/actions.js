"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  deleteBooking,
  getBookings,
  updateGuest,
  updateBooking,
  createBooking,
} from "./data-service";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must log in");

  const nationalaID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-n0-9]{6,12}$/.test(nationalaID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalaID };

  await updateGuest(session.user.guestId, updateData);

  revalidatePath("/account/profile");
}

export async function createBookingAct(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must log in");

  const newBooking = {
    ...bookingData,
    guestID: session.user.guestId,
    numGuest: Number(formData.get("numGuest")),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmd",
  };

  await createBooking(newBooking);

  revalidatePath(`/cabins/${bookingData.cabinID}`);

  redirect("/cabins/thankyou");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must log in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  await deleteBooking(bookingId);

  revalidatePath("/account/reservations");
}

export async function updateBookingAct(formData) {
  const session = await auth();
  if (!session) throw new Error("You must log in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(Number(formData.get("bookingId"))))
    throw new Error("You are not allowed to delete this booking");

  const updateData = {
    numGuest: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const id = Number(formData.get("bookingId"));

  await updateBooking(id, updateData);

  console.log(formData);

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${id}`);
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
