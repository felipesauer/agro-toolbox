import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-black text-primary/20">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        A ferramenta ou página que você procura não existe ou foi movida.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Início
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/#ferramentas">
            <Search className="mr-2 h-4 w-4" />
            Ver todas as ferramentas
          </Link>
        </Button>
      </div>
    </main>
  );
}
