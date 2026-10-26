import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.gaveafgift",
  mercado: "dk",
  concepto: "propio",
  slug: "gaveafgift",
  estado: "publicado",
  requiere: {
    "dk.gaveafgift-bundfradrag": "mapa",
    "dk.gaveafgift-sats": "mapa",
  },
  campos: [
    { id: "modtager", tipo: "opcion-dato", dato: "dk.gaveafgift-sats", etiqueta: "Hvem får gaven?", porDefecto: "afkom" },
    { id: "gave", tipo: "moneda", etiqueta: "Gavens værdi", min: 0, porDefecto: 100000 },
    {
      id: "tidligere",
      tipo: "moneda",
      etiqueta: "Andre gaver fra samme giver i år",
      ayuda: "Bundfradraget gælder for alle gaver fra den samme giver i løbet af kalenderåret.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.gave <= 0) throw new ErrorEntrada("Skriv gavens værdi.", "gave");
    const bund = enMapa(v["dk.gaveafgift-bundfradrag"], e.modtager);
    const sats = enMapa(v["dk.gaveafgift-sats"], e.modtager);
    const foer = Math.max(0, e.tidligere - bund);
    const efter = Math.max(0, e.tidligere + e.gave - bund);
    const afgiftspligtig = redondear(efter - foer);
    const afgift = redondear(porcentaje(afgiftspligtig, sats));
    return {
      afgift,
      afgiftspligtig,
      bund,
      sats,
      tilbage: redondear(Math.max(0, bund - e.tidligere - e.gave)),
      netto: redondear(e.gave - afgift),
    };
  },
  resultado: [
    { clave: "afgift", etiqueta: "Gaveafgift af denne gave", formato: "moneda", destacada: true },
    { clave: "afgiftspligtig", etiqueta: "Del af gaven over bundfradraget", formato: "moneda" },
    { clave: "bund", etiqueta: "Bundfradrag i år", formato: "moneda" },
    { clave: "sats", etiqueta: "Afgiftssats", formato: "porcentaje", decimales: 2 },
    { clave: "tilbage", etiqueta: "Bundfradrag tilbage i år", formato: "moneda" },
    { clave: "netto", etiqueta: "Gaven efter afgift", formato: "moneda" },
  ],
});
