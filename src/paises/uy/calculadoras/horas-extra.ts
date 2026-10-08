import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.horas-extra",
  mercado: "uy",
  concepto: "horas-extra",
  slug: "horas-extra",
  estado: "publicado",
  requiere: {
    "uy.recargo-he-habil": "numero",
    "uy.recargo-he-descanso": "numero",
  },
  campos: [
    {
      id: "modalidad",
      tipo: "opcion",
      etiqueta: "Cómo cobrás",
      opciones: [
        { valor: "mensual", etiqueta: "Sueldo mensual" },
        { valor: "hora", etiqueta: "Por hora" },
      ],
      porDefecto: "mensual",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Sueldo mensual o valor de tu hora", min: 0 },
    {
      id: "divisor",
      tipo: "numero",
      etiqueta: "Horas que se dividen para sacar el valor hora",
      ayuda: "Solo para mensuales. 200 es el divisor que usa el decreto del salario mínimo (25 jornales de 8 horas). Tu laudo puede usar otro: revisalo en tu recibo.",
      min: 1,
      max: 400,
      porDefecto: 200,
    },
    { id: "horasHabiles", tipo: "numero", etiqueta: "Horas extra en días hábiles", min: 0, max: 400, porDefecto: 0 },
    { id: "horasDescanso", tipo: "numero", etiqueta: "Horas extra en feriados o días de descanso", min: 0, max: 400, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.modalidad === "mensual" && entrada.divisor <= 0) throw new ErrorEntrada("El divisor tiene que ser mayor que cero.", "divisor");
    const valorHora = redondear(entrada.modalidad === "mensual" ? entrada.monto / entrada.divisor : entrada.monto);
    const horaHabil = redondear(valorHora + porcentaje(valorHora, valores["uy.recargo-he-habil"]));
    const horaDescanso = redondear(valorHora + porcentaje(valorHora, valores["uy.recargo-he-descanso"]));
    const pagoHabiles = redondear(horaHabil * entrada.horasHabiles);
    const pagoDescanso = redondear(horaDescanso * entrada.horasDescanso);
    return {
      valorHora,
      horaHabil,
      horaDescanso,
      pagoHabiles,
      pagoDescanso,
      total: redondear(pagoHabiles + pagoDescanso),
      observaciones: ["Las fracciones de menos de media hora se pagan como media hora y las de más, como una hora entera. El máximo legal es de 8 horas extra por semana."],
    };
  },
  resultado: [
    { clave: "valorHora", etiqueta: "Valor de tu hora común", formato: "moneda" },
    { clave: "horaHabil", etiqueta: "Hora extra en día hábil", formato: "moneda" },
    { clave: "horaDescanso", etiqueta: "Hora extra en feriado o descanso", formato: "moneda" },
    { clave: "pagoHabiles", etiqueta: "Horas extra en días hábiles", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoDescanso", etiqueta: "Horas extra en feriados o descanso", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total de horas extra", formato: "moneda", destacada: true },
  ],
});
