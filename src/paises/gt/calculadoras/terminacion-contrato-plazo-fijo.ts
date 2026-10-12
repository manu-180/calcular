import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { DIAS_MES, sumarMeses } from "../prestaciones";

export default definirCalculadora({
  id: "gt.terminacion-contrato-plazo-fijo",
  mercado: "gt",
  concepto: "propio",
  slug: "terminacion-contrato-plazo-fijo",
  estado: "publicado",
  requiere: {
    "gt.plazo-fijo-dias-por-mes": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "fechaInicio", tipo: "fecha", etiqueta: "Fecha en que empezó el contrato" },
    { id: "fechaFin", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fechaInicio > entrada.fechaFin) throw new ErrorEntrada("La fecha de inicio no puede ser posterior al último día.", "fechaInicio");
    const diaSiguiente = sumarDias(entrada.fechaFin, 1);
    let completos = 0;
    while (sumarMeses(entrada.fechaInicio, completos + 1) <= diaSiguiente) completos++;
    const meses = completos + (sumarMeses(entrada.fechaInicio, completos) <= entrada.fechaFin ? 1 : 0);
    const dias = meses * valores["gt.plazo-fijo-dias-por-mes"];
    const diario = redondear(entrada.salario / DIAS_MES);
    return {
      meses,
      dias,
      diario,
      minimo: redondear(diario * dias),
      observaciones: [
        "Es el mínimo de daños y perjuicios cuando el patrono termina antes y sin causa un contrato a plazo fijo o por obra. Se paga el mismo día.",
        "Un inspector de trabajo o un juez pueden fijar un monto mayor.",
      ],
    };
  },
  resultado: [
    { clave: "meses", etiqueta: "Meses trabajados (cuenta la fracción)", formato: "meses" },
    { clave: "dias", etiqueta: "Días de salario", formato: "dias" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "minimo", etiqueta: "Pago mínimo", formato: "moneda", destacada: true },
  ],
});
