import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.gratificacion",
  mercado: "cl",
  concepto: "reparto-utilidades",
  slug: "gratificacion",
  estado: "publicado",
  requiere: {
    "cl.gratificacion-porcentaje": "numero",
    "cl.gratificacion-tope": "numero",
    "cl.imm": "numero",
  },
  campos: [
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Remuneración mensual",
      ayuda: "Sueldo más lo variable del mes (comisiones, horas extra). Sin colación ni movilización.",
      min: 0,
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses trabajados en el año", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    const imm = valores["cl.imm"];
    const veinticinco = porcentaje(entrada.sueldo, valores["cl.gratificacion-porcentaje"]);
    const topeMensual = (valores["cl.gratificacion-tope"] * imm) / 12;
    const mensualExacta = Math.min(veinticinco, topeMensual);
    const conTope = veinticinco > topeMensual;
    return {
      veinticinco: redondear(veinticinco),
      topeMensual: redondear(topeMensual),
      mensual: redondear(mensualExacta),
      anual: redondear(mensualExacta * entrada.meses),
      imm,
      observaciones: conTope ? ["Llegas al tope legal: tu gratificación es el tope, no el porcentaje de tu sueldo."] : [],
    };
  },
  resultado: [
    { clave: "veinticinco", etiqueta: "Porcentaje legal de tu remuneración", formato: "moneda" },
    { clave: "topeMensual", etiqueta: "Tope mensual", formato: "moneda" },
    { clave: "mensual", etiqueta: "Gratificación mensual", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Gratificación del año", formato: "moneda" },
    { clave: "imm", etiqueta: "Ingreso mínimo usado para el tope", formato: "moneda" },
  ],
});
