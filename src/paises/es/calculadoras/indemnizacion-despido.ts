import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { mesesProrrateados } from "../lib/fechas";

// Disposición transitoria undécima del Estatuto: la indemnización de 33 días rige para contratos
// firmados desde esta fecha; el tiempo anterior de contratos más antiguos se paga a 45 días.
const REFORMA_2012 = "2012-02-12" as FechaISO;

export default definirCalculadora({
  id: "es.indemnizacion-despido",
  mercado: "es",
  concepto: "indemnizacion-despido",
  slug: "indemnizacion-despido",
  estado: "publicado",
  requiere: {
    "es.despido-objetivo-dias": "numero",
    "es.despido-objetivo-tope": "numero",
    "es.despido-improcedente-dias": "numero",
    "es.despido-improcedente-tope": "numero",
    "es.despido-anterior-2012-dias": "numero",
    "es.despido-anterior-2012-tope-dias": "numero",
    "es.despido-anterior-2012-tope-maximo": "numero",
  },
  campos: [
    { id: "alta", tipo: "fecha", etiqueta: "Fecha de inicio del contrato", min: "1970-01-01" },
    { id: "baja", tipo: "fecha", etiqueta: "Fecha del despido", porDefecto: "hoy" },
    { id: "bruto", tipo: "moneda", etiqueta: "Sueldo bruto anual", min: 0, porDefecto: 25000, ayuda: "Con las pagas extra y los pluses que cobras de forma fija." },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Tipo de despido",
      opciones: [
        { valor: "improcedente", etiqueta: "Improcedente" },
        { valor: "objetivo", etiqueta: "Objetivo (procedente)" },
      ],
      porDefecto: "improcedente",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.baja <= entrada.alta) throw new ErrorEntrada("La fecha del despido tiene que ser posterior al inicio del contrato.", "baja");
    const diario = entrada.bruto / 365;
    const mensual = entrada.bruto / 12;
    const mesesTotales = mesesProrrateados(entrada.alta, entrada.baja);
    let dias: number;
    let tope: number;
    let mesesAntes = 0;
    let mesesDespues = mesesTotales;
    if (entrada.tipo === "objetivo") {
      dias = (valores["es.despido-objetivo-dias"] * mesesTotales) / 12;
      tope = valores["es.despido-objetivo-tope"] * mensual;
    } else if (entrada.alta < REFORMA_2012) {
      mesesAntes = mesesProrrateados(entrada.alta, entrada.baja < REFORMA_2012 ? entrada.baja : REFORMA_2012);
      mesesDespues = entrada.baja > REFORMA_2012 ? mesesProrrateados(REFORMA_2012, entrada.baja) : 0;
      const diasAntes = (valores["es.despido-anterior-2012-dias"] * mesesAntes) / 12;
      dias = diasAntes + (valores["es.despido-improcedente-dias"] * mesesDespues) / 12;
      const topeDias = valores["es.despido-anterior-2012-tope-dias"];
      tope = diasAntes > topeDias ? Math.min(diasAntes * diario, valores["es.despido-anterior-2012-tope-maximo"] * mensual) : topeDias * diario;
    } else {
      dias = (valores["es.despido-improcedente-dias"] * mesesTotales) / 12;
      tope = valores["es.despido-improcedente-tope"] * mensual;
    }
    const sinTope = dias * diario;
    const indemnizacion = redondear(Math.min(sinTope, tope));
    const observaciones: string[] = [];
    if (sinTope > tope) observaciones.push("Tu indemnización llega al tope legal, así que se paga el tope.");
    if (mesesAntes > 0) observaciones.push("Tu contrato es anterior al 12 de febrero de 2012: el tiempo previo se paga a 45 días por año.");
    observaciones.push("Los meses empezados cuentan como completos. Si tu convenio mejora la indemnización, se aplica el convenio.");
    return {
      antiguedad: redondear(mesesTotales / 12),
      salarioDiario: redondear(diario),
      dias: redondear(dias),
      mesesAntes2012: mesesAntes,
      mesesDesde2012: entrada.tipo === "objetivo" ? null : mesesDespues,
      indemnizacion,
      observaciones,
    };
  },
  resultado: [
    { clave: "indemnizacion", etiqueta: "Indemnización", formato: "moneda", destacada: true },
    { clave: "dias", etiqueta: "Días de salario", formato: "dias", decimales: 2 },
    { clave: "salarioDiario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "antiguedad", etiqueta: "Antigüedad computada", formato: "anios", decimales: 2 },
    { clave: "mesesAntes2012", etiqueta: "Meses antes del 12/02/2012", formato: "meses", ocultarSiCero: true },
    { clave: "mesesDesde2012", etiqueta: "Meses desde el 12/02/2012", formato: "meses" },
  ],
});
