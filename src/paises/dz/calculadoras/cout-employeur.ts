import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dz.cout-employeur",
  mercado: "dz",
  concepto: "costo-empleador",
  slug: "cout-employeur",
  estado: "publicado",
  requiere: { "dz.cnas": "mapa", "dz.snmg": "numero" },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 60000 },
    { id: "salaries", tipo: "entero", etiqueta: "Nombre de salariés à ce salaire", min: 1, max: 10000, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const t = v["dz.cnas"];
    const patronale = redondear(porcentaje(e.brut, t.employeur));
    const oeuvres = redondear(porcentaje(e.brut, t["oeuvres-sociales"]));
    const cout = redondear(e.brut + patronale + oeuvres);
    return {
      cout,
      patronale,
      oeuvres,
      coutAnnuel: redondear(cout * 12 * e.salaries),
      coutMensuelTotal: e.salaries > 1 ? redondear(cout * e.salaries) : null,
      surcout: ((patronale + oeuvres) / e.brut) * 100,
      observaciones: [
        "Le coût comprend le salaire brut, la part patronale de la cotisation de sécurité sociale et la quote-part du fonds des œuvres sociales. Il ne comprend pas les primes et avantages prévus par la convention collective ou le contrat.",
      ],
    };
  },
  resultado: [
    { clave: "cout", etiqueta: "Coût mensuel d'un salarié", formato: "moneda", destacada: true },
    { clave: "patronale", etiqueta: "Cotisation patronale CNAS", formato: "moneda" },
    { clave: "oeuvres", etiqueta: "Quote-part des œuvres sociales", formato: "moneda" },
    { clave: "coutMensuelTotal", etiqueta: "Coût mensuel pour tous les salariés", formato: "moneda" },
    { clave: "coutAnnuel", etiqueta: "Coût sur 12 mois", formato: "moneda" },
    { clave: "surcout", etiqueta: "Charges en plus du brut", formato: "porcentaje", decimales: 1 },
  ],
});
