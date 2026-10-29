import { definirCalculadora } from "@/motor/calculo";

const AGES = { "moins-3": "moins-3", "3-6": "3-6", "6-10": "6-10", "plus-10": "plus-10" } as const;

export default definirCalculadora({
  id: "dz.vignette-automobile",
  mercado: "dz",
  concepto: "propio",
  slug: "vignette-automobile",
  estado: "publicado",
  requiere: { "dz.vignette": "mapa", "dz.vignette-10cv": "mapa" },
  campos: [
    {
      id: "puissance",
      tipo: "opcion",
      etiqueta: "Puissance fiscale",
      opciones: [
        { valor: "6", etiqueta: "Jusqu'à 6 CV" },
        { valor: "9", etiqueta: "De 7 à 9 CV" },
        { valor: "10", etiqueta: "10 CV et plus" },
      ],
      porDefecto: "6",
    },
    {
      id: "age",
      tipo: "opcion",
      etiqueta: "Âge du véhicule depuis sa mise en circulation",
      opciones: [
        { valor: "moins-3", etiqueta: "Moins de 3 ans" },
        { valor: "3-6", etiqueta: "De 3 à 6 ans" },
        { valor: "6-10", etiqueta: "Plus de 6 ans et jusqu'à 10 ans" },
        { valor: "plus-10", etiqueta: "Plus de 10 ans" },
      ],
      porDefecto: "moins-3",
    },
    {
      id: "energie",
      tipo: "opcion",
      etiqueta: "Motorisation",
      opciones: [
        { valor: "thermique", etiqueta: "Essence, diesel ou GPL" },
        { valor: "gnc", etiqueta: "Gaz naturel carburant (GNC)" },
        { valor: "electrique", etiqueta: "Électrique ou hybride" },
      ],
      porDefecto: "thermique",
    },
  ],
  calcular(e, v) {
    const age = AGES[e.age];
    const tarif = e.puissance === "10" ? v["dz.vignette-10cv"][age] : v["dz.vignette"][`${e.puissance}cv-${age}`];
    const exempte = e.energie !== "thermique";
    return {
      montant: exempte ? 0 : tarif,
      tarif,
      observaciones: exempte
        ? ["Depuis la loi de finances pour 2026, les véhicules au GNC, électriques ou hybrides sont exemptés de la vignette."]
        : ["Tarif des véhicules de tourisme et des véhicules aménagés en utilitaire. Les utilitaires, camions et autocars ont un barème différent."],
    };
  },
  resultado: [
    { clave: "montant", etiqueta: "Vignette à payer", formato: "moneda", destacada: true },
    { clave: "tarif", etiqueta: "Tarif du barème pour ce véhicule", formato: "moneda" },
  ],
});
