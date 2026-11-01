import { aplicarEscalaMarginal, definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.tax-on-income",
  mercado: "kh",
  concepto: "propio",
  slug: "tax-on-income",
  estado: "publicado",
  requiere: { "kh.ti-brackets": "escala", "kh.ti-rates": "mapa" },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "ប្រភេទសហគ្រាស",
      opciones: [
        { valor: "legal", etiqueta: "សហគ្រាសនីតិបុគ្គល" },
        { valor: "persona", etiqueta: "សហគ្រាសឯកបុគ្គល" },
        { valor: "resource", etiqueta: "ធនធានធម្មជាតិ ប្រេងកាត និងឧស្ម័ន" },
      ],
      porDefecto: "legal",
    },
    { id: "ganancia", tipo: "moneda", etiqueta: "ប្រាក់ចំណូលជាប់ពន្ធប្រចាំឆ្នាំ (រៀល)", min: 0, porDefecto: 100000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ganancia <= 0) throw new ErrorEntrada("សូមបញ្ចូលប្រាក់ចំណូលជាប់ពន្ធ។", "ganancia");
    const impuesto = redondear(
      e.tipo === "persona" ? aplicarEscalaMarginal(v["kh.ti-brackets"], e.ganancia) : porcentaje(e.ganancia, enMapa(v["kh.ti-rates"], e.tipo)),
    );
    return { impuesto, despues: redondear(e.ganancia - impuesto), efectiva: (impuesto / e.ganancia) * 100 };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ពន្ធលើប្រាក់ចំណូល", formato: "moneda", destacada: true },
    { clave: "despues", etiqueta: "ចំណូលក្រោយពន្ធ", formato: "moneda" },
    { clave: "efectiva", etiqueta: "អត្រាពន្ធជាក់ស្តែង", formato: "porcentaje", decimales: 1 },
  ],
});
