import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { JURISDICCIONES } from "../lib/laboral";

export default definirCalculadora({
  id: "ca.vacation-pay",
  mercado: "ca",
  concepto: "vacaciones",
  slug: "vacation-pay",
  estado: "publicado",
  requiere: {
    "ca.vacation-pay-on": "mapa",
    "ca.vacation-pay-bc": "mapa",
    "ca.vacation-pay-ab": "mapa",
    "ca.vacation-pay-federal": "mapa",
  },
  campos: [
    { id: "jurisdiccion", tipo: "opcion", etiqueta: "Rules that cover your job", opciones: JURISDICCIONES, porDefecto: "on" },
    { id: "salario", tipo: "moneda", etiqueta: "Gross wages earned in the vacation year", min: 0, porDefecto: 50000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years with this employer", min: 0, max: 60, porDefecto: 2 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter the wages you earned in the year.", "salario");
    const reglas = v[`ca.vacation-pay-${entrada.jurisdiccion}`];
    let tasa = reglas["rate-0"];
    if (reglas["years-1"] !== undefined && entrada.anios >= reglas["years-1"]) tasa = reglas["rate-1"];
    if (reglas["years-2"] !== undefined && entrada.anios >= reglas["years-2"]) tasa = reglas["rate-2"];
    const semanas = entrada.anios >= 1 ? tasa / 2 : 0;
    const observaciones: string[] = [];
    if (entrada.anios < 1) observaciones.push("You earn vacation pay from your first day, but the paid time off comes after your first full year.");
    return {
      pago: redondear(porcentaje(entrada.salario, tasa)),
      tasa,
      semanas,
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Vacation pay", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Vacation pay rate", formato: "porcentaje", decimales: 0 },
    { clave: "semanas", etiqueta: "Weeks of vacation a year", formato: "numero", decimales: 0 },
  ],
});
