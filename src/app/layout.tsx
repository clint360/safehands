import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import AuthProvider from "@/components/templates/auth/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safe Hands",
  description: "SafeHands aims to empower communities to protect children by providing a platform for reporting suspected child abuse cases to the appropriate child protection officials.",
};

const bodyStyle = {
  color: "black",
  background: "white",
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Icons+Outlined&display=optional"
        />
        <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet'></link>
      </head>
      <body className={inter.className} style={bodyStyle}>
      <AuthProvider accessToken={accessToken}>
        {children}
      </AuthProvider>
      </body>
    </html>
  );
}
