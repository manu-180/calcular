import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { calculerIrsa, REQ_IRSA } from "../lib/irsa";

// En borrador : les taux de cotisation salariale (CNaPS et organisme sanitaire) et le SME en vigueur
// depuis octobre 2026 n'ont pas pu être lus dans un texte officiel en ligne.
export default definirCalculadora({
  id: "mg.calcul-salaire-net",
  mercado: "mg",
  concepto: "sueldo-neto",
  slug: "calcul-salaire-net",
  estado: "borrador",
  requiere: {
    ...REQ_IRSA,
    "mg.sme-general": "numero",
    "mg.plafond-cnaps-sme": "numero",
    "mg.cotisation-cnaps-salarie": "numero",
    "mg.cotisation-sante-salarie": "numero",
  },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 1000000, ayuda: "Salaire de base, primes, indemnités et avantages en nature imposables." },
    { id: "personnesCharge", tipo: "entero", etiqueta: "Personnes à charge", min: 0, max: 20, porDefecto: 0 },
    { id: "autres", tipo: "moneda", etiqueta: "Autres retenues du mois", min: 0, porDefecto: 0, ayuda: "Avance sur salaire, prêt, cotisation syndicale." },
  ],
  calcular(e, v, { redondear }) {
    if (e.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const plafond = v["mg.sme-general"] * v["mg.plafond-cnaps-sme"];
    const cnaps = redondear(porcentaje(Math.min(e.brut, plafond), v["mg.cotisation-cnaps-salarie"]));
    const sante = redondear(porcentaje(e.brut, v["mg.cotisation-sante-salarie"]));
    const r = calculerIrsa({ brut: e.brut, exonere: 0, retraite: cnaps, sante, personnesCharge: e.personnesCharge }, v, redondear);
    const net = redondear(e.brut - cnaps - sante - r.irsa - e.autres);
    if (net < 0) throw new ErrorEntrada("Les retenues dépassent le salaire du mois.", "autres");
    return { net, cnaps, sante, irsa: r.irsa, autres: e.autres, totalRetenues: redondear(cnaps + sante + r.irsa + e.autres), netAnnuel: redondear(net * 12) };
  },
  resultado: [
    { clave: "net", etiqueta: "Salaire net à payer", formato: "moneda", destacada: true },
    { clave: "cnaps", etiqueta: "Cotisation CNaPS", formato: "moneda" },
    { clave: "sante", etiqueta: "Cotisation à l'organisme sanitaire", formato: "moneda" },
    { clave: "irsa", etiqueta: "IRSA", formato: "moneda" },
    { clave: "autres", etiqueta: "Autres retenues", formato: "moneda", ocultarSiCero: true },
    { clave: "totalRetenues", etiqueta: "Total des retenues", formato: "moneda" },
    { clave: "netAnnuel", etiqueta: "Net sur 12 mois", formato: "moneda" },
  ],
  mundo: { bruto: "brut", periodoBruto: "mes", neto: "net", periodoNeto: "mes" },
});
