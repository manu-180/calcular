import { definirCalculadora, porRegion } from "@/motor/calculo";
import { CAMPOS_TERMINACION, calcularFiniquito } from "../terminacion";

export default definirCalculadora({
  id: "mx.liquidacion",
  mercado: "mx",
  concepto: "indemnizacion-despido",
  slug: "liquidacion",
  estado: "publicado",
  requiere: {
    "mx.dias-aguinaldo": "numero",
    "mx.prima-vacacional": "numero",
    "mx.vacaciones-primer-anio": "numero",
    "mx.dias-prima-antiguedad": "numero",
    "mx.tope-prima-antiguedad": "numero",
    "mx.meses-indemnizacion": "numero",
    "mx.dias-indemnizacion-anio": "numero",
    "mx.exencion-indemnizacion": "numero",
    "mx.uma-diaria": "numero",
    "mx.salario-minimo": "numero-por-region",
  },
  campos: [
    ...CAMPOS_TERMINACION,
    {
      id: "sdi",
      tipo: "moneda",
      etiqueta: "Salario diario integrado",
      min: 0,
      requerido: false,
      ayuda: "Tu salario diario más la parte de aguinaldo, prima vacacional y otras prestaciones. Si lo dejas vacío, se usa tu salario diario.",
    },
    {
      id: "veinteDias",
      tipo: "si-no",
      etiqueta: "Sumar los días por año de servicio del artículo 50",
      porDefecto: false,
      ayuda: "Proceden cuando la empresa se niega a reinstalarte o en los casos del artículo 49 de la ley. Muchas empresas los pagan al negociar.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = porRegion(valores["mx.salario-minimo"], entrada.region);
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
      () => true,
      redondear,
    );
    const sdi = Math.max(entrada.sdi ?? f.diario, f.diario);
    // Tres meses de salario a razón de 30 días por mes (LFT art. 89: el sueldo mensual se divide entre 30).
    const indemnizacion = redondear(sdi * valores["mx.meses-indemnizacion"] * 30);
    const veinteDias = entrada.veinteDias ? redondear(sdi * valores["mx.dias-indemnizacion-anio"] * f.ant.anios) : 0;
    const separacion = redondear(indemnizacion + veinteDias + f.primaAntiguedad);
    // LISR art. 93 fr. XIII: toda fracción de más de seis meses cuenta como año completo.
    const aniosExencion = Math.max(1, f.ant.aniosCompletos + (f.ant.diasDesdeAniversario > 182 ? 1 : 0));
    const exento = Math.min(separacion, redondear(valores["mx.exencion-indemnizacion"] * valores["mx.uma-diaria"] * aniosExencion));
    const finiquito = redondear(f.salarios + f.aguinaldo + f.vacaciones + f.primaVacacional);
    const observaciones = [
      "Los salarios vencidos (hasta 12 meses si llegas a juicio y lo ganas) no están incluidos.",
      "Son montos brutos. La parte de la indemnización que pasa el límite exento paga ISR.",
    ];
    return {
      antiguedad: redondear(f.ant.anios),
      sdi: redondear(sdi),
      indemnizacion,
      veinteDias,
      primaAntiguedad: f.primaAntiguedad,
      finiquito,
      exento,
      total: redondear(separacion + finiquito),
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Antigüedad", formato: "anios" },
    { clave: "sdi", etiqueta: "Salario diario para la indemnización", formato: "moneda" },
    { clave: "indemnizacion", etiqueta: "Indemnización constitucional", formato: "moneda" },
    { clave: "veinteDias", etiqueta: "Días por año de servicio", formato: "moneda", ocultarSiCero: true },
    { clave: "primaAntiguedad", etiqueta: "Prima de antigüedad", formato: "moneda" },
    { clave: "finiquito", etiqueta: "Finiquito (salarios, aguinaldo y vacaciones)", formato: "moneda" },
    { clave: "exento", etiqueta: "Parte de la indemnización que no paga ISR", formato: "moneda" },
    { clave: "total", etiqueta: "Total de la liquidación", formato: "moneda", destacada: true },
  ],
});
