import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";
import { cesantia, salarioDiario, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "hn.contrato-a-plazo-fijo",
  mercado: "hn",
  concepto: "propio",
  slug: "contrato-a-plazo-fijo",
  estado: "publicado",
  requiere: {
    "hn.cesantia-dias-menos-de-un-anio": "mapa",
    "hn.cesantia-tope-meses": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario promedio mensual de los últimos seis meses", min: 0 },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaDespido", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    { id: "fechaFin", tipo: "fecha", etiqueta: "Fecha en que vencía el contrato o terminaba la obra" },
    { id: "microempresa", tipo: "si-no", etiqueta: "La empresa tiene 10 empleados o menos", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaDespido, "fechaDespido");
    if (entrada.fechaFin < entrada.fechaDespido) throw new ErrorEntrada("El contrato tiene que vencer después del último día de trabajo.", "fechaFin");
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaDespido);
    const diario = salarioDiario(entrada.salario);
    const diasRestantes = diasEntre(entrada.fechaDespido, entrada.fechaFin);
    const salariosRestantes = redondear(diario * diasRestantes);
    const tope = enMapa(valores["hn.cesantia-tope-meses"], entrada.microempresa ? "microempresa" : "general");
    const limite = redondear(entrada.salario * cesantia(t, valores["hn.cesantia-dias-menos-de-un-anio"], tope).meses);
    const indemnizacion = Math.min(salariosRestantes, limite);
    const observaciones: string[] = [];
    if (salariosRestantes > limite) observaciones.push("Los salarios que faltaban pasan de lo que le tocaría de cesantía con un contrato indefinido, así que se paga ese límite.");
    observaciones.push("Si el trabajo es permanente en la empresa, el contrato se considera por tiempo indefinido aunque diga un plazo. En ese caso calcule sus prestaciones completas.");
    observaciones.push("Aparte le corresponden las vacaciones y los décimos proporcionales.");
    return {
      tiempo: textoTiempo(t),
      diasRestantes,
      salariosRestantes,
      limite,
      indemnizacion,
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "diasRestantes", etiqueta: "Días que faltaban del contrato", formato: "dias" },
    { clave: "salariosRestantes", etiqueta: "Salarios de esos días", formato: "moneda" },
    { clave: "limite", etiqueta: "Límite (la cesantía de un contrato indefinido)", formato: "moneda" },
    { clave: "indemnizacion", etiqueta: "Indemnización", formato: "moneda", destacada: true },
  ],
});
