import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {AppStoreProvider} from "@/components/providers/appStoreProvider";
import {TRPCQueryProviders} from "@/components/providers/trpcQueryProvider";
import {InitProvider} from "@/components/providers/initProvider";
import {cn} from "@/lib/utils";
import React from "react";
import {Toaster} from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('flex h-full flex-col min-h-[100vh]',inter.className) }>
        <AppStoreProvider>
            <TRPCQueryProviders>
              <InitProvider>
                {children}
              </InitProvider>
                <Toaster />
            </TRPCQueryProviders>
        </AppStoreProvider>
      </body>
    </html>
  );
}
