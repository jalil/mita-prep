import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/lib/theme";
import { XPProvider } from "@/components/providers/XPProvider";
import { GamificationHeader } from "@/components/GamificationHeader";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { AuthGuard } from "@/components/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mita International School - 52 Week Prep",
  description: "Advanced reading comprehension and interview preparation for Mita International School.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <ThemeProvider>
          <AuthProvider>
            <AuthGuard>
              <XPProvider>
                <Sidebar />
                <div className="relative flex-1 flex flex-col min-h-screen transition-all duration-300 bg-background text-foreground">
                  {/* Floating Gamification Header on Desktop, Fixed on Mobile */}
                  <div className="absolute top-4 right-6 z-50 pointer-events-none">
                    <div className="pointer-events-auto">
                      <GamificationHeader />
                    </div>
                  </div>
                  <main className="flex-1 md:ml-64">
                    {children}
                  </main>
                </div>
              </XPProvider>
            </AuthGuard>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
