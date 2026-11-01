import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.vsk-reiknivel",
  mercado: "is",
  concepto: "iva",
  slug: "vsk-reiknivel",
  estado: "publicado",
  requiere: { "is.vsk": "mapa", "is.vsk-afreikni": "mapa" },
  campos: [
    { id: "upphaed", tipo: "moneda", etiqueta: "Upphæð", min: 0, porDefecto: 10000 },
    { id: "threp", tipo: "opcion-dato", dato: "is.vsk", etiqueta: "Skattþrep", porDefecto: "almennt" },
    {
      id: "stefna",
      tipo: "opcion",
      etiqueta: "Hvað viltu reikna?",
      opciones: [
        { valor: "baeta", etiqueta: "Bæta VSK ofan á upphæð" },
        { valor: "draga", etiqueta: "Draga VSK úr upphæð með VSK" },
      ],
      porDefecto: "baeta",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.upphaed <= 0) throw new ErrorEntrada("Sláðu inn upphæð hærri en núll.", "upphaed");
    const hlutfall = enMapa(v["is.vsk"], e.threp);
    const an = e.stefna === "baeta" ? e.upphaed : redondear((e.upphaed * 100) / (100 + hlutfall));
    const vsk = e.stefna === "baeta" ? redondear(porcentaje(e.upphaed, hlutfall)) : e.upphaed - an;
    return { an, vsk, med: an + vsk, hlutfall };
  },
  resultado: [
    { clave: "an", etiqueta: "Upphæð án VSK", formato: "moneda" },
    { clave: "vsk", etiqueta: "VSK", formato: "moneda" },
    { clave: "med", etiqueta: "Upphæð með VSK", formato: "moneda", destacada: true },
    { clave: "hlutfall", etiqueta: "Skatthlutfall", formato: "porcentaje", decimales: 0 },
  ],
});
