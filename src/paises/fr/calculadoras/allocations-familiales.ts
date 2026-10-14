import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fr.allocations-familiales",
  mercado: "fr",
  concepto: "propio",
  slug: "allocations-familiales",
  estado: "publicado",
  requiere: {
    "fr.af-montant-1": "mapa",
    "fr.af-montant-2": "mapa",
    "fr.af-montant-3": "mapa",
    "fr.af-majoration": "mapa",
    "fr.af-plafond-1": "mapa",
    "fr.af-plafond-2": "mapa",
  },
  campos: [
    {
      id: "enfants",
      tipo: "opcion",
      etiqueta: "Enfants à charge (de moins de 20 ans)",
      opciones: [
        { valor: "e2", etiqueta: "2 enfants" },
        { valor: "e3", etiqueta: "3 enfants" },
        { valor: "e4", etiqueta: "4 enfants" },
      ],
      porDefecto: "e2",
    },
    { id: "ressources", tipo: "moneda", etiqueta: "Ressources du foyer en 2024 (revenu net catégoriel)", min: 0, porDefecto: 60000 },
    {
      id: "majorations",
      tipo: "entero",
      etiqueta: "Enfants ouvrant droit à la majoration pour âge",
      min: 0,
      max: 4,
      porDefecto: 0,
      ayuda: "Enfants de 14 ans ou plus nés avant le 1er mars 2012, ou de 18 ans ou plus nés depuis. Avec 2 enfants, seul le cadet compte.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const nombre = Number(entrada.enfants.slice(1));
    const maxMajorations = nombre === 2 ? 1 : nombre;
    if (entrada.majorations > maxMajorations) {
      throw new ErrorEntrada(
        nombre === 2 ? "Avec 2 enfants, seule la majoration du cadet est possible." : "Il ne peut pas y avoir plus de majorations que d'enfants.",
        "majorations",
      );
    }
    const plafond1 = enMapa(valores["fr.af-plafond-1"], entrada.enfants);
    const plafond2 = enMapa(valores["fr.af-plafond-2"], entrada.enfants);
    const m = valores["fr.af-majoration"];
    const niveaux = [
      enMapa(valores["fr.af-montant-1"], entrada.enfants) + entrada.majorations * enMapa(m, "t1"),
      enMapa(valores["fr.af-montant-2"], entrada.enfants) + entrada.majorations * enMapa(m, "t2"),
      enMapa(valores["fr.af-montant-3"], entrada.enfants) + entrada.majorations * enMapa(m, "t3"),
    ];
    const tranche = entrada.ressources <= plafond1 ? 0 : entrada.ressources <= plafond2 ? 1 : 2;
    const base = niveaux[tranche];
    let complement = 0;
    if (tranche > 0) {
      const plafond = tranche === 1 ? plafond1 : plafond2;
      const avant = niveaux[tranche - 1];
      complement = Math.max(0, (plafond + 12 * avant - entrada.ressources) / 12 - base);
    }
    const mensuel = redondear(base + complement);
    return {
      tranche: ["Jusqu'au premier plafond", "Entre les deux plafonds", "Au-dessus du second plafond"][tranche],
      base: redondear(base),
      complement: redondear(complement),
      mensuel,
      annuel: redondear(mensuel * 12),
    };
  },
  resultado: [
    { clave: "tranche", etiqueta: "Tranche de ressources", formato: "texto" },
    { clave: "base", etiqueta: "Allocations et majorations", formato: "moneda" },
    { clave: "complement", etiqueta: "Complément dégressif", formato: "moneda", ocultarSiCero: true },
    { clave: "mensuel", etiqueta: "Allocations familiales par mois", formato: "moneda", destacada: true },
    { clave: "annuel", etiqueta: "Sur 12 mois", formato: "moneda" },
  ],
});
