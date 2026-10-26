import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { ayAdi, ayBasi, endeksler, oncekiAy, onIkiAylikOrtalama, yillikDegisim } from "../lib/tufe";

export default definirCalculadora({
  id: "tr.kira-artis-orani-hesaplama",
  mercado: "tr",
  concepto: "propio",
  slug: "kira-artis-orani-hesaplama",
  estado: "publicado",
  requiere: { "tr.tufe": "serie" },
  campos: [
    { id: "kira", tipo: "moneda", etiqueta: "Şu anki aylık kira", min: 0, porDefecto: 20000 },
    { id: "tarih", tipo: "fecha", etiqueta: "Kira yenileme tarihi", min: "2005-01-01", porDefecto: "hoy", ayuda: "Kira yılının başladığı gün. Artış, bir önceki ayın TÜFE verisine göre yapılır." },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.kira <= 0) throw new ErrorEntrada("Kira tutarını girin.", "kira");
    const son = valores["tr.tufe"];
    const m = endeksler(son);
    let esas = oncekiAy(ayBasi(entrada.tarih));
    const observaciones: string[] = [];
    if (esas > son.fecha) {
      esas = son.fecha;
      observaciones.push(`Yenileme ayınız için TÜFE henüz açıklanmadı. Hesap, açıklanan son veri olan ${ayAdi(esas)} oranıyla yapıldı.`);
    }
    const oran = redondear(onIkiAylikOrtalama(m, esas, "tarih"));
    const artis = redondear(porcentaje(entrada.kira, oran));
    return {
      yeniKira: redondear(entrada.kira + artis),
      oran,
      artis,
      esasAy: ayAdi(esas),
      yillik: redondear(yillikDegisim(m, esas, "tarih")),
      observaciones,
    };
  },
  resultado: [
    { clave: "yeniKira", etiqueta: "Yasal üst sınıra göre yeni kira", formato: "moneda", destacada: true },
    { clave: "oran", etiqueta: "Kira artış oranı (TÜFE 12 aylık ortalama)", formato: "porcentaje", decimales: 2 },
    { clave: "artis", etiqueta: "Aylık artış tutarı", formato: "moneda" },
    { clave: "esasAy", etiqueta: "Esas alınan TÜFE ayı", formato: "texto" },
    { clave: "yillik", etiqueta: "Aynı ayın yıllık TÜFE değişimi (bilgi için)", formato: "porcentaje", decimales: 2 },
  ],
});
