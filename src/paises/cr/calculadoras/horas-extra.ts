import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.horas-extra",
  mercado: "cr",
  concepto: "horas-extra",
  slug: "horas-extra",
  estado: "publicado",
  requiere: {
    "cr.recargo-horas-extra": "numero",
    "cr.jornada-diaria": "mapa",
    "cr.dias-mes-planilla": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", min: 0 },
    { id: "jornada", tipo: "opcion-dato", etiqueta: "Jornada ordinaria", dato: "cr.jornada-diaria", porDefecto: "diurna" },
    { id: "horas", tipo: "numero", etiqueta: "Horas extra trabajadas", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const horasJornada = enMapa(valores["cr.jornada-diaria"], entrada.jornada);
    const valorHora = entrada.salario / valores["cr.dias-mes-planilla"] / horasJornada;
    const horaExtra = valorHora + porcentaje(valorHora, valores["cr.recargo-horas-extra"]);
    return {
      horasJornada,
      valorHora: redondear(valorHora),
      horaExtra: redondear(horaExtra),
      total: redondear(horaExtra * entrada.horas),
      observaciones: ["La jornada ordinaria más las horas extra no puede pasar de 12 horas por día (artículo 140 del Código de Trabajo)."],
    };
  },
  resultado: [
    { clave: "horasJornada", etiqueta: "Horas de la jornada ordinaria diaria", formato: "horas" },
    { clave: "valorHora", etiqueta: "Valor de la hora ordinaria", formato: "moneda" },
    { clave: "horaExtra", etiqueta: "Valor de la hora extra (tiempo y medio)", formato: "moneda" },
    { clave: "total", etiqueta: "Total por horas extra", formato: "moneda", destacada: true },
  ],
});
