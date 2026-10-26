import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { ESCALAS, impuestoRenta, OPCIONES_ESTADO } from "../lib/malta";
import { sscSemanal } from "../lib/ssc";

export default definirCalculadora({
  id: "mt.take-home-pay",
  mercado: "mt",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "borrador",
  requiere: {
    ...ESCALAS,
    "mt.ssc-rate": "numero",
    "mt.ssc-weekly": "mapa",
    "mt.minimum-wage": "mapa",
    "mt.statutory-bonuses": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross basic salary a year", min: 0, porDefecto: 30000 },
    { id: "estado", tipo: "opcion", etiqueta: "Tax rates that apply to you", opciones: OPCIONES_ESTADO, porDefecto: "single" },
    { id: "desde1962", tipo: "si-no", etiqueta: "You were born on or after 1 January 1962", porDefecto: true },
    { id: "bonos", tipo: "si-no", etiqueta: "Add the statutory bonuses and weekly allowance", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter a salary above zero.", "salario");
    const b = v["mt.statutory-bonuses"];
    const bonos = entrada.bonos ? redondear(2 * enMapa(b, "bonus") + 2 * enMapa(b, "allowance")) : 0;
    const impuesto = redondear(impuestoRenta(entrada.estado, entrada.salario + bonos, v));
    const ssc = sscSemanal(
      entrada.salario / 52,
      true,
      entrada.desde1962,
      { tasa: v["mt.ssc-rate"], semanal: v["mt.ssc-weekly"], minimo: enMapa(v["mt.minimum-wage"], "age-18-plus") },
      redondear,
    );
    const sscAnual = redondear(ssc.semanal * 52);
    const anual = redondear(entrada.salario + bonos - impuesto - sscAnual);
    return {
      anual,
      mensual: redondear(anual / 12),
      semanal: redondear(anual / 52),
      impuesto,
      ssc: sscAnual,
      bonos,
      categoria: ssc.categoria,
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Take-home pay a year", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Take-home pay a month", formato: "moneda" },
    { clave: "semanal", etiqueta: "Take-home pay a week", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Income tax (FSS)", formato: "moneda" },
    { clave: "ssc", etiqueta: "Social security (Class 1)", formato: "moneda" },
    { clave: "bonos", etiqueta: "Statutory bonuses and weekly allowance", formato: "moneda", ocultarSiCero: true },
    { clave: "categoria", etiqueta: "Class 1 category", formato: "texto" },
  ],
  mundo: {
    bruto: "salario",
    periodoBruto: "anio",
    neto: "anual",
    periodoNeto: "anio",
    entrada: { estado: "single", desde1962: true, bonos: false },
  },
});
