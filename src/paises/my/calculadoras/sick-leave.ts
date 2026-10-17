import { definirCalculadora, enMapa } from "@/motor/calculo";
import { CAMPO_ANIOS, CAMPO_SUELDO, etiquetaTramo, sueldoValido, tramoAntiguedad } from "../lib/empleo";

export default definirCalculadora({
  id: "my.sick-leave",
  mercado: "my",
  concepto: "propio",
  slug: "sick-leave",
  estado: "publicado",
  requiere: {
    "my.sick-leave-days": "mapa",
    "my.ordinary-rate-divisor": "numero",
  },
  campos: [
    CAMPO_SUELDO,
    CAMPO_ANIOS,
    { id: "tomados", tipo: "numero", etiqueta: "Sick leave days already taken this year (without hospitalisation)", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    sueldoValido(entrada.sueldo);
    const tramo = tramoAntiguedad(entrada.anios);
    const dias = enMapa(v["my.sick-leave-days"], tramo);
    const pendientes = Math.max(0, dias - entrada.tomados);
    const diario = redondear(entrada.sueldo / v["my.ordinary-rate-divisor"]);
    return {
      dias,
      pendientes,
      hospital: enMapa(v["my.sick-leave-days"], "hospitalisation"),
      tramo: etiquetaTramo(tramo),
      diario,
      valor: redondear(pendientes * diario),
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Paid sick leave a year", formato: "dias", destacada: true },
    { clave: "pendientes", etiqueta: "Days left this year", formato: "dias" },
    { clave: "hospital", etiqueta: "Paid sick leave a year when hospitalised", formato: "dias" },
    { clave: "tramo", etiqueta: "Length of service", formato: "texto" },
    { clave: "diario", etiqueta: "Pay for a day of sick leave", formato: "moneda" },
    { clave: "valor", etiqueta: "Value of the days left", formato: "moneda" },
  ],
});
