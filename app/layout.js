import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
});

console.log(josefin);

import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContex";

export const metadata = {
  // title: "The wild Oasis",
  title: {
    template: "%s / The wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, loacated in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} relative antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
