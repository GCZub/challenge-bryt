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
        className={ `w-screen h-screen ${googleSans.variable} ${dmSans.variable} bg-white text-black dark:bg-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
