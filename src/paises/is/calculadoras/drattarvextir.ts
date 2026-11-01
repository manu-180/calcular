import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.drattarvextir",
  mercado: "is",
  concepto: "propio",
  slug: "drattarvextir",
  estado: "publicado",
  requiere: { "is.drattarvextir": "numero", "is.meginvextir": "numero", "is.vextir-peningakrofur": "mapa" },
  campos: [
    { id: "krafa", tipo: "moneda", etiqueta: "Krafa", min: 0, porDefecto: 1000000 },
    { id: "dagar", tipo: "entero", etiqueta: "Fjöldi daga í vanskilum", min: 1, max: 3650, porDefecto: 30 },
  ],
  calcular(e, v, { redondear }) {
    if (e.krafa <= 0) throw new ErrorEntrada("Sláðu inn upphæð hærri en núll.", "krafa");
    const vextir = redondear((porcentaje(e.krafa, v["is.drattarvextir"]) * e.dagar) / 365);
    return {
      hlutfall: v["is.drattarvextir"],
      vextir,
      samtals: e.krafa + vextir,
      observaciones: ["Einfaldur útreikningur með núgildandi hlutfalli. Yfir lengri tíma breytist hlutfallið, því að Seðlabankinn birtir það mánaðarlega."],
    };
  },
  resultado: [
    { clave: "hlutfall", etiqueta: "Dráttarvextir á ári", formato: "porcentaje", decimales: 2 },
    { clave: "vextir", etiqueta: "Dráttarvextir á tímabilinu", formato: "moneda", destacada: true },
    { clave: "samtals", etiqueta: "Krafa með vöxtum", formato: "moneda" },
  ],
});
