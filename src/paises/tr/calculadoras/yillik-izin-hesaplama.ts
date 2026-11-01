import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { sureHesapla, sureMetni } from "../lib/tarih";

export default definirCalculadora({
  id: "tr.yillik-izin-hesaplama",
  mercado: "tr",
  concepto: "vacaciones",
  slug: "yillik-izin-hesaplama",
  estado: "publicado",
  requiere: { "tr.yillik-izin": "mapa" },
  campos: [
    { id: "giris", tipo: "fecha", etiqueta: "İşe giriş tarihi", porDefecto: "2020-03-01" },
    { id: "cikis", tipo: "fecha", etiqueta: "Hesaplama tarihi", porDefecto: "hoy" },
    { id: "yas", tipo: "entero", etiqueta: "Yaşınız", min: 14, max: 100, requerido: false, ayuda: "18 yaş ve altındakiler ile 50 yaş ve üstündekiler en az 20 gün izin alır." },
    { id: "yeralti", tipo: "si-no", etiqueta: "Yer altı işinde çalışıyorum", porDefecto: false },
    { id: "brut", tipo: "moneda", etiqueta: "Aylık brüt ücret (izin ücreti için)", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const sure = sureHesapla(entrada.giris, entrada.cikis);
    const m = valores["tr.yillik-izin"];
    const observaciones: string[] = [];
    let gun = 0;
    if (sure.yil < 1) {
      observaciones.push("Yıllık ücretli izin hakkı işe başladığınız günden itibaren bir yıl doldurunca doğar (deneme süresi dahil).");
    } else {
      gun = sure.yil <= 5 ? enMapa(m, "bir-bes") : sure.yil < 15 ? enMapa(m, "bes-onbes") : enMapa(m, "onbes-ustu");
      const yas = entrada.yas;
      if (yas !== null && (yas <= 18 || yas >= 50)) gun = Math.max(gun, enMapa(m, "yas-siniri"));
      if (entrada.yeralti) gun += enMapa(m, "yeralti-ek");
    }
    if (entrada.brut !== null && entrada.brut < 0) throw new ErrorEntrada("Ücret negatif olamaz.", "brut");
    const izinUcreti = entrada.brut ? redondear((entrada.brut / 30) * gun) : null;
    return {
      gun,
      kidemYili: sure.yil,
      sure: sureMetni(sure),
      izinUcreti,
      observaciones,
    };
  },
  resultado: [
    { clave: "gun", etiqueta: "Yıllık ücretli izin hakkı", formato: "dias", destacada: true },
    { clave: "kidemYili", etiqueta: "Tamamlanan hizmet yılı", formato: "anios" },
    { clave: "sure", etiqueta: "Toplam çalışma süresi", formato: "texto" },
    { clave: "izinUcreti", etiqueta: "İzin ücreti (günlük brüt ücret × izin günü)", formato: "moneda" },
  ],
});
