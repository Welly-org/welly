"use client";
import "@radix-ui/themes/styles.css";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import { bungee } from "./font";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentPath = usePathname();
  return (
    <html lang="en">
      <body className={bungee.className}>
        <div className="wrap">
          <main className="w-full h-full">
            <ReduxProvider>{children}</ReduxProvider>
          </main>
          {currentPath === "/" || currentPath === "/registration" ? (
            <></>
          ) : (
            <NavBar />
          )}
        </div>
      </body>
    </html>
  );
}
