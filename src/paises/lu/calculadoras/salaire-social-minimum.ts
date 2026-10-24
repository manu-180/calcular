import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// guichet.lu publie le salaire horaire à quatre décimales et les montants mensuels tronqués au cent
// (2.771,33 x 0,75 = 2.078,4975 publié 2.078,49) : on reproduit ces deux arrondis.
function quatreDecimales(n: number): number {
  return Math.round(n * 10000) / 10000;
}

export default definirCalculadora({
  id: "lu.salaire-social-minimum",
  mercado: "lu",
  concepto: "salario-minimo",
  slug: "salaire-social-minimum",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "truncar" },
  requiere: {
    "lu.ssm-non-qualifie": "numero",
    "lu.ssm-qualifie": "numero",
    "lu.ssm-jeunes": "mapa",
    "lu.heures-par-mois": "numero",
  },
  campos: [
    {
      id: "categorie",
      tipo: "opcion",
      etiqueta: "Situation du salarié",
      opciones: [
        { valor: "non-qualifie", etiqueta: "18 ans et plus, non qualifié" },
        { valor: "qualifie", etiqueta: "18 ans et plus, qualifié" },
        { valor: "17-18", etiqueta: "17 à 18 ans" },
        { valor: "15-17", etiqueta: "15 à 17 ans" },
      ],
      porDefecto: "non-qualifie",
    },
    { id: "heures", tipo: "numero", etiqueta: "Heures de travail par mois", min: 1, max: 260, porDefecto: 173, ayuda: "173 heures correspondent à un temps plein." },
  ],
  calcular(entrada, valores, { redondear }) {
    const heuresPleines = valores["lu.heures-par-mois"];
    if (entrada.heures <= 0) throw new ErrorEntrada("Indiquez un nombre d'heures supérieur à zéro.", "heures");
    const base = valores["lu.ssm-non-qualifie"];
    const mensuelPlein =
      entrada.categorie === "qualifie" ? valores["lu.ssm-qualifie"] : entrada.categorie === "non-qualifie" ? base : redondear((base * enMapa(valores["lu.ssm-jeunes"], entrada.categorie)) / 100);
    const horaire = quatreDecimales(mensuelPlein / heuresPleines);
    const mensuel = entrada.heures === heuresPleines ? mensuelPlein : redondear(horaire * entrada.heures);
    return { mensuel, horaire, annuel: redondear(mensuel * 12), mensuelPlein };
  },
  resultado: [
    { clave: "mensuel", etiqueta: "Salaire social minimum mensuel brut", formato: "moneda", destacada: true },
    { clave: "horaire", etiqueta: "Salaire horaire minimum brut", formato: "moneda", decimales: 4 },
    { clave: "annuel", etiqueta: "Sur douze mois", formato: "moneda" },
    { clave: "mensuelPlein", etiqueta: "Montant pour un temps plein (173 heures)", formato: "moneda" },
  ],
});
