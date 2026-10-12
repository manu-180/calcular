import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasInclusive, fecha, mayor } from "../lib/fechas";

export default definirCalculadora({
  id: "py.aguinaldo-proporcional",
  mercado: "py",
  concepto: "propio",
  slug: "aguinaldo-proporcional",
  estado: "publicado",
  requiere: {
    "py.divisor-salario-diario": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Si cambió durante el año, poné el promedio.", min: 0 },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "egreso", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "extras",
      tipo: "moneda",
      etiqueta: "Horas extra, comisiones y premios cobrados este año",
      ayuda: "Desde enero. Si no tuviste, dejá 0.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.egreso < entrada.ingreso) throw new ErrorEntrada("El último día de trabajo tiene que ser posterior a la fecha de ingreso.", "egreso");
    const anio = Number(entrada.egreso.slice(0, 4));
    // Art. 243: el aguinaldo cubre el año calendario; se cuenta desde el 1 de enero o desde el ingreso.
    const inicio = mayor(fecha(anio, 1, 1), entrada.ingreso);
    const dias = diasInclusive(inicio, entrada.egreso);
    const devengado = redondear((entrada.salario * dias) / valores["py.divisor-salario-diario"] + entrada.extras);
    return {
      desde: inicio,
      dias,
      devengado,
      aguinaldo: redondear(devengado / 12),
      observaciones: [
        "Te lo pagan al terminar la relación laboral, por renuncia o por despido (artículo 244 del Código del Trabajo).",
        "Si conocés el total exacto que cobraste desde enero, usá la calculadora de aguinaldo con ese monto.",
      ],
    };
  },
  resultado: [
    { clave: "desde", etiqueta: "Se cuenta desde", formato: "fecha" },
    { clave: "dias", etiqueta: "Días trabajados en el año", formato: "dias" },
    { clave: "devengado", etiqueta: "Lo que ganaste en el año", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda", destacada: true },
  ],
});
