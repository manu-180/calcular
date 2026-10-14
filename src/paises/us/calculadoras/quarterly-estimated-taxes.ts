import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { estadoValido, OPCIONES_ESTADO_CIVIL } from "../lib/impuestos";

export default definirCalculadora({
  id: "us.quarterly-estimated-taxes",
  mercado: "us",
  concepto: "propio",
  slug: "quarterly-estimated-taxes",
  estado: "publicado",
  requiere: {
    "us.estimated-tax-min": "numero",
    "us.safe-harbor-current": "numero",
    "us.safe-harbor-prior": "numero",
    "us.safe-harbor-prior-high": "numero",
    "us.safe-harbor-agi": "mapa",
  },
  campos: [
    { id: "estado", tipo: "opcion", etiqueta: "Filing status", opciones: OPCIONES_ESTADO_CIVIL, porDefecto: "single" },
    {
      id: "esperado",
      tipo: "moneda",
      etiqueta: "Total tax you expect for this year",
      min: 0,
      porDefecto: 20000,
      ayuda: "Federal income tax plus self-employment tax, after credits.",
    },
    { id: "retencion", tipo: "moneda", etiqueta: "Tax withheld from paychecks this year", min: 0, porDefecto: 5000 },
    { id: "anterior", tipo: "moneda", etiqueta: "Total tax on last year's return", min: 0, requerido: false, ayuda: "Leave blank if you didn't file last year or it covered less than 12 months." },
    { id: "agiAnterior", tipo: "moneda", etiqueta: "AGI on last year's return", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const estado = estadoValido(entrada.estado);
    if (entrada.anterior !== null && entrada.agiAnterior === null) throw new ErrorEntrada("Enter last year's AGI too. It decides between the 100% and 110% rule.", "agiAnterior");
    const deuda = entrada.esperado - entrada.retencion;
    const metaActual = porcentaje(entrada.esperado, valores["us.safe-harbor-current"]);
    let tasaAnterior: number | null = null;
    let metaAnterior: number | null = null;
    if (entrada.anterior !== null && entrada.agiAnterior !== null) {
      const umbral = enMapa(valores["us.safe-harbor-agi"], estado === "mfs" ? "mfs" : "other");
      tasaAnterior = entrada.agiAnterior > umbral ? valores["us.safe-harbor-prior-high"] : valores["us.safe-harbor-prior"];
      metaAnterior = porcentaje(entrada.anterior, tasaAnterior);
    }
    const meta = metaAnterior === null ? metaActual : Math.min(metaActual, metaAnterior);
    const hacenFalta = deuda >= valores["us.estimated-tax-min"];
    const anual = hacenFalta ? redondear(Math.max(0, meta - entrada.retencion)) : 0;
    const observaciones: string[] = [];
    if (!hacenFalta) observaciones.push("You expect to owe less than the minimum after withholding, so you don't need to make estimated payments.");
    else if (metaAnterior !== null && metaAnterior <= metaActual)
      observaciones.push(`Paying ${tasaAnterior}% of last year's tax is the smaller safe amount, so it protects you from the underpayment penalty even if you owe more in April.`);
    observaciones.push("Payments are due around April 15, June 15, September 15 and January 15. Your state may require its own estimated payments.");
    return {
      deuda: redondear(Math.max(0, deuda)),
      metaActual: redondear(metaActual),
      metaAnterior: metaAnterior === null ? null : redondear(metaAnterior),
      anual,
      trimestral: redondear(anual / 4),
      observaciones,
    };
  },
  resultado: [
    { clave: "deuda", etiqueta: "Tax not covered by withholding", formato: "moneda" },
    { clave: "metaActual", etiqueta: "Safe amount based on this year", formato: "moneda" },
    { clave: "metaAnterior", etiqueta: "Safe amount based on last year", formato: "moneda" },
    { clave: "anual", etiqueta: "Estimated payments for the year", formato: "moneda" },
    { clave: "trimestral", etiqueta: "Each quarterly payment", formato: "moneda", destacada: true },
  ],
});
