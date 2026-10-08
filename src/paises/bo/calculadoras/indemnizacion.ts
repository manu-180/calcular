import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasCorridosInclusive, textoTiempo, tiempoEntre } from "../lib/fechas";
import { montoPorTiempo } from "../lib/laboral";

export default definirCalculadora({
  id: "bo.indemnizacion",
  mercado: "bo",
  concepto: "indemnizacion-despido",
  slug: "indemnizacion",
  estado: "publicado",
  requiere: {
    "bo.indemnizacion-dias-minimos": "numero",
    "bo.desahucio-sueldos": "numero",
    "bo.quinquenio-anios": "numero",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó el trabajo",
      opciones: [
        { valor: "despido", etiqueta: "Me despidieron sin causa justificada" },
        { valor: "renuncia", etiqueta: "Renuncié o terminó mi contrato" },
      ],
      porDefecto: "despido",
    },
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Promedio del total ganado de los últimos 3 meses",
      ayuda: "Sume el total ganado de los 3 meses anteriores al retiro y divida por 3.",
      min: 0,
    },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "retiro", tipo: "fecha", etiqueta: "Fecha de retiro", porDefecto: "hoy" },
    { id: "quinquenios", tipo: "entero", etiqueta: "Quinquenios que ya cobró", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.retiro < entrada.ingreso) throw new ErrorEntrada("La fecha de retiro tiene que ser posterior a la de ingreso.", "retiro");
    const t = tiempoEntre(entrada.ingreso, entrada.retiro);
    const aniosCobrados = entrada.quinquenios * valores["bo.quinquenio-anios"];
    if (aniosCobrados > t.anios) throw new ErrorEntrada("Cobró más quinquenios que los años que trabajó. Revise el dato.", "quinquenios");
    const diasMinimos = valores["bo.indemnizacion-dias-minimos"];
    const superaMinimo = diasCorridosInclusive(entrada.ingreso, entrada.retiro) > diasMinimos;
    const indemnizacion = superaMinimo ? montoPorTiempo(entrada.sueldo, { ...t, anios: t.anios - aniosCobrados }, redondear) : 0;
    const desahucio = superaMinimo && entrada.motivo === "despido" ? redondear(entrada.sueldo * valores["bo.desahucio-sueldos"]) : 0;
    const observaciones: string[] = ["Si lo despidieron por una causa del artículo 16 de la Ley General del Trabajo, no hay indemnización ni desahucio."];
    if (!superaMinimo) observaciones.push(`Con ${diasMinimos} días de trabajo o menos no hay indemnización.`);
    if (aniosCobrados > 0) observaciones.push(`Descontamos ${aniosCobrados} años ya pagados con quinquenios.`);
    return {
      antiguedad: textoTiempo(t),
      indemnizacion,
      desahucio,
      total: redondear(indemnizacion + desahucio),
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "indemnizacion", etiqueta: "Indemnización por tiempo de servicios", formato: "moneda" },
    { clave: "desahucio", etiqueta: "Desahucio", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total", formato: "moneda", destacada: true },
  ],
});
