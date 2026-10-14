import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diaAnterior, diasEntre, sumarAnios } from "../lib/fechas";
import { impuestoRenta } from "../lib/impuestos";

const DESDE_REGLA = "2024-07-01";

export default definirCalculadora({
  id: "nz.bright-line-test",
  mercado: "nz",
  concepto: "propio",
  slug: "bright-line-test",
  estado: "publicado",
  requiere: {
    "nz.bright-line-years": "numero",
    "nz.income-tax-rates": "escala",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Date the title was transferred to you", min: "2000-01-01", porDefecto: "2025-03-14", ayuda: "Usually your settlement date." },
    { id: "fin", tipo: "fecha", etiqueta: "Date you sign a binding agreement to sell", min: "2024-07-01", porDefecto: "hoy" },
    { id: "compra", tipo: "moneda", etiqueta: "What you paid for the property", min: 0, porDefecto: 750000 },
    { id: "venta", tipo: "moneda", etiqueta: "Sale price", min: 0, porDefecto: 800000 },
    { id: "costos", tipo: "moneda", etiqueta: "Costs you can deduct", min: 0, porDefecto: 0, ayuda: "Inland Revenue's guide IR1229 explains which costs count." },
    { id: "otrosIngresos", tipo: "moneda", etiqueta: "Your other taxable income that year", min: 0, porDefecto: 70000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.fin < DESDE_REGLA) {
      throw new ErrorEntrada("For sales agreed before 1 July 2024, a 5 or 10 year bright-line period applies depending on when you bought.", "fin");
    }
    if (entrada.fin < entrada.inicio) throw new ErrorEntrada("The sale date has to be after the date you got the title.", "fin");
    const aniversario = sumarAnios(entrada.inicio, v["nz.bright-line-years"]);
    const dentro = entrada.fin < aniversario;
    const ganancia = redondear(entrada.venta - entrada.compra - entrada.costos);
    const gravable = dentro && ganancia > 0;
    const escala = v["nz.income-tax-rates"];
    const impuesto = gravable
      ? redondear(impuestoRenta(entrada.otrosIngresos + ganancia, escala) - impuestoRenta(entrada.otrosIngresos, escala))
      : 0;
    const observaciones: string[] = [];
    if (dentro && ganancia <= 0) observaciones.push("The sale is inside the bright-line period, but there's no profit to tax.");
    if (!dentro) observaciones.push("The bright-line test doesn't apply, but other property rules can still tax a sale, for example if you bought intending to resell.");
    return {
      resultado: dentro ? "Inside the bright-line period" : "Outside the bright-line period",
      finPeriodo: diaAnterior(aniversario),
      diasRestantes: dentro ? diasEntre(entrada.fin, aniversario) : 0,
      ganancia,
      impuesto: gravable ? impuesto : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "Bright-line test", formato: "texto", destacada: true },
    { clave: "finPeriodo", etiqueta: "Your bright-line period ends", formato: "fecha" },
    { clave: "diasRestantes", etiqueta: "Days until a sale would fall outside the period", formato: "dias", ocultarSiCero: true },
    { clave: "ganancia", etiqueta: "Net profit", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Estimated extra income tax on the profit", formato: "moneda" },
  ],
});
