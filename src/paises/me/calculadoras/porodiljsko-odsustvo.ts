import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: el art. 51 del Zakon o socijalnoj i dječjoj zaštiti se leyó solo en un texto de 2022. Ver INFORME.
export default definirCalculadora({
  id: "me.porodiljsko-odsustvo",
  mercado: "me",
  concepto: "propio",
  slug: "porodiljsko-odsustvo",
  estado: "borrador",
  requiere: {
    "me.porodiljsko-dani": "numero",
    "me.porodiljsko-staz-12": "numero",
    "me.porodiljsko-gornja-granica": "numero",
    "me.prosjecna-bruto-2025": "numero",
  },
  campos: [
    { id: "zarada", tipo: "moneda", etiqueta: "Prosječna mjesečna zarada u poslednjih 12 mjeseci", min: 0, porDefecto: 1000 },
    { id: "mjeseci", tipo: "entero", etiqueta: "Mjeseci odsustva", min: 1, max: 14, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarada <= 0) throw new ErrorEntrada("Unesite zaradu veću od nule.", "zarada");
    const granica = v["me.porodiljsko-gornja-granica"] * v["me.prosjecna-bruto-2025"];
    const mjesecno = redondear((Math.min(e.zarada, granica) * v["me.porodiljsko-staz-12"]) / 100);
    return { mjesecno, ukupno: redondear(mjesecno * e.mjeseci), granica, obavezno: v["me.porodiljsko-dani"] };
  },
  resultado: [
    { clave: "mjesecno", etiqueta: "Mjesečna naknada", formato: "moneda", destacada: true },
    { clave: "ukupno", etiqueta: "Za cijelo odsustvo", formato: "moneda" },
    { clave: "granica", etiqueta: "Gornja granica", formato: "moneda" },
    { clave: "obavezno", etiqueta: "Obavezno porodiljsko odsustvo", formato: "dias" },
  ],
});
