import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tn.cout-employeur",
  mercado: "tn",
  concepto: "costo-empleador",
  slug: "cout-employeur",
  estado: "publicado",
  requiere: {
    "tn.cnss-employeur": "numero",
    "tn.accidents-travail": "mapa",
  },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 2000 },
    { id: "at", tipo: "numero", etiqueta: "Taux accidents du travail (%)", min: 0, porDefecto: 0.4, ayuda: "Il dépend de l'activité de l'entreprise. Il figure sur votre avis d'affiliation à la CNSS." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const at = v["tn.accidents-travail"];
    if (entrada.at < at.minimum || entrada.at > at.maximum) {
      throw new ErrorEntrada(`Le taux accidents du travail va de ${at.minimum} % à ${at.maximum} %.`, "at");
    }
    const cnss = redondear(porcentaje(entrada.brut, v["tn.cnss-employeur"]));
    const accidents = redondear(porcentaje(entrada.brut, entrada.at));
    const cout = redondear(entrada.brut + cnss + accidents);
    return {
      cout,
      cnss,
      accidents,
      coutAnnuel: redondear(cout * 12),
      observaciones: ["Hors primes conventionnelles et taxes assises sur les salaires, qui dépendent de l'entreprise."],
    };
  },
  resultado: [
    { clave: "cout", etiqueta: "Coût mensuel pour l'employeur", formato: "moneda", destacada: true },
    { clave: "cnss", etiqueta: "Cotisations patronales CNSS", formato: "moneda" },
    { clave: "accidents", etiqueta: "Cotisation accidents du travail", formato: "moneda" },
    { clave: "coutAnnuel", etiqueta: "Coût annuel", formato: "moneda" },
  ],
});
