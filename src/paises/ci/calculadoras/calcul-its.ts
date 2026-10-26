import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { itsMensuel, nombreDeParts, OPTIONS_SITUATION, reductionRetraite, REQ_ITS } from "../lib/its";

export default definirCalculadora({
  id: "ci.calcul-its",
  mercado: "ci",
  concepto: "impuesto-renta",
  slug: "calcul-its",
  estado: "publicado",
  requiere: {
    ...REQ_ITS,
    "ci.its-abattement-pension": "numero",
    "ci.its-abattement-retraite-70-ans": "numero",
  },
  campos: [
    {
      id: "revenu",
      tipo: "opcion",
      etiqueta: "Type de revenu",
      opciones: [
        { valor: "salaire", etiqueta: "Salaire" },
        { valor: "pension", etiqueta: "Pension de retraite ou rente viagère" },
      ],
      porDefecto: "salaire",
    },
    { id: "brut", tipo: "moneda", etiqueta: "Montant brut imposable par mois", min: 0, porDefecto: 300000, ayuda: "Salaire, primes, heures supplémentaires et avantages en nature, sans les indemnités exonérées." },
    { id: "situation", tipo: "opcion", etiqueta: "Situation de famille", opciones: OPTIONS_SITUATION, porDefecto: "celibataire" },
    { id: "enfants", tipo: "entero", etiqueta: "Enfants à charge", min: 0, max: 20, porDefecto: 0 },
    { id: "infirmes", tipo: "entero", etiqueta: "Dont enfants infirmes", min: 0, max: 20, porDefecto: 0 },
    { id: "plus70", tipo: "si-no", etiqueta: "Vous avez plus de 70 ans", porDefecto: false, visibleSi: { revenu: ["pension"] } },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un montant brut supérieur à zéro.", "brut");
    const abattement = entrada.revenu === "pension" ? Math.min(entrada.brut, v["ci.its-abattement-pension"]) : 0;
    const base = redondear(entrada.brut - abattement);
    const parts = nombreDeParts(entrada.situation, entrada.enfants, entrada.infirmes, v["ci.its-parts-max"]);
    const its = itsMensuel(base, parts, v, redondear);
    const reduction = entrada.revenu === "pension" && entrada.plus70 ? reductionRetraite(its.impotNet, v["ci.its-abattement-retraite-70-ans"], redondear) : 0;
    const impot = redondear(its.impotNet - reduction);
    return {
      impot,
      impotAnnuel: redondear(impot * 12),
      abattement,
      base,
      impotBrut: its.impotBrut,
      parts,
      ricf: its.ricf,
      reduction,
      tauxMoyen: redondear((impot / entrada.brut) * 10000) / 100,
    };
  },
  resultado: [
    { clave: "impot", etiqueta: "ITS à retenir par mois", formato: "moneda", destacada: true },
    { clave: "impotAnnuel", etiqueta: "ITS sur 12 mois", formato: "moneda" },
    { clave: "abattement", etiqueta: "Abattement sur la pension", formato: "moneda", ocultarSiCero: true },
    { clave: "base", etiqueta: "Base imposable mensuelle", formato: "moneda" },
    { clave: "impotBrut", etiqueta: "Impôt brut selon le barème", formato: "moneda" },
    { clave: "parts", etiqueta: "Nombre de parts", formato: "numero", decimales: 1 },
    { clave: "ricf", etiqueta: "Réduction pour charges de famille", formato: "moneda", ocultarSiCero: true },
    { clave: "reduction", etiqueta: "Abattement des retraités de plus de 70 ans", formato: "moneda", ocultarSiCero: true },
    { clave: "tauxMoyen", etiqueta: "Taux moyen", formato: "porcentaje", decimales: 2 },
  ],
});
