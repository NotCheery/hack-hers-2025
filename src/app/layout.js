import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/contexts/AuthContext";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  variable: "--font-serif-display",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clutch",
  description: "Feminine help on standby.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSerifDisplay.variable} ${dmSans.variable} antialiased`}
      >
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
