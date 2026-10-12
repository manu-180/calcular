import { definirCalculadora } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "gt.bonificacion-incentivo",
  mercado: "gt",
  concepto: "propio",
  slug: "bonificacion-incentivo",
  estado: "publicado",
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
      corresponde: entrada.dias >= DIAS_MES ? mensual : redondear((mensual * entrada.dias) / DIAS_MES),
      observaciones: ["Se paga junto con el salario. No paga IGSS, IRTRA ni INTECAP y no cuenta para el aguinaldo ni la indemnización."],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Bonificación del mes completo", formato: "moneda" },
    { clave: "diaria", etiqueta: "Por día", formato: "moneda" },
    { clave: "corresponde", etiqueta: "Le corresponde", formato: "moneda", destacada: true },
  ],
});
