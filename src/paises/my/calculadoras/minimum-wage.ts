import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { rm } from "../lib/impuestos";

export default definirCalculadora({
  id: "my.minimum-wage",
  mercado: "my",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "my.minimum-wage-monthly": "numero",
    "my.minimum-wage-hourly": "numero",
    "my.minimum-wage-daily": "mapa",
  },
  campos: [
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "How you are paid",
      opciones: [
        { valor: "monthly", etiqueta: "By the month" },
        { valor: "daily", etiqueta: "By the day" },
        { valor: "hourly", etiqueta: "By the hour" },
      ],
      porDefecto: "monthly",
    },
    {
      id: "dias",
      tipo: "opcion",
      etiqueta: "Working days a week",
      opciones: [
        { valor: "6", etiqueta: "6 days" },
        { valor: "5", etiqueta: "5 days" },
        { valor: "4", etiqueta: "4 days" },
      ],
      porDefecto: "5",
    },
    { id: "pago", tipo: "moneda", etiqueta: "Your basic pay for that period", min: 0, porDefecto: 1700, ayuda: "Basic wages only, without overtime or allowances." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.pago <= 0) throw new ErrorEntrada("Enter your basic pay.", "pago");
    const diario = v["my.minimum-wage-daily"][entrada.dias];
    const minimo = entrada.base === "monthly" ? v["my.minimum-wage-monthly"] : entrada.base === "daily" ? diario : v["my.minimum-wage-hourly"];
    const falta = redondear(Math.max(0, minimo - entrada.pago));
    return {
      minimo,
      falta,
      cumple: falta > 0 ? "Below the minimum wage" : "At or above the minimum wage",
      mensual: v["my.minimum-wage-monthly"],
      diario,
      hora: v["my.minimum-wage-hourly"],
      observaciones: falta > 0 ? [`Your employer has to add at least ${rm(falta)} for each period.`] : ([] as string[]),
    };
  },
  resultado: [
    { clave: "cumple", etiqueta: "Your pay is", formato: "texto", destacada: true },
    { clave: "minimo", etiqueta: "Minimum for your pay period", formato: "moneda" },
    { clave: "falta", etiqueta: "Shortfall", formato: "moneda", ocultarSiCero: true },
    { clave: "mensual", etiqueta: "Minimum wage a month", formato: "moneda" },
    { clave: "diario", etiqueta: "Minimum wage a day", formato: "moneda" },
    { clave: "hora", etiqueta: "Minimum wage an hour", formato: "moneda" },
  ],
});
