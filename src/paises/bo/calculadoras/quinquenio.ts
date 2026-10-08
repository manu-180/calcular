import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarMeses, tiempoEntre } from "../lib/fechas";

export default definirCalculadora({
  id: "bo.quinquenio",
  mercado: "bo",
  concepto: "propio",
  slug: "quinquenio",
  estado: "publicado",
  requiere: {
    "bo.quinquenio-anios": "numero",
  },
  campos: [
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Promedio del total ganado de los 3 meses anteriores a la solicitud",
      ayuda: "Sume el total ganado de esos 3 meses y divida por 3.",
      min: 0,
    },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "solicitud", tipo: "fecha", etiqueta: "Fecha en que pide el pago", porDefecto: "hoy" },
    { id: "cobrados", tipo: "entero", etiqueta: "Quinquenios que ya cobró", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.solicitud < entrada.ingreso) throw new ErrorEntrada("La fecha de solicitud tiene que ser posterior a la de ingreso.", "solicitud");
    const aniosPorQuinquenio = valores["bo.quinquenio-anios"];
    const anios = tiempoEntre(entrada.ingreso, entrada.solicitud).anios;
    const consolidados = Math.floor(anios / aniosPorQuinquenio);
    if (entrada.cobrados > consolidados) throw new ErrorEntrada("Cobró más quinquenios que los que lleva consolidados. Revise el dato.", "cobrados");
    const aCobrar = consolidados - entrada.cobrados;
    const porQuinquenio = redondear(entrada.sueldo * aniosPorQuinquenio);
    const observaciones = ["El empleador tiene 30 días calendario desde su pedido por escrito para pagarlo, en un solo pago."];
    if (aCobrar === 0) observaciones.push("Todavía no tiene un quinquenio nuevo consolidado.");
    if (aCobrar > 1) observaciones.push("Puede pedir el pago de todos los quinquenios juntos o de uno solo.");
    return {
      anios,
      aCobrar,
      porQuinquenio,
      total: redondear(porQuinquenio * aCobrar),
      proximo: sumarMeses(entrada.ingreso, (consolidados + 1) * aniosPorQuinquenio * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "anios", etiqueta: "Años de trabajo continuo", formato: "anios" },
    { clave: "aCobrar", etiqueta: "Quinquenios que puede cobrar", formato: "numero" },
    { clave: "porQuinquenio", etiqueta: "Monto de cada quinquenio", formato: "moneda" },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
    { clave: "proximo", etiqueta: "Consolida el próximo quinquenio el", formato: "fecha" },
  ],
});
