import { definirCalculadora } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "gt.bonificacion-incentivo",
  mercado: "gt",
  concepto: "propio",
  slug: "bonificacion-incentivo",
  estado: "borrador",
  requiere: {
    "gt.bonificacion-incentivo": "numero",
  },
  campos: [{ id: "dias", tipo: "entero", etiqueta: "Días que trabajó en el mes", min: 0, max: 31, porDefecto: 30 }],
  calcular(entrada, valores, { redondear }) {
    const mensual = valores["gt.bonificacion-incentivo"];
    const diaria = redondear(mensual / DIAS_MES);
    return {
      mensual,
      diaria,
      corresponde: redondear(Math.min(mensual, diaria * entrada.dias)),
      observaciones: ["La bonificación incentivo se paga junto con el salario y no se puede dividir en partes."],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Bonificación del mes completo", formato: "moneda" },
    { clave: "diaria", etiqueta: "Por día", formato: "moneda" },
    { clave: "corresponde", etiqueta: "Le corresponde", formato: "moneda", destacada: true },
  ],
});
