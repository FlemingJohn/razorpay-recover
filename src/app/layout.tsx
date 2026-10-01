import type { ReactNode } from "react";
import "@/styles/theme.css";

export const metadata = { title: "Razorpay Recover" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
