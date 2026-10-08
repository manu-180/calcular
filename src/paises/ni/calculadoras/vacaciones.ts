import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { DIAS_ANIO, DIAS_MES, diasInclusivos } from "../prestaciones";

export default definirCalculadora({
  id: "ni.vacaciones",
  mercado: "ni",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "ni.vacaciones-dias-por-semestre": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      min: 0,
      ayuda: "El último salario ordinario. Si varía, el promedio de los últimos seis meses.",
    },
    {
      id: "desde",
      tipo: "fecha",
      etiqueta: "Desde cuándo acumulás vacaciones",
      ayuda: "Tu fecha de ingreso, o el día en que empezó el período que todavía no gozaste.",
    },
    { id: "hasta", tipo: "fecha", etiqueta: "Hasta", porDefecto: "hoy" },
    { id: "gozados", tipo: "numero", etiqueta: "Días de vacaciones que ya gozaste en ese tiempo", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.desde > entrada.hasta) throw new ErrorEntrada("La fecha de inicio no puede ser posterior a la final.", "desde");
    const dias = diasInclusivos(entrada.desde, entrada.hasta);
    const acumulados = redondear((valores["ni.vacaciones-dias-por-semestre"] * 2 * dias) / DIAS_ANIO);
    if (entrada.gozados > acumulados) throw new ErrorEntrada("Los días gozados no pueden ser más que los acumulados.", "gozados");
    const pendientes = redondear(acumulados - entrada.gozados);
    const diario = redondear(entrada.salario / DIAS_MES);
    return {
      dias,
      acumulados,
      pendientes,
      diario,
      pago: redondear(diario * pendientes),
      observaciones: [
        `Se acumulan ${valores["ni.vacaciones-dias-por-semestre"]} días por cada seis meses de trabajo. Lo calculamos día por día.`,
        "Si el contrato termina, te pagan las vacaciones que no gozaste con el último salario.",
      ],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días trabajados en el período", formato: "dias" },
    { clave: "acumulados", etiqueta: "Días de vacaciones ganados", formato: "numero", decimales: 2 },
    { clave: "pendientes", etiqueta: "Días pendientes", formato: "numero", decimales: 2 },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "pago", etiqueta: "Pago de vacaciones pendientes", formato: "moneda", destacada: true },
  ],
});
