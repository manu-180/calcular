import { definirCalculadora, enMapa, ErrorEntrada, porcentaje, porRegion } from "@/motor/calculo";
import { cuotasDiarias, factorIntegracion, REQUIERE_IMSS } from "../imss";
import { DIAS_PERIODO, diasDeVacaciones } from "../nomina";

export default definirCalculadora({
  id: "mx.costo-de-un-trabajador",
  mercado: "mx",
  concepto: "costo-empleador",
  slug: "costo-de-un-trabajador",
  estado: "publicado",
  requiere: REQUIERE_IMSS,
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo bruto mensual", min: 0 },
    { id: "region", tipo: "region", etiqueta: "Dónde trabaja la persona", porDefecto: "general" },
    { id: "antiguedad", tipo: "entero", etiqueta: "Años en la empresa", min: 0, max: 60, porDefecto: 1 },
    { id: "clase", tipo: "opcion-dato", etiqueta: "Clase de riesgo de la empresa", dato: "mx.prima-riesgo-trabajo", porDefecto: "clase-i" },
    { id: "primaRiesgo", tipo: "porcentaje", etiqueta: "Prima de riesgo de trabajo de la empresa", min: 0, max: 15, requerido: false, ayuda: "Déjalo vacío para usar la prima media de la clase." },
    { id: "isn", tipo: "porcentaje", etiqueta: "Impuesto sobre nómina de tu estado", min: 0, max: 10, requerido: false, ayuda: "Cada estado fija su tasa. Déjalo vacío si no quieres sumarlo." },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimaRiesgo = valores["mx.prima-riesgo-minima"];
    const maximaRiesgo = valores["mx.prima-riesgo-maxima"];
    const prima = entrada.primaRiesgo ?? enMapa(valores["mx.prima-riesgo-trabajo"], entrada.clase);
    if (prima < minimaRiesgo || prima > maximaRiesgo) throw new ErrorEntrada(`La prima de riesgo va de ${minimaRiesgo} % a ${maximaRiesgo} %.`, "primaRiesgo");
    const diario = entrada.sueldo / 30;
    const anios = Math.max(1, entrada.antiguedad);
    const diasAguinaldo = valores["mx.dias-aguinaldo"];
    const tasaPrima = valores["mx.prima-vacacional"];
    const factor = factorIntegracion(anios, diasAguinaldo, tasaPrima, valores["mx.vacaciones-primer-anio"]);
    const c = cuotasDiarias(redondear(diario * factor), prima, {
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
    // Promedio mensual del año: el mes del IMSS es de 30.4 días, igual que la UMA mensual.
    const dias = DIAS_PERIODO.mensual;
    const aguinaldo = redondear((diario * diasAguinaldo) / 12);
    const primaVacacional = redondear(porcentaje(diario * diasDeVacaciones(anios, valores["mx.vacaciones-primer-anio"]), tasaPrima) / 12);
    const imss = redondear(c.imssPatron * dias);
    const rcv = redondear(c.rcvPatron * dias);
    const infonavit = redondear(c.infonavit * dias);
    const isn = redondear(porcentaje(entrada.sueldo + aguinaldo + primaVacacional, entrada.isn ?? 0));
    const total = redondear(entrada.sueldo + aguinaldo + primaVacacional + imss + rcv + infonavit + isn);
    return {
      sueldo: entrada.sueldo,
      aguinaldo,
      primaVacacional,
      imss,
      rcv,
      infonavit,
      isn,
      total,
      anual: redondear(total * 12),
      extra: entrada.sueldo > 0 ? ((total - entrada.sueldo) / entrada.sueldo) * 100 : 0,
      observaciones: ["Es un promedio mensual: el aguinaldo y la prima vacacional se reparten en los 12 meses."],
    };
  },
  resultado: [
    { clave: "sueldo", etiqueta: "Sueldo bruto", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo (parte del mes)", formato: "moneda" },
    { clave: "primaVacacional", etiqueta: "Prima vacacional (parte del mes)", formato: "moneda" },
    { clave: "imss", etiqueta: "Cuotas IMSS de la empresa", formato: "moneda" },
    { clave: "rcv", etiqueta: "Retiro, cesantía y vejez", formato: "moneda" },
    { clave: "infonavit", etiqueta: "Infonavit", formato: "moneda" },
    { clave: "isn", etiqueta: "Impuesto sobre nómina", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Costo mensual para la empresa", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Costo al año", formato: "moneda" },
    { clave: "extra", etiqueta: "Cuánto cuesta por encima del sueldo", formato: "porcentaje", decimales: 1 },
  ],
});
