import { definirCalculadora, enMapa } from "@/motor/calculo";
import { CAMPO_ANIOS, CAMPO_MESES, etiquetaTramo, mesesValidos, sueldoValido, tramoAntiguedad } from "../lib/empleo";

export default definirCalculadora({
  id: "my.termination-benefits",
  mercado: "my",
  concepto: "indemnizacion-despido",
  slug: "termination-benefits",
  estado: "publicado",
  requiere: {
    "my.termination-benefit-days": "mapa",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Average monthly wages in the last 12 months", min: 0, porDefecto: 3000 },
    CAMPO_ANIOS,
    CAMPO_MESES,
  ],
  calcular(entrada, v, { redondear }) {
    sueldoValido(entrada.sueldo);
    mesesValidos(entrada.anios, entrada.meses);
    const servicio = entrada.anios + entrada.meses / 12;
    const tramo = tramoAntiguedad(servicio);
    const diasPorAnio = enMapa(v["my.termination-benefit-days"], tramo);
    // JTKSM: salario diario = sueldo de 12 meses / 365, y los meses incompletos van a prorrata.
    const diario = redondear((entrada.sueldo * 12) / 365);
    const dias = redondear(diasPorAnio * servicio);
    const observaciones: string[] = [];
    if (servicio < 1) observaciones.push("JTKSM's estimate applies to employees with more than 12 months of service.");
    return {
      total: redondear(diario * diasPorAnio * servicio),
      diasPorAnio,
      dias,
      diario,
      tramo: etiquetaTramo(tramo),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Minimum termination benefit", formato: "moneda", destacada: true },
    { clave: "diasPorAnio", etiqueta: "Days' wages for each year of service", formato: "dias" },
    { clave: "dias", etiqueta: "Days' wages in total", formato: "dias", decimales: 2 },
    { clave: "diario", etiqueta: "One day's wages", formato: "moneda" },
    { clave: "tramo", etiqueta: "Length of service", formato: "texto" },
  ],
});
