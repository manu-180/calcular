import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";
import { itsMensuel, OPTIONS_MOIS, REQ_ITS } from "../lib/its";

const f = (n: number) => n.toLocaleString("fr-FR").replace(/\s/g, " ");

export default definirCalculadora({
  id: "bj.calcul-its",
  mercado: "bj",
  concepto: "impuesto-renta",
  slug: "calcul-its",
  estado: "publicado",
  requiere: REQ_ITS,
  campos: [
    {
      id: "salaire",
      tipo: "moneda",
      etiqueta: "Salaire mensuel imposable",
      min: 0,
      porDefecto: 300000,
      ayuda: "Le montant brut du mois, avantages en nature et indemnités de transport compris.",
    },
    { id: "mois", tipo: "opcion", etiqueta: "Mois de paie", opciones: OPTIONS_MOIS, porDefecto: "autre" },
  ],
  tablas: [{ clave: "detail", titulo: "Impôt par tranche du barème", filasVisibles: 5 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    const its = itsMensuel(entrada.salaire, entrada.mois, v, redondear);
    const bareme = v["bj.its-bareme"];
    const detail: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "tranche", etiqueta: "Tranche", formato: "texto" },
        { clave: "taux", etiqueta: "Taux", formato: "porcentaje" },
        { clave: "impot", etiqueta: "Impôt", formato: "moneda" },
      ],
      filas: bareme.map((t) => {
        const part = Math.max(0, Math.min(entrada.salaire, t.hasta ?? Number.POSITIVE_INFINITY) - t.desde);
        const libelle = t.hasta === null ? `Au-delà de ${f(t.desde)} F` : `De ${f(t.desde)} à ${f(t.hasta)} F`;
        return [libelle, t.tasa, redondear(porcentaje(part, t.tasa))];
      }),
    };
    const marginal = [...bareme].reverse().find((t) => entrada.salaire > t.desde)?.tasa ?? 0;
    return {
      total: its.total,
      impot: its.impot,
      redevance: its.redevance,
      tauxMoyen: redondear((its.impot / entrada.salaire) * 10000) / 100,
      tauxMarginal: marginal,
      annuel: redondear(its.impot * 12),
      detail,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Retenue du mois", formato: "moneda", destacada: true },
    { clave: "impot", etiqueta: "ITS selon le barème", formato: "moneda" },
    { clave: "redevance", etiqueta: "Redevance ORTB", formato: "moneda", ocultarSiCero: true },
    { clave: "tauxMoyen", etiqueta: "Taux moyen", formato: "porcentaje", decimales: 2 },
    { clave: "tauxMarginal", etiqueta: "Taux de la dernière tranche atteinte", formato: "porcentaje" },
    { clave: "annuel", etiqueta: "ITS sur 12 mois au même salaire (hors redevance)", formato: "moneda" },
  ],
});
