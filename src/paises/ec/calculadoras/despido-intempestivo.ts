import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { textoTiempo, tiempoTrabajado } from "../lib/fechas";

// Art. 188: entre veinte y veinticinco años de servicio el despido suma la parte proporcional de la
// jubilación patronal, que sale de un cálculo actuarial; aquí solo se avisa.
const ANIOS_JUBILACION_PROPORCIONAL = 20;

export default definirCalculadora({
  id: "ec.despido-intempestivo",
  mercado: "ec",
  concepto: "indemnizacion-despido",
  slug: "despido-intempestivo",
  estado: "publicado",
  requiere: {
    "ec.desahucio": "numero",
    "ec.despido-anios-base": "numero",
    "ec.despido-meses-minimo": "numero",
    "ec.despido-meses-maximo": "numero",
    "ec.jubilacion-patronal-anios": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "salida", tipo: "fecha", etiqueta: "Fecha del despido", porDefecto: "hoy" },
    {
      id: "remuneracion",
      tipo: "moneda",
      etiqueta: "Remuneración mensual al momento del despido",
      ayuda: "Sueldo más horas extra y comisiones habituales. Sin décimos, utilidades ni fondo de reserva.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salida < entrada.inicio) throw new ErrorEntrada("La fecha del despido tiene que ser posterior a la fecha en que empezaste.", "salida");
    const t = tiempoTrabajado(entrada.inicio, entrada.salida);
    const conFraccion = t.meses > 0 || t.dias > 0;
    const base = valores["ec.despido-anios-base"];
    const hastaBase = t.anios < base || (t.anios === base && !conFraccion);
    const meses = hastaBase ? valores["ec.despido-meses-minimo"] : Math.min(t.anios + (conFraccion ? 1 : 0), valores["ec.despido-meses-maximo"]);
    const indemnizacion = redondear(entrada.remuneracion * meses);
    const desahucio = redondear(porcentaje(entrada.remuneracion, valores["ec.desahucio"]) * t.anios);
    const observaciones: string[] = [];
    if (t.anios === 0) observaciones.push("Con menos de un año no hay años completos para la bonificación por desahucio.");
    if (t.anios >= ANIOS_JUBILACION_PROPORCIONAL && t.anios < valores["ec.jubilacion-patronal-anios"]) {
      observaciones.push("Con 20 años o más y menos de 25, también te corresponde la parte proporcional de la jubilación patronal.");
    }
    if (t.anios >= valores["ec.jubilacion-patronal-anios"]) observaciones.push("Con 25 años o más con el mismo empleador tienes derecho a la jubilación patronal.");
    observaciones.push("Aparte te pagan los décimos y las vacaciones pendientes: súmalos con la calculadora de liquidación.");
    return {
      antiguedad: textoTiempo(t),
      meses,
      indemnizacion,
      desahucio,
      total: redondear(indemnizacion + desahucio),
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "meses", etiqueta: "Meses de indemnización", formato: "meses" },
    { clave: "indemnizacion", etiqueta: "Indemnización por despido intempestivo", formato: "moneda" },
    { clave: "desahucio", etiqueta: "Bonificación por desahucio", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total por el despido", formato: "moneda", destacada: true },
  ],
});
