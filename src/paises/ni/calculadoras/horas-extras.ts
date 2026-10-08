import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "ni.horas-extras",
  mercado: "ni",
  concepto: "horas-extra",
  slug: "horas-extras",
  estado: "publicado",
  requiere: {
    "ni.recargo-horas-extra": "numero",
    "ni.jornada-diaria": "mapa",
    "ni.horas-extra-maximo-diario": "numero",
    "ni.horas-extra-maximo-semanal": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "jornada", tipo: "opcion-dato", dato: "ni.jornada-diaria", etiqueta: "Tu jornada", porDefecto: "diurna" },
    { id: "horas", tipo: "numero", etiqueta: "Horas extras trabajadas", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const horasJornada = enMapa(valores["ni.jornada-diaria"], entrada.jornada);
    const valorHora = redondear(entrada.salario / DIAS_MES / horasJornada);
    const valorHoraExtra = redondear(valorHora + porcentaje(valorHora, valores["ni.recargo-horas-extra"]));
    return {
      valorHora,
      valorHoraExtra,
      total: redondear(valorHoraExtra * entrada.horas),
      observaciones: [
        "La hora ordinaria sale de dividir el salario entre 30 días y entre las horas de tu jornada.",
        "Trabajar en tu día de descanso o en un feriado también se paga como hora extra.",
        `La ley permite hasta ${valores["ni.horas-extra-maximo-diario"]} horas extras por día y ${valores["ni.horas-extra-maximo-semanal"]} por semana.`,
      ],
    };
  },
  resultado: [
    { clave: "valorHora", etiqueta: "Valor de tu hora ordinaria", formato: "moneda" },
    { clave: "valorHoraExtra", etiqueta: "Valor de cada hora extra", formato: "moneda" },
    { clave: "total", etiqueta: "Total por horas extras", formato: "moneda", destacada: true },
  ],
});
