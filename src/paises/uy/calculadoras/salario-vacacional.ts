import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { diasDeLicenciaAnual, diasExtraPorAntiguedad } from "../lib/licencia";
import { calcularSueldo, REQUIERE_SUELDO } from "../lib/sueldo";

export default definirCalculadora({
  id: "uy.salario-vacacional",
  mercado: "uy",
  concepto: "vacaciones",
  slug: "salario-vacacional",
  estado: "publicado",
  requiere: {
    ...REQUIERE_SUELDO,
    "uy.licencia-dias": "numero",
    "uy.salario-vacacional": "numero",
  },
  campos: [
    {
      id: "nominal",
      tipo: "moneda",
      etiqueta: "Sueldo nominal mensual",
      ayuda: "Si hacés horas extra, sumá el promedio mensual del año: también cuentan para la licencia.",
      min: 0,
    },
    {
      id: "antiguedad",
      tipo: "entero",
      etiqueta: "Años cumplidos en la empresa",
      ayuda: "Desde los 5 años se suman días de licencia por antigüedad.",
      min: 0,
      max: 60,
      porDefecto: 1,
    },
    {
      id: "meses",
      tipo: "numero",
      etiqueta: "Meses trabajados en el año que genera la licencia",
      ayuda: "12 si trabajaste todo el año. Si entraste en el año, los meses hasta el 31 de diciembre.",
      min: 0,
      max: 12,
      porDefecto: 12,
    },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos menores de 18 a tu cargo", min: 0, max: 15, porDefecto: 0 },
    {
      id: "conyuge",
      tipo: "si-no",
      etiqueta: "Tenés cónyuge o concubino a cargo en el Fonasa",
      ayuda: "Cambia tus descuentos, y el salario vacacional se paga sobre el sueldo líquido.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses > 12) throw new ErrorEntrada("Un año tiene 12 meses como máximo.", "meses");
    const anuales = diasDeLicenciaAnual(valores["uy.licencia-dias"], entrada.antiguedad);
    const dias = redondear((anuales * entrada.meses) / 12);
    const sueldo = calcularSueldo(valores, { nominal: entrada.nominal, hijos: entrada.hijos, hijosDiscapacidad: 0, conyuge: entrada.conyuge }, redondear);
    const jornalNominal = redondear(entrada.nominal / 30);
    const jornalLiquido = redondear(sueldo.liquido / 30);
    const pagoLicencia = redondear(jornalNominal * dias);
    const salarioVacacional = redondear(porcentaje(jornalLiquido * dias, valores["uy.salario-vacacional"]));
    const observaciones: string[] = [];
    if (entrada.meses < 12) observaciones.push("Como no trabajaste el año entero, te corresponden días en proporción a los meses trabajados.");
    observaciones.push("El salario vacacional se cobra antes de salir de licencia. Tu laudo o convenio puede mejorarlo.");
    return {
      diasAnuales: anuales,
      diasPorAntiguedad: diasExtraPorAntiguedad(entrada.antiguedad),
      dias,
      jornalNominal,
      pagoLicencia,
      jornalLiquido,
      salarioVacacional,
      observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de licencia que te corresponden", formato: "dias", destacada: true },
    { clave: "diasAnuales", etiqueta: "Días por un año completo", formato: "dias" },
    { clave: "diasPorAntiguedad", etiqueta: "Días extra por antigüedad", formato: "dias", ocultarSiCero: true },
    { clave: "jornalNominal", etiqueta: "Jornal de licencia (sueldo / 30)", formato: "moneda" },
    { clave: "pagoLicencia", etiqueta: "Pago de los días de licencia", formato: "moneda" },
    { clave: "jornalLiquido", etiqueta: "Jornal líquido", formato: "moneda" },
    { clave: "salarioVacacional", etiqueta: "Salario vacacional", formato: "moneda", destacada: true },
  ],
});
