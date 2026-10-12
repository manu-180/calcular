import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { textoTiempo, tiempoTrabajado } from "../lib/fechas";

export default definirCalculadora({
  id: "ec.desahucio",
  mercado: "ec",
  concepto: "preaviso",
  slug: "desahucio",
  estado: "publicado",
  requiere: {
    "ec.desahucio": "numero",
    "ec.desahucio-aviso-dias": "numero",
    "ec.desahucio-plazo-pago-dias": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "aviso", tipo: "fecha", etiqueta: "Fecha en que entregas el aviso de desahucio", porDefecto: "hoy" },
    {
      id: "remuneracion",
      tipo: "moneda",
      etiqueta: "Última remuneración mensual",
      ayuda: "Sueldo más horas extra y comisiones habituales. Sin décimos, utilidades ni fondo de reserva.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.aviso < entrada.inicio) throw new ErrorEntrada("El aviso tiene que ser posterior a la fecha en que empezaste.", "aviso");
    const salida = sumarDias(entrada.aviso, valores["ec.desahucio-aviso-dias"]);
    const pago = sumarDias(entrada.aviso, valores["ec.desahucio-plazo-pago-dias"]);
    const t = tiempoTrabajado(entrada.inicio, salida);
    const porAnio = redondear(porcentaje(entrada.remuneracion, valores["ec.desahucio"]));
    const observaciones: string[] = [];
    if (t.anios === 0) observaciones.push("Todavía no cumples un año completo: la bonificación por desahucio es cero. Igual te pagan los décimos y las vacaciones pendientes.");
    observaciones.push("El empleador puede aceptar que te vayas antes de los quince días. La bonificación es la misma.");
    return {
      antiguedad: textoTiempo(t),
      anios: t.anios,
      porAnio,
      bonificacion: redondear(porAnio * t.anios),
      salida,
      pago,
      observaciones,
    };
  },
  resultado: [
    { clave: "salida", etiqueta: "Último día de trabajo (con el aviso de ley)", formato: "fecha" },
    { clave: "pago", etiqueta: "Fecha límite para que te liquiden", formato: "fecha" },
    { clave: "antiguedad", etiqueta: "Tiempo de servicio a tu salida", formato: "texto" },
    { clave: "porAnio", etiqueta: "Bonificación por cada año", formato: "moneda" },
    { clave: "anios", etiqueta: "Años completos", formato: "anios" },
    { clave: "bonificacion", etiqueta: "Bonificación por desahucio", formato: "moneda", destacada: true },
  ],
});
