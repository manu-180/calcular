import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { cotisationsCnss, REQ_CNSS } from "../lib/paie";

export default definirCalculadora({
  id: "bf.cout-employeur",
  mercado: "bf",
  concepto: "costo-empleador",
  slug: "cout-employeur",
  estado: "publicado",
  requiere: { ...REQ_CNSS, "bf.tpa-taux": "numero", "bf.tpa-abattement-cga": "numero" },
  campos: [
    {
      id: "remuneration",
      tipo: "moneda",
      etiqueta: "Rémunération brute mensuelle du salarié",
      min: 0,
      porDefecto: 150000,
      ayuda: "Salaire, primes, indemnités et avantages en nature.",
    },
    {
      id: "tpa",
      tipo: "si-no",
      etiqueta: "L'entreprise paie la taxe patronale et d'apprentissage",
      porDefecto: true,
      ayuda: "En sont exonérés notamment l'État, les établissements privés d'enseignement et de soins, les associations à but non lucratif et les missions diplomatiques.",
    },
    { id: "cga", tipo: "si-no", etiqueta: "Adhérent d'un centre de gestion agréé", porDefecto: false, visibleSi: { tpa: [true] } },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.remuneration <= 0) throw new ErrorEntrada("Indiquez une rémunération supérieure à zéro.", "remuneration");
    const c = cotisationsCnss(entrada.remuneration, v, redondear);
    const baseTpa = entrada.cga ? entrada.remuneration - porcentaje(entrada.remuneration, v["bf.tpa-abattement-cga"]) : entrada.remuneration;
    const tpa = entrada.tpa ? redondear(porcentaje(baseTpa, v["bf.tpa-taux"])) : 0;
    const charges = redondear(c.totalEmployeur + tpa);
    const cout = redondear(entrada.remuneration + charges);
    return {
      cout,
      charges,
      cnss: c.totalEmployeur,
      tpa,
      tauxCharges: redondear((charges / entrada.remuneration) * 10000) / 100,
      coutAnnuel: redondear(cout * 12),
    };
  },
  resultado: [
    { clave: "cout", etiqueta: "Coût mensuel pour l'employeur", formato: "moneda", destacada: true },
    { clave: "charges", etiqueta: "Charges patronales", formato: "moneda" },
    { clave: "cnss", etiqueta: "Cotisations CNSS de l'employeur", formato: "moneda" },
    { clave: "tpa", etiqueta: "Taxe patronale et d'apprentissage (TPA)", formato: "moneda", ocultarSiCero: true },
    { clave: "tauxCharges", etiqueta: "Charges en pourcentage de la rémunération", formato: "porcentaje", decimales: 2 },
    { clave: "coutAnnuel", etiqueta: "Coût sur 12 mois", formato: "moneda" },
  ],
});
