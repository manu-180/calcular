import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { estadoValido, OPCIONES_ESTADO_CIVIL } from "../lib/impuestos";
import { FICA, ficaEmpleado } from "../lib/nomina";

export default definirCalculadora({
  id: "us.fica-tax",
  mercado: "us",
  concepto: "aportes-seguridad-social",
  slug: "fica-tax",
  estado: "publicado",
  requiere: {
    ...FICA,
    "us.additional-medicare-threshold": "mapa",
  },
  campos: [
    { id: "salarios", tipo: "moneda", etiqueta: "Wages for the year", min: 0, porDefecto: 75000, ayuda: "Gross pay minus pre-tax health benefits. 401(k) contributions still count." },
    { id: "estado", tipo: "opcion", etiqueta: "Filing status", opciones: OPCIONES_ESTADO_CIVIL, porDefecto: "single" },
  ],
  calcular(entrada, valores, { redondear }) {
    const estado = estadoValido(entrada.estado);
    const e = ficaEmpleado(valores, entrada.salarios, enMapa(valores["us.additional-medicare-threshold"], estado), redondear);
    const empleado = redondear(e.socialSecurity + e.medicare + e.adicional);
    const ssEmpleador = e.socialSecurity;
    const medicareEmpleador = redondear(porcentaje(entrada.salarios, valores["us.medicare-rate"]));
    const empleador = redondear(ssEmpleador + medicareEmpleador);
    return {
      socialSecurity: e.socialSecurity,
      medicare: e.medicare,
      adicional: e.adicional,
      empleado,
      ssEmpleador,
      medicareEmpleador,
      empleador,
      total: redondear(empleado + empleador),
      efectiva: entrada.salarios > 0 ? redondear((empleado / entrada.salarios) * 100) : 0,
      observaciones:
        entrada.salarios > valores["us.social-security-wage-base"]
          ? ["Wages above the Social Security wage base pay only Medicare tax."]
          : [],
    };
  },
  resultado: [
    { clave: "socialSecurity", etiqueta: "Social Security tax you pay", formato: "moneda" },
    { clave: "medicare", etiqueta: "Medicare tax you pay", formato: "moneda" },
    { clave: "adicional", etiqueta: "Additional Medicare Tax", formato: "moneda", ocultarSiCero: true },
    { clave: "empleado", etiqueta: "Your total FICA tax", formato: "moneda", destacada: true },
    { clave: "efectiva", etiqueta: "Share of your wages", formato: "porcentaje" },
    { clave: "ssEmpleador", etiqueta: "Social Security paid by your employer", formato: "moneda" },
    { clave: "medicareEmpleador", etiqueta: "Medicare paid by your employer", formato: "moneda" },
    { clave: "empleador", etiqueta: "Employer's total FICA", formato: "moneda" },
    { clave: "total", etiqueta: "Total FICA on your wages", formato: "moneda" },
  ],
});
