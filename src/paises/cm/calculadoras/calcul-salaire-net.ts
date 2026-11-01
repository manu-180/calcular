import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQ_RETENUES, retenuesMensuelles } from "../lib/paie";

export default definirCalculadora({
  id: "cm.calcul-salaire-net",
  mercado: "cm",
  concepto: "sueldo-neto",
  slug: "calcul-salaire-net",
  estado: "publicado",
  requiere: REQ_RETENUES,
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Salaire brut taxable mensuel",
      min: 0,
      porDefecto: 300000,
      ayuda: "Salaire de base, primes, indemnités imposables (dont le transport) et avantages en nature.",
    },
    {
      id: "salaireBase",
      tipo: "moneda",
      etiqueta: "Salaire de base mensuel",
      min: 0,
      requerido: false,
      ayuda: "Sert à la taxe de développement local. Laissez vide s'il est égal au brut.",
    },
    {
      id: "nonImposable",
      tipo: "moneda",
      etiqueta: "Allocations non imposables du mois",
      min: 0,
      porDefecto: 0,
      ayuda: "Allocations familiales ou remboursements de frais liés à l'emploi. Elles s'ajoutent au net sans retenue.",
    },
    {
      id: "autres",
      tipo: "moneda",
      etiqueta: "Autres retenues du mois",
      min: 0,
      porDefecto: 0,
      ayuda: "Avance sur salaire, mutuelle, cotisation syndicale : ce qui figure en plus sur votre bulletin.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const base = entrada.salaireBase ?? entrada.brut;
    if (base > entrada.brut) throw new ErrorEntrada("Le salaire de base ne peut pas dépasser le brut taxable.", "salaireBase");
    const r = retenuesMensuelles(entrada.brut, base, v, redondear);
    const net = redondear(entrada.brut - r.total - entrada.autres + entrada.nonImposable);
    if (net < 0) throw new ErrorEntrada("Les retenues dépassent le salaire du mois.", "autres");
    return {
      net,
      cnps: r.cnps,
      irpp: r.irpp,
      cac: r.cac,
      cfc: r.cfc,
      rav: r.rav,
      tdl: r.tdl,
      autres: entrada.autres,
      nonImposable: entrada.nonImposable,
      totalRetenues: redondear(r.total + entrada.autres),
      netAnnuel: redondear(net * 12),
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Salaire net à payer", formato: "moneda", destacada: true },
    { clave: "cnps", etiqueta: "Pension vieillesse CNPS", formato: "moneda" },
    { clave: "irpp", etiqueta: "IRPP", formato: "moneda" },
    { clave: "cac", etiqueta: "Centimes additionnels communaux", formato: "moneda" },
    { clave: "cfc", etiqueta: "Crédit foncier du Cameroun", formato: "moneda" },
    { clave: "rav", etiqueta: "Redevance audiovisuelle (CRTV)", formato: "moneda" },
    { clave: "tdl", etiqueta: "Taxe de développement local", formato: "moneda" },
    { clave: "autres", etiqueta: "Autres retenues", formato: "moneda", ocultarSiCero: true },
    { clave: "nonImposable", etiqueta: "Allocations non imposables ajoutées", formato: "moneda", ocultarSiCero: true },
    { clave: "totalRetenues", etiqueta: "Total des retenues", formato: "moneda" },
    { clave: "netAnnuel", etiqueta: "Net sur 12 mois", formato: "moneda" },
  ],
  mundo: { bruto: "brut", periodoBruto: "mes", neto: "net", periodoNeto: "mes" },
});
