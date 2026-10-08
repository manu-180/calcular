import { notFound } from "next/navigation";

// Cualquier path más profundo que una página real (/zz/bono/algo) y los que no son de ningún
// mercado (la regla fallback de next.config los manda a /intl/global/404/...) terminan acá, así
// se ven con el 404 intl y no con global-not-found, que tiene la marca de calcular.ar.
export default function NoExiste(): never {
  notFound();
}
