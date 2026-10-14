import { definirCalculadora, enMapa } from "@/motor/calculo";
import { claveConjunta, escalaDe, ESCALAS, estadoValido, impuestoFederal, OPCIONES_ESTADO_CIVIL, recorteObbba } from "../lib/impuestos";

export default definirCalculadora({
  id: "us.no-tax-on-tips",
  mercado: "us",
  concepto: "propio",
  slug: "no-tax-on-tips",
  estado: "publicado",
  requiere: {
    ...ESCALAS,
    "us.tips-deduction-max": "numero",
    "us.tips-overtime-threshold": "mapa",
    "us.tips-overtime-phaseout-step": "numero",
  },
  campos: [
    { id: "estado", tipo: "opcion", etiqueta: "Filing status", opciones: OPCIONES_ESTADO_CIVIL, porDefecto: "single" },
    { id: "propinas", tipo: "moneda", etiqueta: "Qualified tips received this year", min: 0, porDefecto: 12000, ayuda: "Cash and card tips reported to your employer or on Form 4137." },
    { id: "magi", tipo: "moneda", etiqueta: "Modified adjusted gross income (MAGI)", min: 0, porDefecto: 45000, ayuda: "For most people it is the same as AGI." },
    { id: "gravable", tipo: "moneda", etiqueta: "Taxable income before this deduction", min: 0, requerido: false, ayuda: "Optional. Lets the calculator estimate your tax savings." },
  ],
  calcular(entrada, valores, { redondear }) {
    const estado = estadoValido(entrada.estado);
    const tope = valores["us.tips-deduction-max"];
    if (estado === "mfs") {
      return { tope, recorte: 0, deduccion: 0, ahorro: null, observaciones: ["Married people must file a joint return to claim this deduction."] };
    }
    const recorte = recorteObbba(entrada.magi, enMapa(valores["us.tips-overtime-threshold"], claveConjunta(estado)), valores["us.tips-overtime-phaseout-step"]);
    const deduccion = redondear(Math.max(0, Math.min(entrada.propinas, tope) - recorte));
    let ahorro: number | null = null;
    if (entrada.gravable !== null) {
      const escala = escalaDe(valores, estado);
      ahorro = redondear(impuestoFederal(escala, entrada.gravable) - impuestoFederal(escala, entrada.gravable - deduccion));
    }
    return {
      tope,
      recorte,
      deduccion,
      ahorro,
      observaciones: [
        "Tips must come from a job the IRS lists as customarily tipped. Social Security, Medicare and state taxes still apply.",
        "The deduction is available for tax years 2025 through 2028. Self-employed workers can't deduct more than their net profit from that work.",
      ],
    };
  },
  resultado: [
    { clave: "tope", etiqueta: "Yearly cap", formato: "moneda" },
    { clave: "recorte", etiqueta: "Reduction for income over the threshold", formato: "moneda", ocultarSiCero: true },
    { clave: "deduccion", etiqueta: "Tips deduction", formato: "moneda", destacada: true },
    { clave: "ahorro", etiqueta: "Estimated federal income tax saved", formato: "moneda" },
  ],
});
