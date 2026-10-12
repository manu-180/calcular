import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasCorridosInclusive, textoTiempo, tiempoEntre } from "../lib/fechas";

export default definirCalculadora({
  id: "bo.desahucio",
  mercado: "bo",
  concepto: "preaviso",
  slug: "desahucio",
  estado: "publicado",
  requiere: {
    "bo.desahucio-sueldos": "numero",
    "bo.indemnizacion-dias-minimos": "numero",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó el trabajo",
      opciones: [
        { valor: "despido", etiqueta: "Me despidieron sin causa justificada" },
        { valor: "con-causa", etiqueta: "Me despidieron por una causa del artículo 16 de la Ley General del Trabajo" },
        { valor: "renuncia", etiqueta: "Renuncié o terminó mi contrato" },
      ],
      porDefecto: "despido",
    },
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Promedio del total ganado de los últimos 3 meses",
      ayuda: "Sume el total ganado de los 3 meses anteriores al despido y divida por 3.",
      min: 0,
    },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "retiro", tipo: "fecha", etiqueta: "Fecha del despido", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.retiro < entrada.ingreso) throw new ErrorEntrada("La fecha del despido tiene que ser posterior a la de ingreso.", "retiro");
    const diasMinimos = valores["bo.indemnizacion-dias-minimos"];
    const superaMinimo = diasCorridosInclusive(entrada.ingreso, entrada.retiro) > diasMinimos;
    const corresponde = superaMinimo && entrada.motivo === "despido";
    const observaciones: string[] = ["El desahucio se suma a la indemnización por tiempo de servicios, que se calcula aparte."];
    if (entrada.motivo === "renuncia") observaciones.push("Si usted renunció o terminó su contrato, no hay desahucio. La indemnización sí corresponde.");
    if (entrada.motivo === "con-causa") observaciones.push("Con una causa del artículo 16 no hay desahucio ni indemnización.");
    if (entrada.motivo === "despido" && !superaMinimo) observaciones.push(`Con ${diasMinimos} días de trabajo o menos no hay desahucio.`);
    return {
      antiguedad: textoTiempo(tiempoEntre(entrada.ingreso, entrada.retiro)),
      desahucio: corresponde ? redondear(entrada.sueldo * valores["bo.desahucio-sueldos"]) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "desahucio", etiqueta: "Desahucio", formato: "moneda", destacada: true },
  ],
});
