import { definirCalculadora, porRegion } from "@/motor/calculo";
import { CAMPOS_TERMINACION, calcularFiniquito } from "../terminacion";

export default definirCalculadora({
  id: "mx.finiquito",
  mercado: "mx",
  concepto: "liquidacion-final",
  slug: "finiquito",
  estado: "publicado",
  requiere: {
    "mx.dias-aguinaldo": "numero",
    "mx.prima-vacacional": "numero",
    "mx.vacaciones-primer-anio": "numero",
    "mx.dias-prima-antiguedad": "numero",
    "mx.anios-prima-antiguedad-renuncia": "numero",
    "mx.tope-prima-antiguedad": "numero",
    "mx.salario-minimo": "numero-por-region",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo termina tu trabajo",
      opciones: [
        { valor: "renuncia", etiqueta: "Renuncié" },
        { valor: "despido", etiqueta: "Me despidieron o terminó el contrato" },
      ],
      porDefecto: "renuncia",
    },
    ...CAMPOS_TERMINACION,
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = porRegion(valores["mx.salario-minimo"], entrada.region);
    const aniosRenuncia = valores["mx.anios-prima-antiguedad-renuncia"];
    const f = calcularFiniquito(
      entrada,
      {
        diasAguinaldo: valores["mx.dias-aguinaldo"],
        primaVacacional: valores["mx.prima-vacacional"],
        vacacionesPrimerAnio: valores["mx.vacaciones-primer-anio"],
        diasPrimaAntiguedad: valores["mx.dias-prima-antiguedad"],
        topePrimaAntiguedad: valores["mx.tope-prima-antiguedad"],
        salarioMinimo: minimo,
      },
      (anios) => entrada.motivo === "despido" || anios >= aniosRenuncia,
      redondear,
    );
    const observaciones: string[] = [];
    if (entrada.motivo === "renuncia" && f.primaAntiguedad === 0) {
      observaciones.push(`Al renunciar, la prima de antigüedad solo se paga con ${aniosRenuncia} años de servicio o más.`);
    }
    if (entrada.motivo === "despido") {
      observaciones.push("Si el despido fue sin causa justificada, además te toca una indemnización. Usa la calculadora de liquidación.");
    }
    observaciones.push("Son montos brutos, antes del ISR.");
    return {
      antiguedad: redondear(f.ant.anios),
      diario: f.diario,
      salarios: f.salarios,
      aguinaldo: f.aguinaldo,
      vacaciones: f.vacaciones,
      primaVacacional: f.primaVacacional,
      primaAntiguedad: f.primaAntiguedad,
      total: redondear(f.salarios + f.aguinaldo + f.vacaciones + f.primaVacacional + f.primaAntiguedad),
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Antigüedad", formato: "anios" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "salarios", etiqueta: "Días trabajados sin pagar", formato: "moneda", ocultarSiCero: true },
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Vacaciones", formato: "moneda" },
    { clave: "primaVacacional", etiqueta: "Prima vacacional", formato: "moneda" },
    { clave: "primaAntiguedad", etiqueta: "Prima de antigüedad", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total del finiquito", formato: "moneda", destacada: true },
  ],
});
