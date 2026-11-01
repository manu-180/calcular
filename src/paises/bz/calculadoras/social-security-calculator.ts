import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { MESES_POR_ANIO, SEMANAS_POR_ANIO, semanalDesdeMensual } from "../lib/pago";

export default definirCalculadora({
  id: "bz.social-security-calculator",
  mercado: "bz",
  concepto: "aportes-seguridad-social",
  slug: "social-security-calculator",
  estado: "publicado",
  requiere: {
    "bz.ssb-insurable-earnings": "escala",
    "bz.ssb-employee-weekly": "escala",
    "bz.ssb-employer-weekly": "escala",
    "bz.ssb-injury-only-weekly": "numero",
    "bz.ssb-wage-ceiling": "numero",
    "bz.ssb-total-rate": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Your pay", min: 0, porDefecto: 2000 },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "Paid",
      opciones: [
        { valor: "semana", etiqueta: "Per week" },
        { valor: "mes", etiqueta: "Per month" },
      ],
      porDefecto: "mes",
    },
    {
      id: "edad",
      tipo: "opcion",
      etiqueta: "Your age",
      opciones: [
        { valor: "regular", etiqueta: "14 to 59, or 60 to 64 and not yet receiving a benefit" },
        { valor: "limitada", etiqueta: "65 or older, or 60 to 64 and receiving a Social Security benefit" },
      ],
      porDefecto: "regular",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("Enter what you are paid.", "monto");
    const semanal = e.base === "mes" ? semanalDesdeMensual(e.monto) : e.monto;
    const asegurable = aplicarEscala(v["bz.ssb-insurable-earnings"], semanal);
    const trabajador = e.edad === "regular" ? aplicarEscala(v["bz.ssb-employee-weekly"], semanal) : 0;
    const empleador = e.edad === "regular" ? aplicarEscala(v["bz.ssb-employer-weekly"], semanal) : v["bz.ssb-injury-only-weekly"];
    const alMes = (n: number) => redondear((n * SEMANAS_POR_ANIO) / MESES_POR_ANIO);
    const observaciones = ["Contributions are charged by the week on a band of weekly earnings. A month is counted as 52 weeks divided by 12, so the monthly figures are an estimate."];
    if (semanal >= v["bz.ssb-wage-ceiling"]) observaciones.push("Your earnings reach the top band, so the contribution stops rising.");
    return {
      semanal: redondear(semanal),
      asegurable,
      trabajadorSemana: redondear(trabajador),
      empleadorSemana: redondear(empleador),
      trabajadorMes: alMes(trabajador),
      empleadorMes: alMes(empleador),
      totalMes: alMes(trabajador + empleador),
      trabajadorAnio: redondear(trabajador * SEMANAS_POR_ANIO),
      netoMes: e.base === "mes" ? redondear(e.monto - alMes(trabajador)) : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "trabajadorMes", etiqueta: "Your contribution each month", formato: "moneda", destacada: true },
    { clave: "trabajadorSemana", etiqueta: "Your contribution each week", formato: "moneda" },
    { clave: "empleadorMes", etiqueta: "Employer contribution each month", formato: "moneda" },
    { clave: "empleadorSemana", etiqueta: "Employer contribution each week", formato: "moneda" },
    { clave: "totalMes", etiqueta: "Total paid to the Board each month", formato: "moneda" },
    { clave: "asegurable", etiqueta: "Weekly insurable earnings", formato: "moneda" },
    { clave: "trabajadorAnio", etiqueta: "Your contribution over 52 weeks", formato: "moneda" },
    { clave: "netoMes", etiqueta: "Monthly pay after your contribution", formato: "moneda" },
  ],
});
