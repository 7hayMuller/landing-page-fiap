import "./globals.scss";
import { Montserrat, Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-Montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} ${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
