import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uz.daromad-soligi-kalkulyatori",
  mercado: "uz",
  concepto: "impuesto-renta",
  slug: "daromad-soligi-kalkulyatori",
  estado: "publicado",
  requiere: {
    "uz.jshds": "mapa",
  },
  campos: [
    { id: "daromad", tipo: "moneda", etiqueta: "Daromad summasi", min: 0, porDefecto: 10000000 },
    { id: "turi", tipo: "opcion-dato", dato: "uz.jshds", etiqueta: "Daromad turi va soliq maqomingiz", porDefecto: "rezident-mehnat" },
  ],
  calcular(e, v, { redondear }) {
    if (e.daromad <= 0) throw new ErrorEntrada("Daromad summasini kiriting.", "daromad");
    const stavka = enMapa(v["uz.jshds"], e.turi);
    const soliq = redondear(porcentaje(e.daromad, stavka));
    const observaciones: string[] = [];
    if (e.turi === "rezident-dividend" || e.turi === "norezident-dividend") {
      observaciones.push("Banklardagi omonatlar boʻyicha foizlar jismoniy shaxslar uchun soliqqa tortilmaydi (Soliq kodeksi, 378-modda).");
    }
    return { soliq, stavka, qoladi: e.daromad - soliq, observaciones };
  },
  resultado: [
    { clave: "soliq", etiqueta: "Daromad soligʻi", formato: "moneda", decimales: 0, destacada: true },
    { clave: "stavka", etiqueta: "Soliq stavkasi", formato: "porcentaje" },
    { clave: "qoladi", etiqueta: "Soliqdan keyin qoladigan summa", formato: "moneda", decimales: 0 },
  ],
});
