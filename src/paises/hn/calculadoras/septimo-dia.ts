import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.septimo-dia",
  mercado: "hn",
  concepto: "propio",
  slug: "septimo-dia",
  estado: "publicado",
  requiere: {
    "hn.septimo-dia-cada": "numero",
  },
  campos: [
    {
      id: "salarioDiario",
      tipo: "moneda",
      etiqueta: "Salario de un día de trabajo",
      ayuda: "Lo que gana en una jornada ordinaria, sin horas extra.",
      min: 0,
    },
    { id: "diasTrabajados", tipo: "entero", etiqueta: "Días que trabajó en la semana", min: 0, max: 6, porDefecto: 6 },
    { id: "faltaInjustificada", tipo: "si-no", etiqueta: "Faltó algún día sin causa justificada", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const cada = valores["hn.septimo-dia-cada"];
    if (entrada.diasTrabajados > cada) throw new ErrorEntrada(`La semana tiene ${cada} días de trabajo como máximo.`, "diasTrabajados");
    const observaciones: string[] = [];
    let pago = 0;
    if (entrada.faltaInjustificada) observaciones.push("Si no trabaja la semana completa sin causa justificada, pierde el pago del séptimo día.");
    else {
      pago = redondear((entrada.salarioDiario * entrada.diasTrabajados) / cada);
      if (entrada.diasTrabajados < cada) observaciones.push("Trabajó menos días por causa justificada, así que cobra la parte proporcional.");
    }
    observaciones.push("Si cobra por mes o por quincena, el séptimo día ya está incluido en su salario.");
    return { pago, semana: redondear(entrada.salarioDiario * entrada.diasTrabajados + pago), observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "Pago del séptimo día", formato: "moneda", destacada: true },
    { clave: "semana", etiqueta: "Total de la semana con el séptimo día", formato: "moneda" },
  ],
});
