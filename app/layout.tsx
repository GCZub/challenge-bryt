
import type { Metadata } from "next";
import { DM_Sans, Google_Sans} from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({ subsets: ["latin"], variable: "--font-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Bryt Designs Frontend Challenge",
  description:
    "A frontend challenge created by Bryt Designs for a potential frontend developer position.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-screen min-h-screen ${googleSans.variable} ${dmSans.variable} text-white bg-gradient-to-br from-black  to-indigo-950`}
      >
        {children}
      </body>
    </html>
  );
}
