import type { ReactNode } from "react";
import "@/styles/theme.css";
import "@/styles/shell.css";
import "@/styles/layout.css";
import "@/styles/cards.css";
import "@/styles/charts.css";
import "@/styles/tables.css";
import "@/styles/transcript.css";
import "@/styles/controls.css";
import "@/styles/forms.css";

export const metadata = { title: "Razorpay Recover" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
