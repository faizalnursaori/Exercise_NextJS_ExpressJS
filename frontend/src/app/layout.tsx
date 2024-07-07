import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/provider/provider";
import { Header } from "@/components/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  isAuthPage = false,
}: Readonly<{
  children: React.ReactNode;
  isAuthPage?: boolean;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {!isAuthPage && <Header />}
          {children}
        </Provider>
      </body>
    </html>
  );
}
