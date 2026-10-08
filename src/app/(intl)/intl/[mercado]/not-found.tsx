import type { Metadata } from "next";
import { contextoSitio } from "@/motor/ui/contexto";
import { NoEncontrada } from "@/motor/ui/NoEncontrada";
import { registro } from "@/paises";

export const metadata: Metadata = {
  title: "Página no encontrada | CalcularYa",
  robots: { index: false, follow: true },
};

// not-found no recibe params: el texto sale del diccionario de global (tú neutro). El chrome
// (header, footer, lang) sí es el del mercado, porque lo pone el layout.
export default function NoEncontradaIntl() {
  const ctx = contextoSitio(registro, "global");
  return ctx ? <NoEncontrada ctx={ctx} /> : null;
}
