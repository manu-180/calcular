import { definirCalculadora, enMapa } from "@/motor/calculo";
import {
  mesesConFraccion,
  semanalDeMensual,
  semanasIndemnizacion,
  textoTiempo,
  tiempoTrabajado,
  validarFechas,
  validarIngresoLey44,
} from "../reglas";

export default definirCalculadora({
  id: "pa.indemnizacion-por-despido",
  mercado: "pa",
  concepto: "indemnizacion-despido",
  slug: "indemnizacion-por-despido",
  estado: "publicado",
  requiere: {
    "pa.indemnizacion-semanas": "mapa",
  },
  campos: [
    {
      id: "promedioSeisMeses",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual de los últimos seis meses",
      ayuda: "Con horas extra y comisiones.",
      min: 0,
    },
    {
      id: "ultimoMes",
      tipo: "moneda",
      etiqueta: "Salario del último mes",
      ayuda: "Si lo dejas vacío, usamos solo el promedio de seis meses.",
      min: 0,
      requerido: false,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso", min: "1995-08-14" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Fecha del despido", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    validarIngresoLey44(entrada.fechaIngreso);
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    const mensual = Math.max(entrada.promedioSeisMeses, entrada.ultimoMes ?? 0);
    const semanal = semanalDeMensual(mensual);
    const semanas = semanasIndemnizacion(
      mesesConFraccion(t) / 12,
      enMapa(valores["pa.indemnizacion-semanas"], "primeros-10-anios"),
      enMapa(valores["pa.indemnizacion-semanas"], "desde-anio-11"),
    );
    const observaciones = ["Además de la indemnización te corresponde la prima de antigüedad, las vacaciones pendientes y el décimo proporcional."];
    if (entrada.ultimoMes !== null && entrada.ultimoMes > entrada.promedioSeisMeses) {
      observaciones.unshift("Usamos el salario del último mes porque es más alto que el promedio de seis meses, como manda el artículo 149.");
    }
    return {
      tiempo: textoTiempo(t),
      salarioBase: redondear(mensual),
      salarioSemanal: redondear(semanal),
      semanas: redondear(semanas),
      indemnizacion: redondear(semanal * semanas),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "salarioBase", etiqueta: "Salario mensual que se usa", formato: "moneda" },
    { clave: "salarioSemanal", etiqueta: "Salario semanal", formato: "moneda" },
    { clave: "semanas", etiqueta: "Semanas de salario", formato: "numero", decimales: 2 },
    { clave: "indemnizacion", etiqueta: "Indemnización por despido injustificado", formato: "moneda", destacada: true },
  ],
});
