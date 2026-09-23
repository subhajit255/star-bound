import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/store/StoreProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Starbound Admin",
  description: "Admin panel for Starbound",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <StoreProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
