import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ci.heures-supplementaires",
  mercado: "ci",
  concepto: "horas-extra",
  slug: "heures-supplementaires",
  estado: "publicado",
  requiere: {
    "ci.heures-sup-majorations": "mapa",
    "ci.heures-sup-premiere-tranche": "numero",
    "ci.duree-legale-travail": "numero",
  },
  campos: [
    {
      id: "mode",
      tipo: "opcion",
      etiqueta: "Vous connaissez",
      opciones: [
        { valor: "mensuel", etiqueta: "Votre salaire mensuel" },
        { valor: "horaire", etiqueta: "Votre taux horaire" },
      ],
      porDefecto: "mensuel",
    },
    { id: "mensuel", tipo: "moneda", etiqueta: "Salaire mensuel de base", min: 0, porDefecto: 260000, visibleSi: { mode: ["mensuel"] } },
    { id: "horaire", tipo: "moneda", etiqueta: "Taux horaire de base", min: 0, porDefecto: 1500, visibleSi: { mode: ["horaire"] } },
    { id: "jour", tipo: "numero", etiqueta: "Heures supplémentaires de jour dans la semaine", min: 0, max: 60, porDefecto: 8, ayuda: "Les heures faites au-delà de la durée légale, en semaine et de jour." },
    { id: "nuit", tipo: "numero", etiqueta: "Heures supplémentaires de nuit", min: 0, max: 60, porDefecto: 0 },
    { id: "dimancheJour", tipo: "numero", etiqueta: "Heures le dimanche ou un jour férié, de jour", min: 0, max: 60, porDefecto: 0 },
    { id: "dimancheNuit", tipo: "numero", etiqueta: "Heures le dimanche ou un jour férié, de nuit", min: 0, max: 60, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    const duree = v["ci.duree-legale-travail"];
    const taux = entrada.mode === "mensuel" ? ((entrada.mensuel ?? 0) * 12) / 52 / duree : (entrada.horaire ?? 0);
    if (taux <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", entrada.mode === "mensuel" ? "mensuel" : "horaire");
    const m = v["ci.heures-sup-majorations"];
    const premieres = Math.min(entrada.jour, v["ci.heures-sup-premiere-tranche"]);
    const suivantes = entrada.jour - premieres;
    const paye = (heures: number, majoration: number) => redondear(heures * taux * (1 + majoration / 100));
    const montantPremieres = paye(premieres, m.premieres);
    const montantSuivantes = paye(suivantes, m.suivantes);
    const montantNuit = paye(entrada.nuit, m.nuit);
    const montantDimancheJour = paye(entrada.dimancheJour, m["dimanche-jour"]);
    const montantDimancheNuit = paye(entrada.dimancheNuit, m["dimanche-nuit"]);
    return {
      total: redondear(montantPremieres + montantSuivantes + montantNuit + montantDimancheJour + montantDimancheNuit),
      tauxHoraire: redondear(taux),
      montantPremieres,
      montantSuivantes,
      montantNuit,
      montantDimancheJour,
      montantDimancheNuit,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Paiement des heures supplémentaires", formato: "moneda", destacada: true },
    { clave: "tauxHoraire", etiqueta: "Taux horaire de base", formato: "moneda" },
    { clave: "montantPremieres", etiqueta: "De la 41e à la 46e heure", formato: "moneda", ocultarSiCero: true },
    { clave: "montantSuivantes", etiqueta: "Au-delà de la 46e heure", formato: "moneda", ocultarSiCero: true },
    { clave: "montantNuit", etiqueta: "Heures de nuit", formato: "moneda", ocultarSiCero: true },
    { clave: "montantDimancheJour", etiqueta: "Dimanches et jours fériés, de jour", formato: "moneda", ocultarSiCero: true },
    { clave: "montantDimancheNuit", etiqueta: "Dimanches et jours fériés, de nuit", formato: "moneda", ocultarSiCero: true },
  ],
});
