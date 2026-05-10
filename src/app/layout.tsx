import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Profile Architect — Dating App Optimization",
  description:
    "Scientifically optimize your dating app profile using psychology, AI photo generation, and behavioral analysis. Built for Hinge, Bumble, and Tinder.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Profile Architect",
  },
  openGraph: {
    title: "Profile Architect",
    description: "Your profile is leaving matches on the table. Fix that.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
