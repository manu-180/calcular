import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ma.heures-supplementaires",
  mercado: "ma",
  concepto: "horas-extra",
  slug: "heures-supplementaires",
  estado: "publicado",
  requiere: {
    "ma.heures-supplementaires": "mapa",
    "ma.duree-travail": "mapa",
  },
  campos: [
    { id: "mensuel", tipo: "moneda", etiqueta: "Salaire mensuel brut", min: 0, porDefecto: 6000 },
    { id: "jour", tipo: "numero", etiqueta: "Heures supplémentaires entre 6 h et 21 h", min: 0, porDefecto: 4 },
    { id: "nuit", tipo: "numero", etiqueta: "Heures supplémentaires entre 21 h et 6 h", min: 0, porDefecto: 0 },
    { id: "reposJour", tipo: "numero", etiqueta: "Le jour du repos hebdomadaire, entre 6 h et 21 h", min: 0, porDefecto: 0 },
    { id: "reposNuit", tipo: "numero", etiqueta: "Le jour du repos hebdomadaire, entre 21 h et 6 h", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.mensuel <= 0) throw new ErrorEntrada("Indiquez un salaire mensuel supérieur à zéro.", "mensuel");
    const m = v["ma.heures-supplementaires"];
    const horaire = redondear((entrada.mensuel * 12) / v["ma.duree-travail"].annuelle);
    const lignes: [number, number][] = [
      [entrada.jour, m.jour],
      [entrada.nuit, m.nuit],
      [entrada.reposJour, m["repos-jour"]],
      [entrada.reposNuit, m["repos-nuit"]],
    ];
    let base = 0;
    let majoration = 0;
    for (const [heures, taux] of lignes) {
      const b = redondear(horaire * heures);
      base += b;
      majoration += redondear(porcentaje(b, taux));
    }
    return {
      total: redondear(base + majoration),
      horaire,
      base: redondear(base),
      majoration: redondear(majoration),
      observaciones: ["Le salaire horaire est obtenu en divisant le salaire annuel par la durée annuelle normale du travail fixée par le code du travail. La majoration se calcule sur le salaire et ses accessoires, avec les exclusions prévues par le code du travail."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Montant brut des heures supplémentaires", formato: "moneda", destacada: true },
    { clave: "horaire", etiqueta: "Salaire horaire", formato: "moneda" },
    { clave: "base", etiqueta: "Salaire normal de ces heures", formato: "moneda" },
    { clave: "majoration", etiqueta: "Majorations", formato: "moneda" },
  ],
});
