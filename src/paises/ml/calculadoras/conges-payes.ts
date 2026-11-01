import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ml.conges-payes",
  mercado: "ml",
  concepto: "vacaciones",
  slug: "conges-payes",
  estado: "publicado",
  requiere: {
    "ml.conges-jours-par-mois": "numero",
    "ml.conges-anciennete": "escala",
    "ml.conges-meres-jour-par-enfant": "numero",
    "ml.conges-diviseur-allocation": "numero",
  },
  campos: [
    { id: "mois", tipo: "numero", etiqueta: "Mois de travail dans la période de référence", min: 0, max: 24, porDefecto: 12, ayuda: "Quatre semaines ou 24 jours de travail comptent pour un mois." },
    {
      id: "remuneration",
      tipo: "moneda",
      etiqueta: "Rémunération totale perçue pendant la période",
      min: 0,
      porDefecto: 2400000,
      ayuda: "Salaires, primes et avantages en nature, sans les remboursements de frais ni les gratifications et primes annuelles.",
    },
    { id: "anciennete", tipo: "entero", etiqueta: "Années de service dans l'entreprise", min: 0, max: 60, porDefecto: 5 },
    { id: "enfants", tipo: "entero", etiqueta: "Enfants de moins de 15 ans (mères de famille)", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.remuneration < 0) throw new ErrorEntrada("La rémunération ne peut pas être négative.", "remuneration");
    const joursPrincipal = Math.round(entrada.mois * v["ml.conges-jours-par-mois"] * 100) / 100;
    // L'échelle de l'article L.154 donne un nombre de jours par palier, pas un cumul : on prend le
    // taux de la tranche atteinte.
    const paliers = v["ml.conges-anciennete"];
    const palier = [...paliers].reverse().find((f) => entrada.anciennete >= f.desde);
    const joursAnciennete = palier ? palier.tasa : 0;
    const joursEnfants = entrada.enfants * v["ml.conges-meres-jour-par-enfant"];
    const allocation = redondear(entrada.remuneration / v["ml.conges-diviseur-allocation"]);
    const observaciones: string[] = [];
    if (joursAnciennete + joursEnfants > 0) {
      observaciones.push("Chaque jour supplémentaire est payé au quotient de l'allocation principale par le nombre de jours ouvrables compris dans le congé principal.");
    }
    return { joursPrincipal, joursAnciennete, joursEnfants, allocation, observaciones };
  },
  resultado: [
    { clave: "joursPrincipal", etiqueta: "Congé principal (jours calendaires)", formato: "dias", decimales: 1, destacada: true },
    { clave: "allocation", etiqueta: "Allocation de congé pour le congé principal", formato: "moneda" },
    { clave: "joursAnciennete", etiqueta: "Jours ouvrables en plus pour l'ancienneté", formato: "dias", ocultarSiCero: true },
    { clave: "joursEnfants", etiqueta: "Jours ouvrables en plus pour les enfants", formato: "dias", ocultarSiCero: true },
  ],
});
