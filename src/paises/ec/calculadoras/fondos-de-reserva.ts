import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { fechaLarga, sumarMeses, tiempoTrabajado } from "../lib/fechas";

export default definirCalculadora({
  id: "ec.fondos-de-reserva",
  mercado: "ec",
  concepto: "fondo-cesantia",
  slug: "fondos-de-reserva",
  estado: "publicado",
  requiere: {
    "ec.fondo-reserva": "numero",
  },
  campos: [
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Remuneración mensual de aportación",
      ayuda: "Lo que ganas en el mes y aporta al IESS: sueldo, horas extra y comisiones. Sin décimos.",
      min: 0,
    },
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar con este empleador" },
  ],
  calcular(entrada, valores, { fecha: hoy, redondear }) {
    if (entrada.inicio > hoy) throw new ErrorEntrada("La fecha en que empezaste no puede ser posterior a hoy.", "inicio");
    const desde = sumarMeses(entrada.inicio, 12);
    const tiene = hoy >= desde;
    const mensual = redondear(porcentaje(entrada.sueldo, valores["ec.fondo-reserva"]));
    const t = tiempoTrabajado(entrada.inicio, sumarDias(hoy, -1));
    const observaciones = tiene
      ? ["Puedes cobrarlo cada mes con tu sueldo o pedir que se deposite en el IESS y ahorrarlo."]
      : [`Todavía no cumples un año con este empleador. Empiezas a recibirlo desde el ${fechaLarga(desde)}.`];
    return {
      antiguedad: `${t.anios} ${t.anios === 1 ? "año" : "años"} y ${t.meses} ${t.meses === 1 ? "mes" : "meses"}`,
      desde: `Desde el ${fechaLarga(desde)}`,
      mensual: tiene ? mensual : 0,
      anual: tiene ? redondear(mensual * 12) : 0,
      valorMensualFuturo: tiene ? null : mensual,
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo con este empleador", formato: "texto" },
    { clave: "desde", etiqueta: "Tienes derecho al fondo de reserva", formato: "texto" },
    { clave: "valorMensualFuturo", etiqueta: "Lo que recibirás cada mes", formato: "moneda" },
    { clave: "mensual", etiqueta: "Fondo de reserva mensual", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "En un año", formato: "moneda" },
  ],
});
