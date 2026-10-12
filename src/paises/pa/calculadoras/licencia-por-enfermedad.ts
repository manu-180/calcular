import { definirCalculadora, enMapa } from "@/motor/calculo";
import { horaDeMensual, mesesConFraccion, tiempoTrabajado, validarFechas } from "../reglas";

const MESES_ANIO = 12;

export default definirCalculadora({
  id: "pa.licencia-por-enfermedad",
  mercado: "pa",
  concepto: "propio",
  slug: "licencia-por-enfermedad",
  estado: "publicado",
  requiere: {
    "pa.licencia-enfermedad-horas": "mapa",
    "pa.licencia-enfermedad-anios-acumulables": "numero",
    "pa.jornada-semanal": "mapa",
    "pa.jornada-diaria": "mapa",
  },
  campos: [
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fecha", tipo: "fecha", etiqueta: "Fecha del cálculo", porDefecto: "hoy" },
    {
      id: "horasUsadas",
      tipo: "numero",
      etiqueta: "Horas de licencia por enfermedad que ya usaste",
      ayuda: "Las de los últimos dos años.",
      min: 0,
      porDefecto: 0,
    },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Tu jornada",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna" },
        { valor: "nocturna", etiqueta: "Nocturna" },
        { valor: "mixta", etiqueta: "Mixta" },
      ],
      porDefecto: "diurna",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fecha);
    const porAnio = enMapa(valores["pa.licencia-enfermedad-horas"], "por-anio");
    const aniosAcumulables = valores["pa.licencia-enfermedad-anios-acumulables"];
    // El fondo se acumula hasta dos años seguidos: lo generado antes de esos dos años ya no suma.
    const meses = Math.min(mesesConFraccion(tiempoTrabajado(entrada.fechaIngreso, entrada.fecha)), aniosAcumulables * MESES_ANIO);
    const generadas = (meses / MESES_ANIO) * porAnio;
    const disponibles = Math.max(generadas - entrada.horasUsadas, 0);
    const horasDia = enMapa(valores["pa.jornada-diaria"], entrada.jornada);
    const hora = horaDeMensual(entrada.salario, enMapa(valores["pa.jornada-semanal"], entrada.jornada));
    return {
      generadas: redondear(generadas),
      disponibles: redondear(disponibles),
      dias: redondear(disponibles / horasDia),
      valor: redondear(disponibles * hora),
      observaciones: [
        "Necesitas un certificado de incapacidad de un médico idóneo. Cuando se te acaba este fondo, la Caja de Seguro Social paga el subsidio por enfermedad.",
      ],
    };
  },
  resultado: [
    { clave: "generadas", etiqueta: "Horas generadas (últimos dos años como máximo)", formato: "horas" },
    { clave: "disponibles", etiqueta: "Horas de licencia disponibles", formato: "horas", destacada: true },
    { clave: "dias", etiqueta: "Equivalen a jornadas completas", formato: "dias" },
    { clave: "valor", etiqueta: "Salario que cubren", formato: "moneda" },
  ],
});
