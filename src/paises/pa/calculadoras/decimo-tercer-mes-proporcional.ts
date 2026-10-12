import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { inicioPeriodoDecimo, mesesEnPeriodoDecimo, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "pa.decimo-tercer-mes-proporcional",
  mercado: "pa",
  concepto: "propio",
  slug: "decimo-tercer-mes-proporcional",
  estado: "publicado",
  requiere: {
    "pa.decimo-divisor": "numero",
    "pa.css-decimo-trabajador": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Con horas extra y comisiones, si las tienes.", min: 0 },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const inicio = inicioPeriodoDecimo(entrada.fechaSalida);
    const meses = mesesEnPeriodoDecimo(entrada.fechaIngreso, entrada.fechaSalida);
    const bruto = redondear((entrada.salario * meses) / valores["pa.decimo-divisor"]);
    const css = redondear(porcentaje(bruto, valores["pa.css-decimo-trabajador"]));
    return {
      desde: entrada.fechaIngreso > inicio ? entrada.fechaIngreso : inicio,
      meses: redondear(meses),
      bruto,
      css,
      neto: redondear(bruto - css),
      observaciones: [
        "Si te pagan vacaciones al salir, súmalas a lo ganado en el período: también generan décimo.",
      ],
    };
  },
  resultado: [
    { clave: "desde", etiqueta: "Se cuenta desde", formato: "fecha" },
    { clave: "meses", etiqueta: "Meses del período", formato: "meses", decimales: 2 },
    { clave: "bruto", etiqueta: "Décimo proporcional (bruto)", formato: "moneda" },
    { clave: "css", etiqueta: "Descuento de Seguro Social", formato: "moneda" },
    { clave: "neto", etiqueta: "Décimo a recibir", formato: "moneda", destacada: true },
  ],
});
