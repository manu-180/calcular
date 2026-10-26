import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uz.aylanma-soligi-kalkulyatori",
  mercado: "uz",
  concepto: "regimen-simplificado",
  slug: "aylanma-soligi-kalkulyatori",
  estado: "publicado",
  requiere: {
    "uz.aylanma-soligi": "mapa",
    "uz.aylanma-chegarasi": "numero",
  },
  campos: [
    { id: "aylanma", tipo: "moneda", etiqueta: "Davr uchun tushum (aylanma)", min: 0, porDefecto: 50000000 },
    { id: "faoliyat", tipo: "opcion-dato", dato: "uz.aylanma-soligi", etiqueta: "Faoliyat turi va joyi", porDefecto: "umumiy" },
    { id: "yillik", tipo: "moneda", etiqueta: "Yil boshidan jami daromad (chegarani tekshirish uchun, ixtiyoriy)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.aylanma <= 0) throw new ErrorEntrada("Tushum summasini kiriting.", "aylanma");
    const stavka = enMapa(v["uz.aylanma-soligi"], e.faoliyat);
    const soliq = redondear(porcentaje(e.aylanma, stavka));
    const chegara = v["uz.aylanma-chegarasi"];
    const observaciones: string[] = [];
    if (e.yillik !== null && e.yillik > chegara) {
      observaciones.push("Yillik daromad chegaradan oshdi. Bunday daromadda aylanmadan olinadigan soliq toʻlovchisi hisoblanmaysiz (Soliq kodeksi, 461-modda), soliqlar umumiy tartibda toʻlanadi.");
    }
    return { soliq, stavka, qoladi: e.aylanma - soliq, chegara, observaciones };
  },
  resultado: [
    { clave: "soliq", etiqueta: "Aylanmadan olinadigan soliq", formato: "moneda", decimales: 0, destacada: true },
    { clave: "stavka", etiqueta: "Soliq stavkasi", formato: "porcentaje" },
    { clave: "qoladi", etiqueta: "Soliqdan keyin qoladigan tushum", formato: "moneda", decimales: 0 },
    { clave: "chegara", etiqueta: "Yillik daromad chegarasi", formato: "moneda", decimales: 0 },
  ],
});
