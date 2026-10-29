import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ml.taxes-sur-salaires",
  mercado: "ml",
  concepto: "propio",
  slug: "taxes-sur-salaires",
  estado: "publicado",
  requiere: { "ml.taxes-salaires": "mapa" },
  campos: [
    {
      id: "masse",
      tipo: "moneda",
      etiqueta: "Masse salariale brute du mois",
      min: 0,
      porDefecto: 5000000,
      ayuda: "Rémunérations, salaires, indemnités et avantages en nature payés à tout le personnel.",
    },
    {
      id: "assujetti",
      tipo: "si-no",
      etiqueta: "Entreprise soumise à l'IS, à l'IBIC ou à l'impôt sur les bénéfices agricoles",
      porDefecto: true,
      ayuda: "La CFE, la TFP et la TEJ ne concernent que ces employeurs. La taxe logement est due par tous les employeurs, publics et privés.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.masse <= 0) throw new ErrorEntrada("Indiquez une masse salariale supérieure à zéro.", "masse");
    const t = v["ml.taxes-salaires"];
    // La base de la CFE, de la TFP et de la TEJ est arrondie aux mille francs inférieurs (CGI,
    // articles 160, 184 et 185-B).
    const base = Math.floor(entrada.masse / 1000) * 1000;
    const cfe = entrada.assujetti ? redondear(porcentaje(base, t["cfe"])) : 0;
    const tfp = entrada.assujetti ? redondear(porcentaje(base, t["tfp"])) : 0;
    const tej = entrada.assujetti ? redondear(porcentaje(base, t["tej"])) : 0;
    const logement = redondear(porcentaje(entrada.masse, t["logement"]));
    const total = redondear(cfe + tfp + tej + logement);
    return { total, cfe, tfp, tej, logement, poids: (total / entrada.masse) * 100 };
  },
  resultado: [
    { clave: "total", etiqueta: "Total des taxes sur les salaires du mois", formato: "moneda", destacada: true },
    { clave: "cfe", etiqueta: "Contribution forfaitaire à la charge des employeurs (CFE)", formato: "moneda", ocultarSiCero: true },
    { clave: "tfp", etiqueta: "Taxe de formation professionnelle (TFP)", formato: "moneda", ocultarSiCero: true },
    { clave: "tej", etiqueta: "Taxe emploi jeunes (TEJ)", formato: "moneda", ocultarSiCero: true },
    { clave: "logement", etiqueta: "Taxe logement", formato: "moneda" },
    { clave: "poids", etiqueta: "Poids sur la masse salariale", formato: "porcentaje", decimales: 2 },
  ],
});
