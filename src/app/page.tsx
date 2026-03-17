import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedTools } from "@/components/home/FeaturedTools";
import { FERRAMENTAS } from "@/data/ferramentas";

export const metadata: Metadata = {
  title: "AgroToolbox — Calculadoras do Agronegócio",
  description:
    "31 calculadoras gratuitas para o agronegócio brasileiro: agronomia, fiscal, financeiro, pecuária, reforma tributária e logística.",
  openGraph: {
    title: "AgroToolbox — Calculadoras do Agronegócio",
    description:
      "31 calculadoras gratuitas para o agronegócio brasileiro. Funrural, ITR, LCDPR, CBS/IBS, custo hora-máquina, conversores e muito mais.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection toolCount={FERRAMENTAS.length} />
      <CategoriesGrid />
      <HowItWorks />
      <FeaturedTools />
    </>
  );
}
