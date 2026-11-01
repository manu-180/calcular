import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.exchange-rate",
  mercado: "kh",
  concepto: "tipo-de-cambio",
  slug: "exchange-rate",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  requiere: { "kh.usd": "serie" },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "ប្តូរពីណាទៅណា",
      opciones: [
        { valor: "a-riel", etiqueta: "ដុល្លារ ទៅ រៀល" },
        { valor: "a-usd", etiqueta: "រៀល ទៅ ដុល្លារ" },
      ],
      porDefecto: "a-riel",
    },
    { id: "monto", tipo: "numero", etiqueta: "ចំនួនទឹកប្រាក់", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto <= 0) throw new ErrorEntrada("សូមបញ្ចូលចំនួនទឹកប្រាក់។", "monto");
    const { valor, fecha } = v["kh.usd"];
    const aRiel = e.sentido === "a-riel";
    return {
      resultado: redondear(aRiel ? e.monto * valor : e.monto / valor),
      unidad: aRiel ? "រៀល" : "ដុល្លារ",
      tasa: valor,
      fecha,
      observaciones: ["នេះជាអត្រាផ្លូវការ។ ធនាគារ និងអ្នកប្តូរប្រាក់ប្រើអត្រាផ្ទាល់ខ្លួន។"],
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "ចំនួនក្រោយប្តូរ", formato: "numero", decimales: 2, destacada: true },
    { clave: "unidad", etiqueta: "រូបិយប័ណ្ណ", formato: "texto" },
    { clave: "tasa", etiqueta: "រៀលក្នុង 1 ដុល្លារ", formato: "numero" },
    { clave: "fecha", etiqueta: "កាលបរិច្ឆេទអត្រា", formato: "fecha" },
  ],
});
