import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "AI Research in Application Development",
  description: "Advance a World of Applications Through AI Research and Development",
  icons: {
    icon: { url: "./favicon.ico", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
