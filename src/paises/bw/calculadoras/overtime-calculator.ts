import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Borrador: las tasas salen del proyecto de la Employment and Labour Relations Act; falta el texto final.
export default definirCalculadora({
  id: "bw.overtime-calculator",
  mercado: "bw",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "borrador",
  requiere: {
    "bw.overtime-rate": "numero",
    "bw.public-holiday-rate": "numero",
    "bw.overtime-divisor": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Basic wage a month", min: 0, porDefecto: 6000 },
    { id: "semana", tipo: "opcion-dato", etiqueta: "Your working week", dato: "bw.overtime-divisor", porDefecto: "5-days" },
    { id: "horasDia", tipo: "numero", etiqueta: "Normal hours in a working day", min: 1, max: 24, porDefecto: 9 },
    { id: "extra", tipo: "numero", etiqueta: "Overtime hours on working days", min: 0, porDefecto: 10 },
    { id: "feriado", tipo: "numero", etiqueta: "Hours worked on a public holiday or rest day", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly wage.", "salario");
    const diario = entrada.salario / enMapa(v["bw.overtime-divisor"], entrada.semana);
    const hora = diario / entrada.horasDia;
    const pagoExtra = redondear(porcentaje(hora, v["bw.overtime-rate"]) * entrada.extra);
    const pagoFeriado = redondear(porcentaje(hora, v["bw.public-holiday-rate"]) * entrada.feriado);
    return { total: redondear(pagoExtra + pagoFeriado), pagoExtra, pagoFeriado, hora: redondear(hora), diario: redondear(diario) };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "pagoExtra", etiqueta: "Overtime on working days", formato: "moneda" },
    { clave: "pagoFeriado", etiqueta: "Public holiday and rest day work", formato: "moneda", ocultarSiCero: true },
    { clave: "hora", etiqueta: "Your normal hourly rate", formato: "moneda" },
    { clave: "diario", etiqueta: "Your daily rate", formato: "moneda" },
  ],
});
