import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ml.heures-supplementaires",
  mercado: "ml",
  concepto: "horas-extra",
  slug: "heures-supplementaires",
  estado: "publicado",
  requiere: { "ml.heures-sup-majorations": "mapa", "ml.duree-legale-hebdo": "numero" },
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire mensuel",
      min: 0,
      porDefecto: 150000,
      ayuda: "Le salaire réel global du mois pour la durée légale du travail.",
    },
    { id: "h4148", tipo: "numero", etiqueta: "Heures de jour de la 41e à la 48e heure de la semaine", min: 0, max: 400, porDefecto: 8 },
    { id: "hAuDela", tipo: "numero", etiqueta: "Heures de jour au-delà de la 48e heure", min: 0, max: 400, porDefecto: 0 },
    { id: "hNuit", tipo: "numero", etiqueta: "Heures de nuit en jour ouvrable", min: 0, max: 400, porDefecto: 0, ayuda: "Le travail de nuit va de 21 heures à 5 heures." },
    { id: "hReposJour", tipo: "numero", etiqueta: "Heures de jour un jour non ouvrable", min: 0, max: 400, porDefecto: 0 },
    { id: "hReposNuit", tipo: "numero", etiqueta: "Heures de nuit un jour non ouvrable", min: 0, max: 400, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    const m = v["ml.heures-sup-majorations"];
    // Heures mensuelles de la durée légale : 40 heures × 52 semaines / 12 mois.
    const heuresMois = (v["ml.duree-legale-hebdo"] * 52) / 12;
    const horaire = entrada.salaire / heuresMois;
    const paye = (heures: number, cle: string) => redondear(heures * (horaire + porcentaje(horaire, m[cle])));
    const p4148 = paye(entrada.h4148, "jour-41-48");
    const pAuDela = paye(entrada.hAuDela, "jour-au-dela-48");
    const pNuit = paye(entrada.hNuit, "nuit");
    const pReposJour = paye(entrada.hReposJour, "repos-jour");
    const pReposNuit = paye(entrada.hReposNuit, "repos-nuit");
    return {
      total: redondear(p4148 + pAuDela + pNuit + pReposJour + pReposNuit),
      horaire: Math.round(horaire * 100) / 100,
      heuresMois: Math.round(heuresMois * 100) / 100,
      p4148,
      pAuDela,
      pNuit,
      pReposJour,
      pReposNuit,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Paiement des heures supplémentaires", formato: "moneda", destacada: true },
    { clave: "horaire", etiqueta: "Taux horaire de base", formato: "moneda", decimales: 2 },
    { clave: "heuresMois", etiqueta: "Heures mensuelles de la durée légale", formato: "horas", decimales: 2 },
    { clave: "p4148", etiqueta: "De la 41e à la 48e heure", formato: "moneda", ocultarSiCero: true },
    { clave: "pAuDela", etiqueta: "Au-delà de la 48e heure", formato: "moneda", ocultarSiCero: true },
    { clave: "pNuit", etiqueta: "Heures de nuit en jour ouvrable", formato: "moneda", ocultarSiCero: true },
    { clave: "pReposJour", etiqueta: "Jour non ouvrable, de jour", formato: "moneda", ocultarSiCero: true },
    { clave: "pReposNuit", etiqueta: "Jour non ouvrable, de nuit", formato: "moneda", ocultarSiCero: true },
  ],
});
