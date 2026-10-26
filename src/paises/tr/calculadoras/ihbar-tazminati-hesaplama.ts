import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { vergi } from "../lib/bordro";
import { sureHesapla, sureMetni, type Sure } from "../lib/tarih";

function ihbarAnahtari(s: Sure): string {
  if (s.toplamAy < 6) return "alti-ay-alti";
  if (s.toplamAy < 18 || (s.toplamAy === 18 && s.gun === 0)) return "alti-ay-bucuk-yil";
  if (s.toplamAy < 36 || (s.toplamAy === 36 && s.gun === 0)) return "bucuk-yil-uc-yil";
  return "uc-yil-ustu";
}

export default definirCalculadora({
  id: "tr.ihbar-tazminati-hesaplama",
  mercado: "tr",
  concepto: "preaviso",
  slug: "ihbar-tazminati-hesaplama",
  estado: "publicado",
  requiere: {
    "tr.ihbar-sureleri": "mapa",
    "tr.gv-tarife-ucret": "escala",
    "tr.damga-oranlari": "mapa",
  },
  campos: [
    { id: "giris", tipo: "fecha", etiqueta: "İşe giriş tarihi", porDefecto: "2023-01-01" },
    { id: "cikis", tipo: "fecha", etiqueta: "İşten çıkış (bildirim) tarihi", porDefecto: "hoy" },
    { id: "brut", tipo: "moneda", etiqueta: "Son aylık brüt ücret", min: 0, porDefecto: 50000 },
    { id: "ek", tipo: "moneda", etiqueta: "Düzenli ek ödemeler (aylık brüt)", min: 0, requerido: false, ayuda: "Yol, yemek gibi her ay ödenen tutarlar ihbar tazminatına da eklenir." },
    {
      id: "kumulatif",
      tipo: "moneda",
      etiqueta: "Yıl içindeki kümülatif gelir vergisi matrahı",
      min: 0,
      requerido: false,
      ayuda: "Son bordronuzda yazar. Boş bırakırsanız sıfır kabul edilir; o zaman vergi en düşük dilimden başlar.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Son brüt ücreti girin.", "brut");
    const sure = sureHesapla(entrada.giris, entrada.cikis);
    const hafta = enMapa(valores["tr.ihbar-sureleri"], ihbarAnahtari(sure));
    const giydirilmis = redondear(entrada.brut + (entrada.ek ?? 0));
    const gunluk = redondear(giydirilmis / 30);
    const brutTazminat = redondear(gunluk * hafta * 7);
    const kum = entrada.kumulatif ?? 0;
    const tarife = valores["tr.gv-tarife-ucret"];
    const gelirVergisi = redondear(vergi(tarife, kum + brutTazminat) - vergi(tarife, kum));
    const damga = redondear(porcentaje(brutTazminat, enMapa(valores["tr.damga-oranlari"], "ucret")));
    return {
      net: redondear(brutTazminat - gelirVergisi - damga),
      brutTazminat,
      hafta,
      gun: hafta * 7,
      sure: sureMetni(sure),
      gunluk,
      gelirVergisi,
      damga,
      observaciones: ["İhbar tazminatından SGK primi kesilmez; gelir vergisi ve damga vergisi kesilir."],
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Net ihbar tazminatı", formato: "moneda", destacada: true },
    { clave: "brutTazminat", etiqueta: "Brüt ihbar tazminatı", formato: "moneda" },
    { clave: "hafta", etiqueta: "İhbar süresi", formato: "semanas" },
    { clave: "gun", etiqueta: "İhbar süresi (gün)", formato: "dias" },
    { clave: "sure", etiqueta: "Çalışma süresi", formato: "texto" },
    { clave: "gunluk", etiqueta: "Günlük giydirilmiş brüt ücret", formato: "moneda" },
    { clave: "gelirVergisi", etiqueta: "Gelir vergisi", formato: "moneda" },
    { clave: "damga", etiqueta: "Damga vergisi", formato: "moneda" },
  ],
});
