import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { INICIO_ESCALA_B, INICIO_LEY_44, mesesConFraccion, semanalDeMensual, semanasEscalaB, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

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
