import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { INICIO_LEY_44, mesesConFraccion, semanalDeMensual, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

// Art. 225, acápite A: para el tiempo anterior al 2/4/1972 rige otra escala, que no se combina.
const INICIO_ESCALA_B = "1972-04-02";

// Art. 225, acápite B: la escala se aplica en forma combinada, repartiendo el tiempo de servicio
// entre sus tramos (primer año, segundo año, de dos a diez años y desde los diez).
function semanasEscalaB(meses: number, e: Readonly<Record<string, number>>): number {
  const primerAnio = Math.min(meses, 12) / enMapa(e, "meses-por-semana-primer-anio");
  const segundoAnio = Math.max(Math.min(meses, 24) - 12, 0) / enMapa(e, "meses-por-semana-segundo-anio");
  const deDosADiez = (Math.max(Math.min(meses, 120) - 24, 0) / 12) * enMapa(e, "semanas-anios-2-a-10");
  const desdeDiez = (Math.max(meses - 120, 0) / 12) * enMapa(e, "semanas-desde-anio-11");
  return Math.max(primerAnio + segundoAnio + deDosADiez + desdeDiez, enMapa(e, "minimo-semanas"));
}

export default definirCalculadora({
  id: "pa.indemnizacion-antes-de-1995",
  mercado: "pa",
  concepto: "propio",
  slug: "indemnizacion-antes-de-1995",
  estado: "publicado",
  requiere: {
    "pa.indemnizacion-escala-b": "mapa",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "El promedio de los últimos seis meses o el del último mes, el que sea más alto.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso", min: "1972-04-02", max: "1995-08-13" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Fecha del despido", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario, fechaIngreso, fechaSalida } = entrada;
    validarFechas(fechaIngreso, fechaSalida);
    if (fechaIngreso >= INICIO_LEY_44) {
      throw new ErrorEntrada("Si empezaste desde el 14 de agosto de 1995, usa la calculadora de indemnización por despido.", "fechaIngreso");
    }
    if (fechaIngreso < INICIO_ESCALA_B) {
      throw new ErrorEntrada("El tiempo trabajado antes del 2 de abril de 1972 lleva otra escala. Esta calculadora no la cubre.", "fechaIngreso");
    }
    const t = tiempoTrabajado(fechaIngreso, fechaSalida);
    const semanal = semanalDeMensual(salario);
    const semanas = semanasEscalaB(mesesConFraccion(t), valores["pa.indemnizacion-escala-b"]);
    return {
      tiempo: textoTiempo(t),
      salarioSemanal: redondear(semanal),
      semanas: redondear(semanas),
      indemnizacion: redondear(semanal * semanas),
      observaciones: [
        "Además de la indemnización te corresponde la prima de antigüedad, las vacaciones pendientes y el décimo proporcional.",
        "Si hay dudas sobre la escala, pide el cálculo en el MITRADEL antes de firmar la liquidación.",
      ],
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "salarioSemanal", etiqueta: "Salario semanal", formato: "moneda" },
    { clave: "semanas", etiqueta: "Semanas de indemnización", formato: "numero", decimales: 2 },
    { clave: "indemnizacion", etiqueta: "Indemnización por despido injustificado", formato: "moneda", destacada: true },
  ],
});
