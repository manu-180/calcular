import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { itsAnnuel, OPTIONS_SITUATION, REQ_ITS, retraiteDeductible } from "../lib/its";

export default definirCalculadora({
  id: "ml.calcul-salaire-net",
  mercado: "ml",
  concepto: "sueldo-neto",
  slug: "calcul-salaire-net",
  estado: "borrador",
  requiere: { ...REQ_ITS, "ml.inps-retraite-salarie": "numero", "ml.amo-taux": "mapa", "ml.smig": "numero" },
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Salaire brut mensuel",
      min: 0,
      porDefecto: 250000,
      ayuda: "Salaire de base, primes et indemnités imposables, heures supplémentaires.",
    },
    {
      id: "nonImposable",
      tipo: "moneda",
      etiqueta: "Indemnités non imposables du mois",
      min: 0,
      porDefecto: 0,
      ayuda: "Remboursements de frais et indemnités exonérées (transport dans la limite de 10 % du salaire de base, par exemple). Elles s'ajoutent au net sans impôt ni cotisation.",
    },
    { id: "situation", tipo: "opcion", etiqueta: "Situation de famille", opciones: OPTIONS_SITUATION, porDefecto: "celibataire" },
    { id: "enfants", tipo: "entero", etiqueta: "Enfants à charge", min: 0, max: 20, porDefecto: 0 },
    { id: "infirmes", tipo: "entero", etiqueta: "Dont enfants majeurs infirmes", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    // Les cotisations ne peuvent pas être calculées sur moins que le SMIG (Code de prévoyance sociale,
    // article 189 ; pour l'AMO, article 6 du décret sur le recouvrement publié au JO n° 50 de 2010).
    const assiette = Math.max(entrada.brut, v["ml.smig"]);
    const inps = redondear(porcentaje(assiette, v["ml.inps-retraite-salarie"]));
    const amo = redondear(porcentaje(assiette, v["ml.amo-taux"]["salarie"]));
    const deduction = retraiteDeductible(entrada.brut, inps, v, redondear);
    const imposableMensuel = redondear(entrada.brut - deduction);
    const its = itsAnnuel(imposableMensuel * 12, entrada, v, redondear);
    const net = redondear(entrada.brut - inps - amo - its.impotMensuel + entrada.nonImposable);
    return {
      net,
      inps,
      amo,
      its: its.impotMensuel,
      nonImposable: entrada.nonImposable,
      retenues: entrada.brut > 0 ? ((inps + amo + its.impotMensuel) / entrada.brut) * 100 : 0,
      netAnnuel: redondear(net * 12),
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Salaire net à payer", formato: "moneda", destacada: true },
    { clave: "inps", etiqueta: "Cotisation retraite INPS", formato: "moneda" },
    { clave: "amo", etiqueta: "Cotisation AMO", formato: "moneda" },
    { clave: "its", etiqueta: "ITS retenu", formato: "moneda" },
    { clave: "nonImposable", etiqueta: "Indemnités non imposables ajoutées", formato: "moneda", ocultarSiCero: true },
    { clave: "retenues", etiqueta: "Part des retenues dans le brut", formato: "porcentaje", decimales: 1 },
    { clave: "netAnnuel", etiqueta: "Net sur 12 mois", formato: "moneda" },
  ],
  mundo: { bruto: "brut", periodoBruto: "mes", neto: "net", periodoNeto: "mes", entrada: { nonImposable: 0 } },
});
