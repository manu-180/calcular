// Structured data (JSON-LD) para SEO. El contenido es SIEMPRE generado por nuestro
// propio código (nunca input de usuarios) y se serializa escapando <, > y & a
// secuencias \uXXXX, de modo que el texto resultante no contiene caracteres que
// requieran escape HTML y el JSON llega intacto al parser de Google.
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data)
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e");
  return <script type="application/ld+json">{json}</script>;
}
