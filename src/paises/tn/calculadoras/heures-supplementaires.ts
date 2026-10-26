import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tn.heures-supplementaires",
  mercado: "tn",
  concepto: "horas-extra",
  slug: "heures-supplementaires",
  estado: "publicado",
  requiere: {
    "tn.heures-supplementaires": "mapa",
  },
  campos: [
    { id: "horaire", tipo: "moneda", etiqueta: "Salaire horaire de base", min: 0, porDefecto: 4 },
    {
      id: "regime",
      tipo: "opcion",
      etiqueta: "Régime de travail",
      opciones: [
        { valor: "48h", etiqueta: "Temps plein de 48 heures par semaine" },
        { valor: "reduit", etiqueta: "Temps plein de moins de 48 heures (40 heures par exemple)" },
        { valor: "partiel", etiqueta: "Temps partiel" },
      ],
      porDefecto: "48h",
    },
    { id: "normales", tipo: "numero", etiqueta: "Durée normale de votre semaine (heures)", min: 1, max: 48, porDefecto: 40, visibleSi: { regime: ["reduit"] } },
    { id: "heures", tipo: "numero", etiqueta: "Heures supplémentaires dans la semaine", min: 0, porDefecto: 4 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horaire <= 0) throw new ErrorEntrada("Indiquez un salaire horaire supérieur à zéro.", "horaire");
    const m = v["tn.heures-supplementaires"];
    let lignes: [number, number][];
    if (entrada.regime === "48h") lignes = [[entrada.heures, m["regime-48h"]]];
    else if (entrada.regime === "partiel") lignes = [[entrada.heures, m["temps-partiel"]]];
    else {
      const normales = entrada.normales ?? 40;
      const jusqua48 = Math.min(entrada.heures, Math.max(0, 48 - normales));
      lignes = [
        [jusqua48, m["regime-reduit-jusqu-a-48h"]],
        [entrada.heures - jusqua48, m["regime-reduit-au-dela"]],
      ];
    }
    let base = 0;
    let majoration = 0;
    for (const [heures, taux] of lignes) {
      const b = redondear(entrada.horaire * heures);
      base += b;
      majoration += redondear(porcentaje(b, taux));
    }
    return { total: redondear(base + majoration), base: redondear(base), majoration: redondear(majoration) };
  },
  resultado: [
    { clave: "total", etiqueta: "Montant brut des heures supplémentaires", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Salaire normal de ces heures", formato: "moneda" },
    { clave: "majoration", etiqueta: "Majorations", formato: "moneda" },
  ],
});
