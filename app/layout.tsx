import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduCore Institute - Professional Training & Education",
  description: "Leading educational institute offering courses in Finance, Management, Health & Safety, AI Consultancy, Cloud Consultancy, German Language, and Multimedia. Study abroad programs available.",
  keywords: "education, training, courses, finance, management, health safety, AI consultancy, cloud consultancy, German language, multimedia, study abroad",
  authors: [{ name: "EduCore Institute" }],
  openGraph: {
    title: "EduCore Institute - Professional Training & Education",
    description: "Leading educational institute offering professional courses and training programs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
