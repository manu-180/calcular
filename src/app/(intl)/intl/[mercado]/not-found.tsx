import type { Metadata } from "next";
import { textosSitio } from "@/motor/i18n";
import { contextoSitio } from "@/motor/ui/contexto";
import { NoEncontrada } from "@/motor/ui/NoEncontrada";
import { registro } from "@/paises";

const global = registro.pais("global")?.mercado;

export const metadata: Metadata = {
  title: `${global ? textosSitio(global.idioma, global.trato).noEncontrada.titulo : "Page not found"} | CalcularYa`,
  robots: { index: false, follow: true },
};

// not-found no recibe params: el texto sale del diccionario de global, en su idioma. El chrome
// (header, footer, lang) sí es el del mercado, porque lo pone el layout.
export default function NoEncontradaIntl() {
  const ctx = contextoSitio(registro, "global");
  return ctx ? <NoEncontrada ctx={ctx} /> : null;
}
