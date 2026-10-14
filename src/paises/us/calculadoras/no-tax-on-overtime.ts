import { definirCalculadora, enMapa } from "@/motor/calculo";
import { claveConjunta, escalaDe, ESCALAS, estadoValido, impuestoFederal, OPCIONES_ESTADO_CIVIL, recorteObbba } from "../lib/impuestos";

export default definirCalculadora({
  id: "us.no-tax-on-overtime",
  mercado: "us",
  concepto: "propio",
  slug: "no-tax-on-overtime",
  estado: "publicado",
  requiere: {
    ...ESCALAS,
    "us.overtime-deduction-max": "mapa",
    "us.tips-overtime-threshold": "mapa",
    "us.tips-overtime-phaseout-step": "numero",
    "us.overtime-multiplier": "numero",
  },
  campos: [
    { id: "estado", tipo: "opcion", etiqueta: "Filing status", opciones: OPCIONES_ESTADO_CIVIL, porDefecto: "single" },
    {
      id: "pagoExtra",
      tipo: "moneda",
      etiqueta: "Total overtime pay for the year",
      min: 0,
      porDefecto: 15000,
      ayuda: "Everything you were paid for hours over 40 a week at time and a half. If your W-2 shows only the premium, multiply it by 3.",
    },
    { id: "magi", tipo: "moneda", etiqueta: "Modified adjusted gross income (MAGI)", min: 0, porDefecto: 80000, ayuda: "For most people it is the same as AGI." },
    { id: "gravable", tipo: "moneda", etiqueta: "Taxable income before this deduction", min: 0, requerido: false, ayuda: "Optional. Lets the calculator estimate your tax savings." },
  ],
  calcular(entrada, valores, { redondear }) {
    const estado = estadoValido(entrada.estado);
    const factor = valores["us.overtime-multiplier"];
    const prima = redondear((entrada.pagoExtra * (factor - 1)) / factor);
    if (estado === "mfs") {
      return {
        prima,
        tope: 0,
        recorte: 0,
        deduccion: 0,
        ahorro: null,
        observaciones: ["Married people must file a joint return to claim this deduction."],
      };
    }
    const clave = claveConjunta(estado);
    const tope = enMapa(valores["us.overtime-deduction-max"], clave);
    const recorte = recorteObbba(entrada.magi, enMapa(valores["us.tips-overtime-threshold"], clave), valores["us.tips-overtime-phaseout-step"]);
    const deduccion = redondear(Math.max(0, Math.min(prima, tope) - recorte));
    let ahorro: number | null = null;
    if (entrada.gravable !== null) {
      const escala = escalaDe(valores, estado);
      ahorro = redondear(impuestoFederal(escala, entrada.gravable) - impuestoFederal(escala, entrada.gravable - deduccion));
    }
    return {
      prima,
      tope,
      recorte,
      deduccion,
      ahorro,
      observaciones: [
        "Only overtime required by the Fair Labor Standards Act counts. Social Security, Medicare and state taxes still apply.",
        "The deduction is available for tax years 2025 through 2028 and you need a valid Social Security number.",
      ],
    };
  },
  resultado: [
    { clave: "prima", etiqueta: "Qualified overtime premium", formato: "moneda" },
    { clave: "tope", etiqueta: "Yearly cap", formato: "moneda" },
    { clave: "recorte", etiqueta: "Reduction for income over the threshold", formato: "moneda", ocultarSiCero: true },
    { clave: "deduccion", etiqueta: "Overtime deduction", formato: "moneda", destacada: true },
    { clave: "ahorro", etiqueta: "Estimated federal income tax saved", formato: "moneda" },
  ],
});
