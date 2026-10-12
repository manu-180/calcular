import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { antiguedad } from "../prestaciones";

export default definirCalculadora({
  id: "ni.despido-trabajador-de-confianza",
  mercado: "ni",
  concepto: "propio",
  slug: "despido-trabajador-de-confianza",
  estado: "publicado",
  requiere: {
    "ni.confianza-minimo-meses": "numero",
    "ni.confianza-maximo-meses": "numero",
    "ni.confianza-antiguedad-minima": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fechaIngreso > entrada.fechaSalida) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior a la de salida.", "fechaIngreso");
    const a = antiguedad(entrada.fechaIngreso, entrada.fechaSalida);
    const alcanza = a.anios >= valores["ni.confianza-antiguedad-minima"];
    const minimo = alcanza ? redondear(entrada.salario * valores["ni.confianza-minimo-meses"]) : 0;
    const maximo = alcanza ? redondear(entrada.salario * valores["ni.confianza-maximo-meses"]) : 0;
    const observaciones = alcanza
      ? [
          "El monto exacto entre el mínimo y el máximo se acuerda o lo fija un juez. La ley no da una fórmula.",
          "Es aparte de las otras prestaciones: aguinaldo y vacaciones proporcionales.",
          "Al trabajador de confianza no se le puede exigir el reintegro: por eso existe esta indemnización.",
        ]
      : ["Para esta indemnización hace falta al menos un año continuo de trabajo. Igual te corresponden el aguinaldo y las vacaciones proporcionales."];
    return { anios: redondear(a.anios), minimo, maximo, observaciones };
  },
  resultado: [
    { clave: "anios", etiqueta: "Antigüedad", formato: "anios", decimales: 2 },
    { clave: "minimo", etiqueta: "Indemnización mínima", formato: "moneda", destacada: true },
    { clave: "maximo", etiqueta: "Indemnización máxima", formato: "moneda" },
  ],
});
