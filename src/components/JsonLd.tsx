import { prepararJsonLd } from "@/lib/seo";

// El contenido es SIEMPRE generado por nuestro propio código (nunca input de usuarios) y se
// serializa escapando <, > y & a \uXXXX: el texto resultante no necesita escape HTML y el JSON
// llega intacto al parser de Google.
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(prepararJsonLd(data))
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
  return <script type="application/ld+json">{json}</script>;
}
