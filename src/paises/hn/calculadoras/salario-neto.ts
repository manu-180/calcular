import { aplicarEscalaMarginal, definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

const MESES = 12;

function continua(escala: readonly FilaEscala[]): FilaEscala[] {
  return escala.map((f, i) => ({ ...f, desde: i === 0 ? 0 : (escala[i - 1].hasta ?? f.desde) }));
}

// Borrador: el techo de cotización del IHSS de 2026 lo fija la Junta Directiva y no encontramos la
// resolución, y las tasas de Enfermedad y Maternidad no las leímos en fuente primaria.
export default definirCalculadora({
  id: "hn.salario-neto",
  mercado: "hn",
  concepto: "sueldo-neto",
  slug: "salario-neto",
  estado: "borrador",
  requiere: {
    "hn.ihss-ivm": "mapa",
    "hn.ihss-em": "mapa",
    "hn.ihss-techo": "numero",
    "hn.rap-aporte": "mapa",
    "hn.isr-tabla": "escala",
    "hn.isr-deduccion-gastos-medicos": "numero",
  },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "Salario mensual bruto", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const techo = valores["hn.ihss-techo"];
    const baseIhss = Math.min(entrada.salario, techo);
    const ivm = redondear(porcentaje(baseIhss, enMapa(valores["hn.ihss-ivm"], "trabajador")));
    const em = redondear(porcentaje(baseIhss, enMapa(valores["hn.ihss-em"], "trabajador")));
    const rap = redondear(porcentaje(Math.max(0, entrada.salario - techo), enMapa(valores["hn.rap-aporte"], "trabajador")));
    const anual = entrada.salario * MESES;
    const gravable = Math.max(0, anual - valores["hn.isr-deduccion-gastos-medicos"]);
    const isr = redondear(aplicarEscalaMarginal(continua(valores["hn.isr-tabla"]), gravable) / MESES);
    const descuentos = redondear(ivm + em + rap + isr);
    return { ivm, em, rap, isr, descuentos, neto: redondear(entrada.salario - descuentos) };
  },
  resultado: [
    { clave: "ivm", etiqueta: "IHSS Invalidez, Vejez y Muerte", formato: "moneda" },
    { clave: "em", etiqueta: "IHSS Enfermedad y Maternidad", formato: "moneda" },
    { clave: "rap", etiqueta: "RAP", formato: "moneda", ocultarSiCero: true },
    { clave: "isr", etiqueta: "ISR del mes", formato: "moneda", ocultarSiCero: true },
    { clave: "descuentos", etiqueta: "Total de descuentos", formato: "moneda" },
    { clave: "neto", etiqueta: "Salario neto", formato: "moneda", destacada: true },
  ],
});
