import { definirCalculadora } from "@/motor/calculo";
import { iutsMensuel, OPTIONS_CATEGORIE, REQ_IUTS } from "../lib/paie";

export default definirCalculadora({
  id: "bf.calcul-iuts",
  mercado: "bf",
  concepto: "impuesto-renta",
  slug: "calcul-iuts",
  estado: "publicado",
  requiere: REQ_IUTS,
  campos: [
    {
      id: "base",
      tipo: "moneda",
      etiqueta: "Salaire de base mensuel",
      min: 0,
      porDefecto: 150000,
      ayuda: "Le salaire catégoriel prévu au contrat, sans les primes ni les indemnités.",
    },
    { id: "primes", tipo: "moneda", etiqueta: "Primes, sursalaire et avantages en nature du mois", min: 0, porDefecto: 0 },
    { id: "logement", tipo: "moneda", etiqueta: "Indemnité de logement", min: 0, porDefecto: 0 },
    { id: "fonction", tipo: "moneda", etiqueta: "Indemnité de fonction", min: 0, porDefecto: 0 },
    { id: "transport", tipo: "moneda", etiqueta: "Indemnité de transport ou de déplacement", min: 0, porDefecto: 0 },
    { id: "categorie", tipo: "opcion", etiqueta: "Catégorie professionnelle", opciones: OPTIONS_CATEGORIE, porDefecto: "autres" },
    { id: "charges", tipo: "entero", etiqueta: "Charges de famille", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    const r = iutsMensuel(entrada, v, redondear);
    return {
      iuts: r.iuts,
      impotBrut: r.impotBrut,
      tauxReduction: r.tauxReduction,
      reduction: r.reduction,
      brut: r.brut,
      cnss: r.pensionDeduite,
      abattement: r.abattement,
      exonerations: r.exonerations,
      netImposable: r.netImposable,
      iutsAnnuel: redondear(r.iuts * 12),
    };
  },
  resultado: [
    { clave: "iuts", etiqueta: "IUTS du mois", formato: "moneda", destacada: true },
    { clave: "brut", etiqueta: "Rémunération brute", formato: "moneda" },
    { clave: "cnss", etiqueta: "Cotisation retraite déduite", formato: "moneda" },
    { clave: "abattement", etiqueta: "Abattement pour frais professionnels", formato: "moneda" },
    { clave: "exonerations", etiqueta: "Indemnités exonérées", formato: "moneda", ocultarSiCero: true },
    { clave: "netImposable", etiqueta: "Revenu net imposable", formato: "moneda" },
    { clave: "impotBrut", etiqueta: "Impôt selon le barème", formato: "moneda" },
    { clave: "tauxReduction", etiqueta: "Réduction pour charges de famille", formato: "porcentaje", ocultarSiCero: true },
    { clave: "reduction", etiqueta: "Montant de la réduction", formato: "moneda", ocultarSiCero: true },
    { clave: "iutsAnnuel", etiqueta: "IUTS sur 12 mois", formato: "moneda" },
  ],
});
