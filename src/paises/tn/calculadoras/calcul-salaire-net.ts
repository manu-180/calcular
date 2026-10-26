import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CHAMPS_FAMILLE, REQ_SALAIRE, salaire } from "../lib/irpp";

export default definirCalculadora({
  id: "tn.calcul-salaire-net",
  mercado: "tn",
  concepto: "sueldo-neto",
  slug: "calcul-salaire-net",
  estado: "publicado",
  requiere: REQ_SALAIRE,
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 2000, ayuda: "Salaire de base, primes et avantages soumis à cotisation." },
    ...CHAMPS_FAMILLE,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const s = salaire(entrada.brut, entrada, v, redondear);
    return {
      net: redondear(entrada.brut - s.cnssMensuel - s.irppMensuel - s.cssMensuel),
      brut: entrada.brut,
      cnss: s.cnssMensuel,
      irpp: s.irppMensuel,
      css: s.cssMensuel,
      netAnnuel: redondear(s.brutAnnuel - s.cnss - s.irpp - s.css),
      observaciones: [
        "Calcul sur une base annuelle divisée par 12, pour un salaire stable sur l'année dans le secteur non agricole. Les retenues réelles peuvent varier d'un mois à l'autre selon les primes versées.",
      ],
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Salaire net mensuel", formato: "moneda", destacada: true },
    { clave: "brut", etiqueta: "Salaire brut mensuel", formato: "moneda" },
    { clave: "cnss", etiqueta: "Moins : cotisation CNSS", formato: "moneda" },
    { clave: "irpp", etiqueta: "Moins : impôt sur le revenu (IRPP)", formato: "moneda" },
    { clave: "css", etiqueta: "Moins : contribution sociale de solidarité", formato: "moneda" },
    { clave: "netAnnuel", etiqueta: "Salaire net annuel", formato: "moneda" },
  ],
});
