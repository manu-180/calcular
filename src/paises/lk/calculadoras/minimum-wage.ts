import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lk.minimum-wage",
  mercado: "lk",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "lk.minimum-wage-monthly": "numero",
    "lk.minimum-wage-daily": "numero",
  },
  campos: [
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "How are you paid?",
      opciones: [
        { valor: "mes", etiqueta: "By the month" },
        { valor: "dia", etiqueta: "By the day" },
      ],
      porDefecto: "mes",
    },
    { id: "pago", tipo: "moneda", etiqueta: "Your wage for that period", min: 0, requerido: false, ayuda: "Leave it empty to see only the minimum." },
  ],
  calcular(e, v) {
    if (e.pago !== null && e.pago < 0) throw new ErrorEntrada("The wage cannot be negative.", "pago");
    const minimo = e.periodo === "mes" ? v["lk.minimum-wage-monthly"] : v["lk.minimum-wage-daily"];
    const observaciones: string[] = [];
    let diferencia: number | null = null;
    if (e.pago !== null) {
      diferencia = e.pago - minimo;
      observaciones.push(diferencia >= 0 ? "Your wage is at or above the national minimum." : "Your wage is below the national minimum.");
    }
    return {
      minimo,
      mensual: v["lk.minimum-wage-monthly"],
      diaria: v["lk.minimum-wage-daily"],
      falta: diferencia !== null && diferencia < 0 ? -diferencia : null,
      sobre: diferencia !== null && diferencia >= 0 ? diferencia : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "National minimum for your pay period", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "National minimum monthly wage", formato: "moneda" },
    { clave: "diaria", etiqueta: "National minimum daily wage", formato: "moneda" },
    { clave: "falta", etiqueta: "Short of the minimum by", formato: "moneda" },
    { clave: "sobre", etiqueta: "Above the minimum by", formato: "moneda" },
  ],
});
