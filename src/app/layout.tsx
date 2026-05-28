import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PwaRegistry from "@/components/PwaRegistry";

export const metadata: Metadata = {
  title: {
    default: "FinanceFlow — Free Financial Calculators & Tools",
    template: "%s | FinanceFlow",
  },
  description: "India's trusted free financial calculator platform. EMI, SIP, FD, RD, PPF, GST, Income Tax calculators and more. Make smarter financial decisions.",
  keywords: ["financial calculator", "emi calculator", "sip calculator", "fd calculator", "income tax calculator", "loan calculator", "finance tools"],
  authors: [{ name: "FinanceFlow" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "FinanceFlow",
    title: "FinanceFlow — Free Financial Calculators & Tools",
    description: "India's trusted free financial calculator platform. Calculate EMI, SIP, FD, Tax and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinanceFlow — Free Financial Calculators & Tools",
    description: "India's trusted free financial calculator platform.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID} />}
        <PwaRegistry />
      </body>
    </html>
  );
}
