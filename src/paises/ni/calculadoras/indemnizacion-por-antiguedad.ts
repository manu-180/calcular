import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, mesesIndemnizacion } from "../prestaciones";

export default definirCalculadora({
  id: "ni.indemnizacion-por-antiguedad",
  mercado: "ni",
  concepto: "indemnizacion-despido",
  slug: "indemnizacion-por-antiguedad",
  estado: "publicado",
  requiere: {
    "ni.indemnizacion-meses-por-anio": "numero",
    "ni.indemnizacion-dias-desde-cuarto-anio": "numero",
    "ni.indemnizacion-minimo-meses": "numero",
    "ni.indemnizacion-tope-meses": "numero",
  },
  campos: [
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó el contrato",
      opciones: [
        { valor: "despido", etiqueta: "Te despidieron sin causa justificada" },
        { valor: "renuncia", etiqueta: "Renunciaste o lo terminaron de mutuo acuerdo" },
        { valor: "despido-justificado", etiqueta: "Te despidieron por una causa del artículo 48" },
      ],
      porDefecto: "despido",
    },
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      min: 0,
      ayuda: "El último salario ordinario. Si varía, el promedio de los últimos seis meses.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fechaIngreso > entrada.fechaSalida) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior a la de salida.", "fechaIngreso");
    const a = antiguedad(entrada.fechaIngreso, entrada.fechaSalida);
    const regla = {
      mesesPorAnio: valores["ni.indemnizacion-meses-por-anio"],
      diasDesdeCuarto: valores["ni.indemnizacion-dias-desde-cuarto-anio"],
      minimoMeses: valores["ni.indemnizacion-minimo-meses"],
      topeMeses: valores["ni.indemnizacion-tope-meses"],
    };
    const observaciones: string[] = [];
    let meses = 0;
    if (entrada.motivo === "despido") {
      meses = mesesIndemnizacion(a.anios, regla, true);
      observaciones.push("Es la indemnización del artículo 45 para contratos por tiempo indeterminado.");
    } else if (entrada.motivo === "renuncia") {
      meses = mesesIndemnizacion(a.anios, regla, false);
      observaciones.push("Al renunciar conservás lo ganado por antigüedad (artículo 43). Lo calculamos por el tiempo trabajado, sin el mínimo de un mes.");
    } else {
      observaciones.push("Con un despido por causa justificada no hay indemnización por antigüedad, pero sí te pagan las vacaciones y el aguinaldo proporcionales.");
    }
    if (meses > 0 && meses === regla.topeMeses) observaciones.push("Llegaste al máximo que fija la ley.");
    observaciones.push("La indemnización que fija el Código del Trabajo no paga IR.");
    return {
      anios: redondear(a.anios),
      meses: redondear(meses),
      indemnizacion: redondear(entrada.salario * meses),
      observaciones,
    };
  },
  resultado: [
    { clave: "anios", etiqueta: "Antigüedad", formato: "anios", decimales: 2 },
    { clave: "meses", etiqueta: "Meses de salario", formato: "numero", decimales: 2 },
    { clave: "indemnizacion", etiqueta: "Indemnización por antigüedad", formato: "moneda", destacada: true },
  ],
});
