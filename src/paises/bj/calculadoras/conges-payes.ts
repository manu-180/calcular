import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bj.conges-payes",
  mercado: "bj",
  concepto: "vacaciones",
  slug: "conges-payes",
  estado: "publicado",
  requiere: {
    "bj.conges-jours-par-mois": "numero",
    "bj.conges-supplement-anciennete": "mapa",
    "bj.conges-plafond": "numero",
    "bj.conges-meres": "mapa",
  },
  campos: [
    { id: "mois", tipo: "entero", etiqueta: "Mois de service effectif dans l'année de référence", min: 0, max: 12, porDefecto: 12 },
    { id: "anciennete", tipo: "entero", etiqueta: "Années de service dans l'entreprise", min: 0, max: 60, porDefecto: 3 },
    {
      id: "mere",
      tipo: "opcion",
      etiqueta: "Salariée mère de famille",
      opciones: [
        { valor: "non", etiqueta: "Non concerné" },
        { valor: "moins-21", etiqueta: "Oui, moins de 21 ans" },
        { valor: "plus-21", etiqueta: "Oui, 21 ans ou plus" },
      ],
      porDefecto: "non",
    },
    {
      id: "enfants",
      tipo: "entero",
      etiqueta: "Enfants à charge de moins de 15 ans",
      min: 0,
      max: 20,
      porDefecto: 0,
      visibleSi: { mere: ["moins-21", "plus-21"] },
    },
  ],
  calcular(entrada, v) {
    if (entrada.mois < 0 || entrada.mois > 12) throw new ErrorEntrada("Indiquez entre 0 et 12 mois.", "mois");
    const normal = entrada.mois * v["bj.conges-jours-par-mois"];
    const paliers = v["bj.conges-supplement-anciennete"];
    const palier = Object.keys(paliers)
      .map(Number)
      .filter((a) => entrada.anciennete >= a)
      .sort((a, b) => b - a)[0];
    const plafond = v["bj.conges-plafond"];
    const avecAnciennete = palier === undefined ? normal : Math.max(normal, Math.min(normal + paliers[String(palier)], plafond));
    const anciennete = avecAnciennete - normal;
    const m = v["bj.conges-meres"];
    let enfants = 0;
    if (entrada.mere === "moins-21") enfants = entrada.enfants ?? 0;
    if (entrada.mere === "plus-21") enfants = Math.max(0, (entrada.enfants ?? 0) - (m["rang-apres-21-ans"] - 1));
    const parEnfant = normal <= m["seuil-reduction"] ? m.reduit : m["par-enfant"];
    const meres = enfants * parEnfant;
    return {
      total: avecAnciennete + meres,
      normal,
      anciennete,
      meres,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Congé payé total", formato: "dias", destacada: true },
    { clave: "normal", etiqueta: "Congé acquis par le travail", formato: "dias" },
    { clave: "anciennete", etiqueta: "Supplément d'ancienneté", formato: "dias", ocultarSiCero: true },
    { clave: "meres", etiqueta: "Supplément pour enfants à charge", formato: "dias", ocultarSiCero: true },
  ],
});
