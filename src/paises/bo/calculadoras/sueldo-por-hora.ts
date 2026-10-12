import { definirCalculadora } from "@/motor/calculo";
import { DIAS_DEL_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "bo.sueldo-por-hora",
  mercado: "bo",
  concepto: "propio",
  slug: "sueldo-por-hora",
  estado: "publicado",
  requiere: {
    "bo.jornada-horas-dia": "numero",
    "bo.salario-minimo": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    {
      id: "horasDia",
      tipo: "numero",
      etiqueta: "Horas que trabaja por día (opcional)",
      ayuda: "Si lo deja vacío usamos la jornada legal.",
      min: 1,
      max: 12,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const horasDia = entrada.horasDia ?? valores["bo.jornada-horas-dia"];
    const diario = redondear(entrada.sueldo / DIAS_DEL_MES);
    return {
      diario,
      semanal: redondear((entrada.sueldo / DIAS_DEL_MES) * 7),
      hora: redondear(entrada.sueldo / DIAS_DEL_MES / horasDia),
      horasDia,
      observaciones: ["Dividimos el sueldo por 30 días, como hace el Ministerio de Trabajo para el salario diario."],
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Por día", formato: "moneda" },
    { clave: "semanal", etiqueta: "Por semana", formato: "moneda" },
    { clave: "horasDia", etiqueta: "Horas por día usadas", formato: "horas", decimales: 0 },
    { clave: "hora", etiqueta: "Por hora", formato: "moneda", destacada: true },
  ],
});
