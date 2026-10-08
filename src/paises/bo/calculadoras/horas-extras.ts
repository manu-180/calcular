import { definirCalculadora, porcentaje } from "@/motor/calculo";

const DIAS_DEL_MES = 30;
const HORAS_POR_DIA = 8;

// En borrador: el recargo de la hora extra (L.G.T. art. 55) no se pudo leer en una fuente oficial.
export default definirCalculadora({
  id: "bo.horas-extras",
  mercado: "bo",
  concepto: "horas-extra",
  slug: "horas-extras",
  estado: "borrador",
  requiere: {
    "bo.recargo-hora-extra": "numero",
    "bo.recargo-feriado": "numero",
  },
  campos: [
    { id: "haberBasico", tipo: "moneda", etiqueta: "Haber básico mensual", min: 0 },
    { id: "horasExtra", tipo: "numero", etiqueta: "Horas extras del mes", min: 0, max: 200, porDefecto: 0 },
    { id: "feriados", tipo: "entero", etiqueta: "Feriados trabajados en el mes", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = entrada.haberBasico / DIAS_DEL_MES;
    const hora = diario / HORAS_POR_DIA;
    const pagoHoras = redondear(entrada.horasExtra * (hora + porcentaje(hora, valores["bo.recargo-hora-extra"])));
    const pagoFeriados = redondear(entrada.feriados * porcentaje(diario, valores["bo.recargo-feriado"]));
    return {
      valorHora: redondear(hora),
      pagoHoras,
      pagoFeriados,
      total: redondear(pagoHoras + pagoFeriados),
      observaciones: ["El recargo por feriado se suma al día que ya está pagado en el sueldo. El empleador puede compensarlo con otro día de descanso."],
    };
  },
  resultado: [
    { clave: "valorHora", etiqueta: "Valor de la hora normal", formato: "moneda" },
    { clave: "pagoHoras", etiqueta: "Pago por horas extras", formato: "moneda" },
    { clave: "pagoFeriados", etiqueta: "Recargo por feriados trabajados", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total extra del mes", formato: "moneda", destacada: true },
  ],
});
