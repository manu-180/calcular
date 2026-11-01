import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: el kurs oficial del Markaziy bank (cbu.uz) no se pudo leer desde fuera de Uzbekistán. Cuando
// el cron lo traiga como serie, esta calculadora pasa a requerirla y se publica.
export default definirCalculadora({
  id: "uz.valyuta-kalkulyatori",
  mercado: "uz",
  concepto: "tipo-de-cambio",
  slug: "valyuta-kalkulyatori",
  estado: "borrador",
  requiere: {
    "uz.kurs-usd": "numero",
  },
  campos: [
    {
      id: "yonalish",
      tipo: "opcion",
      etiqueta: "Nimani hisoblaysiz?",
      opciones: [
        { valor: "usd-som", etiqueta: "Dollar → soʻm" },
        { valor: "som-usd", etiqueta: "Soʻm → dollar" },
      ],
      porDefecto: "usd-som",
    },
    { id: "summa", tipo: "numero", etiqueta: "Summa", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Summani kiriting.", "summa");
    const kurs = v["uz.kurs-usd"];
    const natija = e.yonalish === "usd-som" ? redondear(e.summa * kurs) : Math.round((e.summa / kurs) * 100) / 100;
    return { natija, kurs };
  },
  resultado: [
    { clave: "natija", etiqueta: "Natija", formato: "numero", decimales: 2, destacada: true },
    { clave: "kurs", etiqueta: "Markaziy bank kursi (1 AQSh dollari)", formato: "moneda", decimales: 2 },
  ],
});
