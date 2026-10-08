import { definirCalculadora } from "@/motor/calculo";
import { mesesConFraccion, semanalDeMensual, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "pa.prima-de-antiguedad",
  mercado: "pa",
  concepto: "propio",
  slug: "prima-de-antiguedad",
  estado: "publicado",
  requiere: {
    "pa.prima-antiguedad-semanas": "numero",
  },
  campos: [
    {
      id: "salarioPromedio",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual de los últimos cinco años",
      ayuda: "Si trabajaste menos de cinco años, el promedio de todo el tiempo. Incluye horas extra y comisiones.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    const anios = mesesConFraccion(t) / 12;
    const semanal = semanalDeMensual(entrada.salarioPromedio);
    const semanas = anios * valores["pa.prima-antiguedad-semanas"];
    return {
      tiempo: textoTiempo(t),
      salarioSemanal: redondear(semanal),
      semanas: redondear(semanas),
      prima: redondear(semanal * semanas),
      observaciones: [
        "La prima de antigüedad se paga en todo contrato por tiempo indefinido, sin importar cómo terminó: renuncia, despido o mutuo acuerdo.",
      ],
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "salarioSemanal", etiqueta: "Salario semanal promedio", formato: "moneda" },
    { clave: "semanas", etiqueta: "Semanas de salario que te tocan", formato: "numero", decimales: 2 },
    { clave: "prima", etiqueta: "Prima de antigüedad", formato: "moneda", destacada: true },
  ],
});
