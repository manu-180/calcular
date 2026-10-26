import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tr.emlak-vergisi-hesaplama",
  mercado: "tr",
  concepto: "propio",
  slug: "emlak-vergisi-hesaplama",
  estado: "publicado",
  requiere: {
    "tr.emlak-vergisi": "mapa",
    "tr.emlak-buyuksehir-artis": "numero",
  },
  campos: [
    { id: "deger", tipo: "moneda", etiqueta: "Emlak vergisi değeri", min: 0, porDefecto: 2000000, ayuda: "Belediyenin bildirdiği vergi değeri. Satış bedeli değil." },
    { id: "tur", tipo: "opcion-dato", dato: "tr.emlak-vergisi", etiqueta: "Taşınmazın türü", porDefecto: "mesken" },
    { id: "buyuksehir", tipo: "si-no", etiqueta: "Büyükşehir belediyesi sınırları içinde", porDefecto: true },
    { id: "hisse", tipo: "porcentaje", etiqueta: "Hisse oranınız", min: 0, max: 100, porDefecto: 100, ayuda: "Taşınmaz ortaksa hissenizi yazın. Vergi hisseye göre bölünür." },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.deger <= 0) throw new ErrorEntrada("Emlak vergisi değerini girin.", "deger");
    if (entrada.hisse <= 0 || entrada.hisse > 100) throw new ErrorEntrada("Hisse oranı 0 ile 100 arasında olmalı.", "hisse");
    const temel = enMapa(valores["tr.emlak-vergisi"], entrada.tur);
    const oran = entrada.buyuksehir ? temel + porcentaje(temel, valores["tr.emlak-buyuksehir-artis"]) : temel;
    const yillik = redondear(porcentaje(porcentaje(entrada.deger, oran), entrada.hisse));
    return { yillik, taksit: redondear(yillik / 2), oranBinde: oran * 10 };
  },
  resultado: [
    { clave: "yillik", etiqueta: "Yıllık emlak vergisi", formato: "moneda", destacada: true },
    { clave: "taksit", etiqueta: "Her bir taksit (iki eşit taksit)", formato: "moneda" },
    { clave: "oranBinde", etiqueta: "Uygulanan oran (binde)", formato: "numero", decimales: 0 },
  ],
});
