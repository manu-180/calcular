import { PAGINAS } from "@/data/navegacion";
import { origenAR } from "@/motor/sitio";

// Argentina en el selector de calcularya: una entrada externa que lleva a calcular.ar. No es un
// mercado del registro (eso la sumaría a sitemaps y hreflang del sitio intl).
export const ARGENTINA = {
  codigo: "ar",
  nombre: "Argentina",
  pais: "AR",
  locale: "es-AR",
  href: origenAR(),
  calculadoras: PAGINAS.filter((p) => p.tipo === "calculadora" && p.menu !== false).length,
} as const;
