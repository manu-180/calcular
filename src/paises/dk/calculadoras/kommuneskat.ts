import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.kommuneskat",
  mercado: "dk",
  concepto: "propio",
  slug: "kommuneskat",
  estado: "publicado",
  requiere: {
    "dk.kommuneskat": "mapa",
    "dk.kirkeskat": "mapa",
    "dk.grundskyld": "mapa",
    "dk.bundskat": "numero",
    "dk.mellemskat-sats": "numero",
    "dk.skatteloft": "numero",
    "dk.personfradrag": "numero",
  },
  campos: [
    { id: "kommune", tipo: "opcion-dato", dato: "dk.kommuneskat", etiqueta: "Kommune", porDefecto: "koebenhavn" },
    { id: "kirkeskat", tipo: "si-no", etiqueta: "Medlem af folkekirken (betaler kirkeskat)", porDefecto: true },
    {
      id: "indkomst",
      tipo: "moneda",
      etiqueta: "Skattepligtig indkomst om året (valgfri)",
      ayuda: "Skriv et beløb, hvis du vil se kommuneskat og kirkeskat i kroner. Du finder tallet på din forskudsopgørelse.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(e, v, { redondear }) {
    const kommune = enMapa(v["dk.kommuneskat"], e.kommune);
    const kirke = enMapa(v["dk.kirkeskat"], e.kommune);
    const betaltKirke = e.kirkeskat ? kirke : 0;
    const bund = v["dk.bundskat"];
    const nedslag = Math.max(0, kommune + bund + v["dk.mellemskat-sats"] - v["dk.skatteloft"]);
    const base = e.indkomst === null ? null : Math.max(0, e.indkomst - v["dk.personfradrag"]);
    return {
      samlet: kommune + betaltKirke + bund,
      kommune,
      kirke,
      bund,
      nedslag,
      grundskyld: enMapa(v["dk.grundskyld"], e.kommune),
      kommuneKr: base === null ? null : redondear(porcentaje(base, kommune)),
      kirkeKr: base === null || !e.kirkeskat ? null : redondear(porcentaje(base, kirke)),
    };
  },
  resultado: [
    { clave: "samlet", etiqueta: "Kommuneskat, kirkeskat og bundskat i alt", formato: "porcentaje", decimales: 2, destacada: true },
    { clave: "kommune", etiqueta: "Kommuneskat", formato: "porcentaje", decimales: 2 },
    { clave: "kirke", etiqueta: "Kirkeskat (kun medlemmer af folkekirken)", formato: "porcentaje", decimales: 2 },
    { clave: "bund", etiqueta: "Bundskat (staten)", formato: "porcentaje", decimales: 2 },
    { clave: "nedslag", etiqueta: "Skatteloftsnedslag i mellemskatten", formato: "porcentaje", decimales: 2 },
    { clave: "grundskyld", etiqueta: "Grundskyld (promille)", formato: "numero", decimales: 2 },
    { clave: "kommuneKr", etiqueta: "Kommuneskat i kroner om året", formato: "moneda" },
    { clave: "kirkeKr", etiqueta: "Kirkeskat i kroner om året", formato: "moneda" },
  ],
});
