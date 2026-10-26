import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.aktieskat",
  mercado: "dk",
  concepto: "propio",
  slug: "aktieskat",
  estado: "publicado",
  requiere: {
    "dk.aktieindkomst-satser": "mapa",
    "dk.aktieindkomst-graense": "numero",
  },
  campos: [
    {
      id: "aktieindkomst",
      tipo: "moneda",
      etiqueta: "Aktieindkomst i året (gevinster og udbytte minus tab)",
      ayuda: "Gælder aktier og aktiebaserede investeringsbeviser i et almindeligt depot. Ikke aktiesparekonto og pensionsdepot.",
      min: 0,
      porDefecto: 100000,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.aktieindkomst <= 0) throw new ErrorEntrada("Skriv en aktieindkomst, der er større end 0.", "aktieindkomst");
    const graense = v["dk.aktieindkomst-graense"];
    const s = v["dk.aktieindkomst-satser"];
    const lavBase = Math.min(e.aktieindkomst, graense);
    const hoejBase = Math.max(0, e.aktieindkomst - graense);
    const lav = redondear(porcentaje(lavBase, enMapa(s, "lav")));
    const hoej = redondear(porcentaje(hoejBase, enMapa(s, "hoej")));
    const skat = redondear(lav + hoej);
    return {
      skat,
      lav,
      hoej,
      efterSkat: redondear(e.aktieindkomst - skat),
      effektiv: (100 * skat) / e.aktieindkomst,
    };
  },
  resultado: [
    { clave: "skat", etiqueta: "Skat af aktieindkomst", formato: "moneda", destacada: true },
    { clave: "lav", etiqueta: "Skat på laveste trin", formato: "moneda" },
    { clave: "hoej", etiqueta: "Skat på højeste trin", formato: "moneda", ocultarSiCero: true },
    { clave: "efterSkat", etiqueta: "Tilbage efter skat", formato: "moneda" },
    { clave: "effektiv", etiqueta: "Skat i procent af aktieindkomsten", formato: "porcentaje", decimales: 1 },
  ],
});
