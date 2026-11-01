import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mk.prosechna-plata",
  mercado: "mk",
  concepto: "propio",
  slug: "prosechna-plata",
  estado: "publicado",
  requiere: { "mk.neto-plata": "serie", "mk.bruto-plata": "serie" },
  campos: [{ id: "neto", tipo: "moneda", etiqueta: "Вашата месечна нето-плата", min: 0, porDefecto: 40000 }],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Внесете нето-плата поголема од нула.", "neto");
    const prosek = v["mk.neto-plata"].valor;
    return {
      procent: Math.round((e.neto / prosek) * 1000) / 10,
      razlika: redondear(e.neto - prosek),
      prosekNeto: prosek,
      prosekBruto: v["mk.bruto-plata"].valor,
    };
  },
  resultado: [
    { clave: "procent", etiqueta: "Вашата плата во однос на просекот", formato: "porcentaje", decimales: 1, destacada: true },
    { clave: "razlika", etiqueta: "Разлика од просечната нето-плата", formato: "moneda" },
    { clave: "prosekNeto", etiqueta: "Просечна нето-плата", formato: "moneda" },
    { clave: "prosekBruto", etiqueta: "Просечна бруто-плата", formato: "moneda" },
  ],
});
