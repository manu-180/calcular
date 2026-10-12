import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasDeLicenciaAnual, diasExtraPorAntiguedad } from "../lib/licencia";

export default definirCalculadora({
  id: "uy.dias-de-licencia",
  mercado: "uy",
  concepto: "propio",
  slug: "dias-de-licencia",
  estado: "publicado",
  requiere: {
    "uy.licencia-dias": "numero",
  },
  campos: [
    {
      id: "antiguedad",
      tipo: "entero",
      etiqueta: "Años cumplidos en la empresa",
      ayuda: "Desde los 5 años se suma un día, y otro cada 4 años más.",
      min: 0,
      max: 60,
      porDefecto: 1,
    },
    {
      id: "meses",
      tipo: "numero",
      etiqueta: "Meses trabajados en el año que genera la licencia",
      ayuda: "La licencia se gana con el año anterior. 12 si trabajaste el año entero.",
      min: 0,
      max: 12,
      porDefecto: 12,
    },
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Sueldo nominal mensual (opcional)",
      ayuda: "Si lo ponés, te decimos cuánto se paga por los días de licencia.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses > 12) throw new ErrorEntrada("Un año tiene 12 meses como máximo.", "meses");
    const diasAnuales = diasDeLicenciaAnual(valores["uy.licencia-dias"], entrada.antiguedad);
    const dias = redondear((diasAnuales * entrada.meses) / 12);
    const jornal = entrada.sueldo === null ? null : redondear(entrada.sueldo / 30);
    const observaciones: string[] = [];
    if (entrada.meses < 12) observaciones.push("Como no trabajaste el año entero, te corresponde la parte proporcional a los meses trabajados.");
    observaciones.push("Además del pago de los días, antes de salir de licencia cobrás el salario vacacional.");
    return {
      diasAnuales,
      diasExtra: diasExtraPorAntiguedad(entrada.antiguedad),
      dias,
      jornal,
      pago: jornal === null ? null : redondear(jornal * dias),
      observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de licencia que te corresponden", formato: "dias", destacada: true },
    { clave: "diasAnuales", etiqueta: "Días por un año completo", formato: "dias" },
    { clave: "diasExtra", etiqueta: "Días extra por antigüedad", formato: "dias", ocultarSiCero: true },
    { clave: "jornal", etiqueta: "Jornal de licencia (sueldo / 30)", formato: "moneda" },
    { clave: "pago", etiqueta: "Pago de los días de licencia", formato: "moneda" },
  ],
});
