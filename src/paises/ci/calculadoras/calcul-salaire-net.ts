import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisationsCnps, REQ_CNPS } from "../lib/cnps";
import { itsMensuel, nombreDeParts, OPTIONS_SITUATION, REQ_ITS } from "../lib/its";

export default definirCalculadora({
  id: "ci.calcul-salaire-net",
  mercado: "ci",
  concepto: "sueldo-neto",
  slug: "calcul-salaire-net",
  estado: "publicado",
  requiere: { ...REQ_ITS, ...REQ_CNPS },
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Salaire brut imposable mensuel",
      min: 0,
      porDefecto: 300000,
      ayuda: "Salaire de base, primes imposables, heures supplémentaires et avantages en nature.",
    },
    {
      id: "nonImposable",
      tipo: "moneda",
      etiqueta: "Indemnités non imposables du mois",
      min: 0,
      porDefecto: 0,
      ayuda: "Par exemple l'indemnité de transport dans la limite exonérée. Elles s'ajoutent au net sans impôt ni cotisation.",
    },
    { id: "situation", tipo: "opcion", etiqueta: "Situation de famille", opciones: OPTIONS_SITUATION, porDefecto: "celibataire" },
    { id: "enfants", tipo: "entero", etiqueta: "Enfants à charge", min: 0, max: 20, porDefecto: 0 },
    { id: "infirmes", tipo: "entero", etiqueta: "Dont enfants infirmes", min: 0, max: 20, porDefecto: 0 },
    {
      id: "autres",
      tipo: "moneda",
      etiqueta: "Autres retenues du mois",
      min: 0,
      porDefecto: 0,
      ayuda: "Couverture maladie, mutuelle, avance sur salaire : ce qui figure sur votre bulletin de paie.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const parts = nombreDeParts(entrada.situation, entrada.enfants, entrada.infirmes, v["ci.its-parts-max"]);
    const its = itsMensuel(entrada.brut, parts, v, redondear);
    const cnps = cotisationsCnps(entrada.brut, v["ci.cnps-accident-travail"].minimum, v, redondear);
    const net = redondear(entrada.brut - its.impotNet - cnps.totalSalarie - entrada.autres + entrada.nonImposable);
    if (net < 0) throw new ErrorEntrada("Les retenues dépassent le salaire du mois.", "autres");
    return {
      net,
      its: its.impotNet,
      cnps: cnps.totalSalarie,
      autres: entrada.autres,
      nonImposable: entrada.nonImposable,
      parts,
      netAnnuel: redondear(net * 12),
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Salaire net à payer", formato: "moneda", destacada: true },
    { clave: "its", etiqueta: "ITS retenu", formato: "moneda" },
    { clave: "cnps", etiqueta: "Cotisation retraite CNPS", formato: "moneda" },
    { clave: "autres", etiqueta: "Autres retenues", formato: "moneda", ocultarSiCero: true },
    { clave: "nonImposable", etiqueta: "Indemnités non imposables ajoutées", formato: "moneda", ocultarSiCero: true },
    { clave: "parts", etiqueta: "Nombre de parts", formato: "numero", decimales: 1 },
    { clave: "netAnnuel", etiqueta: "Net sur 12 mois", formato: "moneda" },
  ],
});
