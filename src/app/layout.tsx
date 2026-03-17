import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "AgroToolbox — Calculadoras do Agronegócio",
    template: "%s | AgroToolbox",
  },
  description:
    "31 calculadoras gratuitas para o agronegócio brasileiro: agronomia, fiscal, financeiro, pecuária, reforma tributária e logística.",
  keywords: [
    "agronegócio", "calculadora", "funrural", "ITR", "LCDPR", "CBS", "IBS",
    "NCM", "soja", "milho", "custo máquina", "depreciação", "financiamento rural",
  ],
  authors: [{ name: "felipesauer" }],
  creator: "felipesauer",
  metadataBase: new URL("https://agrotoolbox.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "AgroToolbox",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
