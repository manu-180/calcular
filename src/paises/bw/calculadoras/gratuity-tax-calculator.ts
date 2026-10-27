import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuesto, inicioAnioFiscal } from "../lib/impuestos";

// Hasta el año fiscal 2025/26 rige la tabla anterior; desde 2026/27, la vigente a la fecha.
const ULTIMO_ANIO_TABLA_ANTERIOR = 2025;

export default definirCalculadora({
  id: "bw.gratuity-tax-calculator",
  mercado: "bw",
  concepto: "propio",
  slug: "gratuity-tax-calculator",
  estado: "publicado",
  requiere: {
    "bw.paye-resident": "escala",
    "bw.paye-resident-2021-2026": "escala",
    "bw.gratuity-exempt-share": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Gratuity, severance or retrenchment payment", min: 0, porDefecto: 36000 },
    { id: "ingreso", tipo: "moneda", etiqueta: "Your other taxable income this tax year", min: 0, porDefecto: 120000 },
    {
      id: "plazo",
      tipo: "opcion",
      etiqueta: "Length of the contract the payment covers",
      opciones: [
        { valor: "1", etiqueta: "1 year or less" },
        { valor: "2", etiqueta: "2 years" },
        { valor: "3", etiqueta: "3 years or more" },
      ],
      porDefecto: "3",
    },
    { id: "ingresoPrevio", tipo: "moneda", etiqueta: "Your taxable income last tax year", min: 0, porDefecto: 72000, visibleSi: { plazo: ["2", "3"] } },
    { id: "ingresoPrevio2", tipo: "moneda", etiqueta: "Your taxable income two tax years ago", min: 0, porDefecto: 48000, visibleSi: { plazo: ["3"] } },
  ],
  calcular(entrada, v, { redondear, fecha }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the amount you received.", "monto");
    const exento = redondear(porcentaje(entrada.monto, v["bw.gratuity-exempt-share"]));
    const gravable = redondear(entrada.monto - exento);
    const anio = inicioAnioFiscal(fecha);
    const tabla = (inicio: number) => (inicio <= ULTIMO_ANIO_TABLA_ANTERIOR ? v["bw.paye-resident-2021-2026"] : v["bw.paye-resident"]);
    const extra = (inicio: number, base: number, suma: number) => impuesto(tabla(inicio), base + suma) - impuesto(tabla(inicio), base);

    const unaVez = redondear(extra(anio, entrada.ingreso, gravable));
    const anios = Number(entrada.plazo);
    const ingresos = [entrada.ingreso, entrada.ingresoPrevio ?? 0, entrada.ingresoPrevio2 ?? 0];
    let repartido: number | null = null;
    if (anios > 1) {
      const cuota = gravable / anios;
      let total = 0;
      for (let k = 0; k < anios; k++) total += extra(anio - k, ingresos[k], cuota);
      repartido = redondear(total);
    }
    const conviene = repartido !== null && repartido < unaVez;
    const impuestoFinal = conviene ? repartido! : unaVez;
    return {
      impuesto: impuestoFinal,
      neto: redondear(entrada.monto - impuestoFinal),
      exento,
      gravable,
      unaVez,
      repartido,
      metodo: conviene ? `Spread over ${anios} tax years` : "All in the year you receive it",
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax on the payment", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "What you keep", formato: "moneda" },
    { clave: "exento", etiqueta: "Tax-free half", formato: "moneda" },
    { clave: "gravable", etiqueta: "Taxable half", formato: "moneda" },
    { clave: "unaVez", etiqueta: "Tax if it is all taxed this year", formato: "moneda" },
    { clave: "repartido", etiqueta: "Tax if it is spread over the years", formato: "moneda" },
    { clave: "metodo", etiqueta: "Basis that gives the lower tax", formato: "texto" },
  ],
});
