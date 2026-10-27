import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.allocation-chomage",
  mercado: "dz",
  concepto: "propio",
  slug: "allocation-chomage",
  estado: "publicado",
  requiere: { "dz.allocation-chomage": "numero", "dz.allocation-chomage-duree": "mapa" },
  campos: [
    { id: "dejaPercus", tipo: "entero", etiqueta: "Mois d'allocation déjà perçus", min: 0, max: 36, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    const d = v["dz.allocation-chomage-duree"];
    const maximum = d.initiale + d.renouvellement + d.supplementaire;
    if (e.dejaPercus < 0 || e.dejaPercus > maximum) throw new ErrorEntrada("Indiquez un nombre de mois compris dans la durée maximale.", "dejaPercus");
    const mensuel = v["dz.allocation-chomage"];
    const restants = maximum - e.dejaPercus;
    return {
      mensuel,
      annuel: redondear(mensuel * 12),
      restants,
      montantRestant: redondear(mensuel * restants),
      maximum,
      observaciones: [
        "La durée maximale suppose le renouvellement accordé et l'année supplémentaire obtenue. Le renouvellement dépend du respect des engagements : valider l'inscription tous les six mois, répondre aux convocations de l'ANEM et ne pas refuser une offre d'emploi adaptée.",
      ],
    };
  },
  resultado: [
    { clave: "mensuel", etiqueta: "Allocation mensuelle", formato: "moneda", destacada: true },
    { clave: "annuel", etiqueta: "Montant sur 12 mois", formato: "moneda" },
    { clave: "restants", etiqueta: "Mois restants au plus", formato: "meses" },
    { clave: "montantRestant", etiqueta: "Montant restant à percevoir au plus", formato: "moneda" },
    { clave: "maximum", etiqueta: "Durée maximale de versement", formato: "meses" },
  ],
});
