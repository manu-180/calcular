import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.salario-minimo",
  mercado: "co",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.auxilio-transporte": "numero",
    "co.jornada-semanal": "numero",
  },
  campos: [
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "Días trabajados en el mes",
      ayuda: "Para nómina el mes tiene 30 días.",
      min: 1,
      max: 30,
      porDefecto: 30,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias < 1 || entrada.dias > 30) throw new ErrorEntrada("Escribe entre 1 y 30 días.", "dias");
    const smmlv = valores["co.smmlv"];
    const auxilioMes = valores["co.auxilio-transporte"];
    const jornada = valores["co.jornada-semanal"];
    const diario = smmlv / 30;
    const salario = redondear(diario * entrada.dias);
    const auxilio = redondear((auxilioMes / 30) * entrada.dias);
    return {
      mensual: smmlv,
      diario: redondear(diario),
      hora: redondear(smmlv / ((jornada * 30) / 6)),
      salario,
      auxilio,
      total: redondear(salario + auxilio),
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Salario mínimo mensual", formato: "moneda", decimales: 0 },
    { clave: "diario", etiqueta: "Salario mínimo diario", formato: "moneda", decimales: 0 },
    { clave: "hora", etiqueta: "Valor de la hora ordinaria", formato: "moneda", decimales: 0 },
    { clave: "salario", etiqueta: "Salario por los días trabajados", formato: "moneda", decimales: 0 },
    { clave: "auxilio", etiqueta: "Auxilio de transporte por esos días", formato: "moneda", decimales: 0 },
    { clave: "total", etiqueta: "Total a recibir antes de descuentos", formato: "moneda", decimales: 0, destacada: true },
  ],
});
