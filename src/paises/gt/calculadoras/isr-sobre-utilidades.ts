import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.isr-sobre-utilidades",
  mercado: "gt",
  concepto: "propio",
  slug: "isr-sobre-utilidades",
  estado: "publicado",
  requiere: {
    "gt.isr-utilidades": "numero",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos del año que pagan ISR", min: 0 },
    { id: "gastos", tipo: "moneda", etiqueta: "Costos y gastos deducibles del año", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["gt.isr-utilidades"];
    const renta = redondear(Math.max(0, entrada.ingresos - entrada.gastos));
    const anual = redondear(porcentaje(renta, tasa));
    const observaciones = ["Durante el año se paga a cuenta cada trimestre. Lo pagado se descuenta en la declaración anual."];
    if (entrada.gastos > entrada.ingresos) observaciones.push("Con más gastos que ingresos hay pérdida: no paga ISR este año.");
    return { renta, tasa, anual, trimestral: redondear(anual / 4), observaciones };
  },
  resultado: [
    { clave: "renta", etiqueta: "Renta imponible", formato: "moneda" },
    { clave: "tasa", etiqueta: "Tipo impositivo", formato: "porcentaje" },
    { clave: "anual", etiqueta: "ISR del año", formato: "moneda", destacada: true },
    { clave: "trimestral", etiqueta: "Promedio por trimestre", formato: "moneda" },
  ],
});
