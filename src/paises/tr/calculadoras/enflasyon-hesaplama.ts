import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { ayAdi, ayBasi, endeks, endeksler, yillikDegisim } from "../lib/tufe";

export default definirCalculadora({
  id: "tr.enflasyon-hesaplama",
  mercado: "tr",
  concepto: "inflacion",
  slug: "enflasyon-hesaplama",
  estado: "publicado",
  requiere: { "tr.tufe": "serie" },
  campos: [
    { id: "tutar", tipo: "moneda", etiqueta: "Tutar (TL)", min: 0, porDefecto: 10000 },
    { id: "baslangic", tipo: "fecha", etiqueta: "Tutarın ait olduğu ay", min: "2003-01-01", porDefecto: "2020-01-01", ayuda: "O ayın TÜFE endeksi kullanılır; gün önemli değildir." },
    { id: "bitis", tipo: "fecha", etiqueta: "Güncellemek istediğiniz ay", min: "2003-01-01", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.tutar <= 0) throw new ErrorEntrada("Tutarı girin.", "tutar");
    const son = valores["tr.tufe"];
    const m = endeksler(son);
    const observaciones: string[] = [];
    let bas = ayBasi(entrada.baslangic);
    let bit = ayBasi(entrada.bitis);
    if (bit > son.fecha) {
      bit = son.fecha;
      observaciones.push(`Seçtiğiniz ay için TÜFE henüz açıklanmadı. Açıklanan son ay kullanıldı: ${ayAdi(bit)}.`);
    }
    if (bas > son.fecha) bas = son.fecha;
    if (bas > bit) throw new ErrorEntrada("Başlangıç ayı, güncellemek istediğiniz aydan sonra olamaz.", "baslangic");
    const eBas = endeks(m, bas, "baslangic");
    const eBit = endeks(m, bit, "bitis");
    const katsayi = eBit / eBas;
    return {
      guncel: redondear(entrada.tutar * katsayi),
      fark: redondear(entrada.tutar * katsayi - entrada.tutar),
      alimGucu: redondear(entrada.tutar / katsayi),
      toplam: (katsayi - 1) * 100,
      yillik: yillikDegisim(m, bit, "bitis"),
      basAy: ayAdi(bas),
      bitAy: ayAdi(bit),
      eBas,
      eBit,
      observaciones,
    };
  },
  resultado: [
    { clave: "guncel", etiqueta: "Bugünkü değeri (aynı alım gücü)", formato: "moneda", destacada: true },
    { clave: "fark", etiqueta: "Enflasyon nedeniyle artış", formato: "moneda" },
    { clave: "toplam", etiqueta: "Dönemdeki toplam enflasyon", formato: "porcentaje", decimales: 2 },
    { clave: "alimGucu", etiqueta: "Tutarın başlangıç ayı fiyatlarıyla alım gücü", formato: "moneda" },
    { clave: "yillik", etiqueta: "Son ayın yıllık TÜFE değişimi", formato: "porcentaje", decimales: 2 },
    { clave: "basAy", etiqueta: "Başlangıç ayı", formato: "texto" },
    { clave: "eBas", etiqueta: "Başlangıç ayı TÜFE endeksi (2003=100)", formato: "numero", decimales: 2 },
    { clave: "bitAy", etiqueta: "Bitiş ayı", formato: "texto" },
    { clave: "eBit", etiqueta: "Bitiş ayı TÜFE endeksi (2003=100)", formato: "numero", decimales: 2 },
  ],
});
