import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuesto } from "../lib/impuestos";

export default definirCalculadora({
  id: "bw.pension-lump-sum-tax",
  mercado: "bw",
  concepto: "propio",
  slug: "pension-lump-sum-tax",
  // Borrador: no está claro si la sección 19 (3) exime la mitad cuando se retira todo en efectivo.
  estado: "borrador",
  requiere: {
    "bw.paye-resident": "escala",
    "bw.lump-sum-exempt-share": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Lump sum from your provident or pension fund", min: 0, porDefecto: 300000 },
    { id: "ingreso", tipo: "moneda", etiqueta: "Your other taxable income this tax year", min: 0, porDefecto: 0 },
    {
      id: "destino",
      tipo: "opcion",
      etiqueta: "What happens to the taxable half?",
      opciones: [
        { valor: "cash", etiqueta: "I take it all in cash" },
        { valor: "annuity", etiqueta: "I move it to a fund that pays me a pension" },
      ],
      porDefecto: "cash",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the lump sum.", "monto");
    const exento = redondear(porcentaje(entrada.monto, v["bw.lump-sum-exempt-share"]));
    const resto = redondear(entrada.monto - exento);
    const enEfectivo = entrada.destino === "cash";
    const gravable = enEfectivo ? resto : 0;
    const impuestoMonto = redondear(impuesto(v["bw.paye-resident"], entrada.ingreso + gravable) - impuesto(v["bw.paye-resident"], entrada.ingreso));
    const observaciones = enEfectivo ? [] : ["The half you move to an approved fund is not taxed now. The pension it pays you later is taxed, with half of each payment tax-free."];
    return {
      impuesto: impuestoMonto,
      efectivo: redondear(enEfectivo ? entrada.monto - impuestoMonto : exento - impuestoMonto),
      exento,
      gravable,
      tasa: (impuestoMonto / entrada.monto) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax on the lump sum", formato: "moneda", destacada: true },
    { clave: "efectivo", etiqueta: "Cash in your hand", formato: "moneda" },
    { clave: "exento", etiqueta: "Tax-free half", formato: "moneda" },
    { clave: "gravable", etiqueta: "Amount added to your taxable income", formato: "moneda" },
    { clave: "tasa", etiqueta: "Tax as a share of the lump sum", formato: "porcentaje", decimales: 1 },
  ],
});
