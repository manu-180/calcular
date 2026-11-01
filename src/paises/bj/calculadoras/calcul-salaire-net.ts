import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisationsCnss, REQ_CNSS } from "../lib/cnss";
import { itsMensuel, OPTIONS_MOIS, REQ_ITS } from "../lib/its";

export default definirCalculadora({
  id: "bj.calcul-salaire-net",
  mercado: "bj",
  concepto: "sueldo-neto",
  slug: "calcul-salaire-net",
  estado: "publicado",
  requiere: { ...REQ_ITS, ...REQ_CNSS },
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Salaire brut imposable du mois",
      min: 0,
      porDefecto: 300000,
      ayuda: "Salaire de base, primes, heures supplémentaires, indemnités (y compris le transport) et avantages en nature.",
    },
    {
      id: "mois",
      tipo: "opcion",
      etiqueta: "Mois de paie",
      opciones: OPTIONS_MOIS,
      porDefecto: "autre",
      ayuda: "La redevance ORTB s'ajoute à l'impôt sur les salaires de mars et de juin.",
    },
    {
      id: "autres",
      tipo: "moneda",
      etiqueta: "Autres retenues du mois",
      min: 0,
      porDefecto: 0,
      ayuda: "Mutuelle, avance sur salaire, prêt : ce qui figure en plus sur votre bulletin de paie.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const its = itsMensuel(entrada.brut, entrada.mois, v, redondear);
    const cnss = cotisationsCnss(entrada.brut, 0, v, redondear);
    const net = redondear(entrada.brut - its.total - cnss.totalSalarie - entrada.autres);
    if (net < 0) throw new ErrorEntrada("Les retenues dépassent le salaire du mois.", "autres");
    return {
      net,
      its: its.impot,
      redevance: its.redevance,
      cnss: cnss.totalSalarie,
      autres: entrada.autres,
      tauxRetenue: redondear(((its.total + cnss.totalSalarie) / entrada.brut) * 10000) / 100,
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Salaire net à payer", formato: "moneda", destacada: true },
    { clave: "its", etiqueta: "Impôt sur les traitements et salaires (ITS)", formato: "moneda" },
    { clave: "redevance", etiqueta: "Redevance ORTB", formato: "moneda", ocultarSiCero: true },
    { clave: "cnss", etiqueta: "Cotisation pension CNSS", formato: "moneda" },
    { clave: "autres", etiqueta: "Autres retenues", formato: "moneda", ocultarSiCero: true },
    { clave: "tauxRetenue", etiqueta: "Part du brut retenue (impôt et CNSS)", formato: "porcentaje", decimales: 2 },
  ],
  mundo: { bruto: "brut", periodoBruto: "mes", neto: "net", periodoNeto: "mes", entrada: { mois: "autre", autres: 0 } },
});
