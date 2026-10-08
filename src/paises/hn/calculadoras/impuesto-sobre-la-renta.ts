import { aplicarEscalaMarginal, definirCalculadora } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

const MESES = 12;

// La tabla del SAR está en centavos (un tramo termina en 228,324.32 y el siguiente empieza en
// 228,324.33). Cada tramo grava lo que excede el límite anterior, así que se empalman los límites
// para no perder el centavo del medio.
function continua(escala: readonly FilaEscala[]): FilaEscala[] {
  return escala.map((f, i) => ({ ...f, desde: i === 0 ? 0 : (escala[i - 1].hasta ?? f.desde) }));
}

export default definirCalculadora({
  id: "hn.impuesto-sobre-la-renta",
  mercado: "hn",
  concepto: "impuesto-renta",
  slug: "impuesto-sobre-la-renta",
  estado: "publicado",
  requiere: {
    "hn.isr-tabla": "escala",
    "hn.isr-deduccion-gastos-medicos": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "otrosIngresos",
      tipo: "moneda",
      etiqueta: "Otros ingresos del año que pagan ISR (opcional)",
      min: 0,
      requerido: false,
      ayuda: "Comisiones, bonos u otros pagos gravados que no estén en el salario mensual.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tabla = continua(valores["hn.isr-tabla"]);
    const bruta = redondear(entrada.salario * MESES + (entrada.otrosIngresos ?? 0));
    const deduccion = Math.min(bruta, valores["hn.isr-deduccion-gastos-medicos"]);
    const gravable = redondear(bruta - deduccion);
    const anual = redondear(aplicarEscalaMarginal(tabla, gravable));
    let tasaMarginal = 0;
    for (const f of tabla) if (gravable > f.desde) tasaMarginal = f.tasa;
    const observaciones = ["Se calcula con 12 salarios y la deducción por gastos médicos que el SAR resta en su tabla 2026."];
    if (anual === 0) observaciones.push("Con este ingreso usted está en el tramo exento y no paga ISR.");
    return {
      bruta,
      deduccion,
      gravable,
      tasaMarginal,
      anual,
      mensual: redondear(anual / MESES),
      tasaEfectiva: bruta > 0 ? redondear((anual / bruta) * 100) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "bruta", etiqueta: "Ingreso anual", formato: "moneda" },
    { clave: "deduccion", etiqueta: "Deducción por gastos médicos", formato: "moneda" },
    { clave: "gravable", etiqueta: "Renta neta gravable", formato: "moneda" },
    { clave: "tasaMarginal", etiqueta: "Tasa de su último tramo", formato: "porcentaje" },
    { clave: "anual", etiqueta: "ISR del año", formato: "moneda" },
    { clave: "mensual", etiqueta: "Retención mensual aproximada", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva sobre su ingreso", formato: "porcentaje" },
  ],
});
