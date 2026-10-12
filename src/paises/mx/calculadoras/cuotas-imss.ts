import { definirCalculadora, enMapa, ErrorEntrada, porRegion } from "@/motor/calculo";
import { cuotasDiarias, factorIntegracion, REQUIERE_IMSS } from "../imss";
import { OPCIONES_PERIODO, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.cuotas-imss",
  mercado: "mx",
  concepto: "aportes-seguridad-social",
  slug: "cuotas-imss",
  estado: "publicado",
  requiere: REQUIERE_IMSS,
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo bruto", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Ese sueldo es", opciones: OPCIONES_PERIODO, porDefecto: "mensual" },
    { id: "region", tipo: "region", etiqueta: "Dónde trabaja la persona", porDefecto: "general" },
    { id: "antiguedad", tipo: "entero", etiqueta: "Años en la empresa", min: 0, max: 60, porDefecto: 1, ayuda: "Sirve para estimar el salario base de cotización con las prestaciones de ley." },
    { id: "sbc", tipo: "moneda", etiqueta: "Salario base de cotización diario", min: 0, requerido: false, ayuda: "Si lo conoces, escríbelo. Si no, lo estimamos con aguinaldo y prima vacacional de ley." },
    { id: "clase", tipo: "opcion-dato", etiqueta: "Clase de riesgo de la empresa", dato: "mx.prima-riesgo-trabajo", porDefecto: "clase-i" },
    { id: "primaRiesgo", tipo: "porcentaje", etiqueta: "Prima de riesgo de trabajo de la empresa", min: 0, max: 15, requerido: false, ayuda: "Viene en la determinación anual de la prima. Déjalo vacío para usar la prima media de la clase." },
    { id: "dias", tipo: "entero", etiqueta: "Días del mes que se cotizan", min: 1, max: 31, porDefecto: 30 },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimaRiesgo = valores["mx.prima-riesgo-minima"];
    const maximaRiesgo = valores["mx.prima-riesgo-maxima"];
    const prima = entrada.primaRiesgo ?? enMapa(valores["mx.prima-riesgo-trabajo"], entrada.clase);
    if (prima < minimaRiesgo || prima > maximaRiesgo) throw new ErrorEntrada(`La prima de riesgo va de ${minimaRiesgo} % a ${maximaRiesgo} %.`, "primaRiesgo");
    const diario = salarioDiario(entrada.sueldo, entrada.periodo);
    const factor = factorIntegracion(entrada.antiguedad, valores["mx.dias-aguinaldo"], valores["mx.prima-vacacional"], valores["mx.vacaciones-primer-anio"]);
    const c = cuotasDiarias(entrada.sbc ?? redondear(diario * factor), prima, {
      uma: valores["mx.uma-diaria"],
      salarioMinimo: porRegion(valores["mx.salario-minimo"], entrada.region),
      topeSbcUma: valores["mx.tope-sbc-imss"],
      umbralExcedenteUma: valores["mx.umbral-excedente-imss"],
      obrero: valores["mx.cuotas-imss-obrero"],
      patron: valores["mx.cuotas-imss-patron"],
      cesantiaVejez: valores["mx.cesantia-vejez-patron"],
      cesantiaVejezMinimo: valores["mx.cesantia-vejez-patron-minimo"],
      aportacionVivienda: valores["mx.aportacion-vivienda"],
    });
    const d = entrada.dias;
    const obrero = redondear(c.obrero * d);
    const imssPatron = redondear(c.imssPatron * d);
    const rcvPatron = redondear(c.rcvPatron * d);
    const infonavit = redondear(c.infonavit * d);
    const observaciones: string[] = [];
    if (c.ganaMinimo) observaciones.push("Con el salario mínimo la empresa paga también la parte del trabajador.");
    observaciones.push("El retiro, la cesantía y el Infonavit se pagan cada dos meses; aquí se muestran por mes para comparar.");
    return {
      sbc: redondear(c.sbc),
      tasaCesantia: c.tasaCesantia,
      obrero,
      imssPatron,
      rcvPatron,
      infonavit,
      totalPatron: redondear(imssPatron + rcvPatron + infonavit),
      observaciones,
    };
  },
  resultado: [
    { clave: "sbc", etiqueta: "Salario base de cotización diario", formato: "moneda" },
    { clave: "obrero", etiqueta: "Cuotas que paga el trabajador", formato: "moneda", destacada: true },
    { clave: "imssPatron", etiqueta: "Cuotas IMSS de la empresa", formato: "moneda" },
    { clave: "tasaCesantia", etiqueta: "Tasa patronal de cesantía y vejez", formato: "porcentaje", decimales: 3 },
    { clave: "rcvPatron", etiqueta: "Retiro, cesantía y vejez de la empresa", formato: "moneda" },
    { clave: "infonavit", etiqueta: "Aportación al Infonavit", formato: "moneda" },
    { clave: "totalPatron", etiqueta: "Total que paga la empresa", formato: "moneda", destacada: true },
  ],
});
