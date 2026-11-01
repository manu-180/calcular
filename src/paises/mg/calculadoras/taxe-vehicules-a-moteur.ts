import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mg.taxe-vehicules-a-moteur",
  mercado: "mg",
  concepto: "propio",
  slug: "taxe-vehicules-a-moteur",
  estado: "publicado",
  requiere: { "mg.taxe-vehicules": "mapa" },
  campos: [
    {
      id: "puissance",
      tipo: "opcion",
      etiqueta: "Puissance fiscale ou cylindrée",
      opciones: [
        { valor: "1-4", etiqueta: "1 à 4 CV (moto de 0 à 250 cm³)" },
        { valor: "5-9", etiqueta: "5 à 9 CV (251 à 500 cm³)" },
        { valor: "10-12", etiqueta: "10 à 12 CV (501 à 1 000 cm³)" },
        { valor: "13-15", etiqueta: "13 à 15 CV (plus de 1 000 cm³)" },
        { valor: "16", etiqueta: "Plus de 15 CV" },
      ],
      porDefecto: "5-9",
    },
    {
      id: "energie",
      tipo: "opcion",
      etiqueta: "Énergie",
      opciones: [
        { valor: "essence", etiqueta: "Essence" },
        { valor: "diesel", etiqueta: "Diesel" },
        { valor: "electrique", etiqueta: "Électrique" },
        { valor: "hybride", etiqueta: "Hybride" },
      ],
      porDefecto: "essence",
    },
    {
      id: "age",
      tipo: "opcion",
      etiqueta: "Âge du véhicule au 1er jour de la période",
      opciones: [
        { valor: "a5", etiqueta: "5 ans ou moins" },
        { valor: "a10", etiqueta: "Plus de 5 ans, jusqu'à 10 ans" },
        { valor: "a20", etiqueta: "Plus de 10 ans, jusqu'à 20 ans" },
        { valor: "plus20", etiqueta: "Plus de 20 ans" },
      ],
      porDefecto: "a10",
      ayuda: "Compté depuis la première mise en circulation.",
    },
  ],
  calcular(e, v) {
    const taxe = v["mg.taxe-vehicules"][`${e.energie}-${e.puissance}-${e.age}`];
    if (taxe === undefined) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    return { taxe };
  },
  resultado: [{ clave: "taxe", etiqueta: "Taxe annuelle sur les véhicules à moteur", formato: "moneda", destacada: true }],
});
