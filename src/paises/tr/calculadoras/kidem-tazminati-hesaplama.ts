import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { kidemTavaniTarihte, sureHesapla, sureMetni } from "../lib/tarih";

export default definirCalculadora({
  id: "tr.kidem-tazminati-hesaplama",
  mercado: "tr",
  concepto: "indemnizacion-despido",
  slug: "kidem-tazminati-hesaplama",
  estado: "publicado",
  requiere: {
    "tr.kidem-tavan": "numero",
    "tr.kidem-gun": "numero",
    "tr.damga-oranlari": "mapa",
  },
  campos: [
    { id: "giris", tipo: "fecha", etiqueta: "İşe giriş tarihi", porDefecto: "2020-03-01" },
    { id: "cikis", tipo: "fecha", etiqueta: "İşten çıkış tarihi", porDefecto: "hoy" },
    { id: "brut", tipo: "moneda", etiqueta: "Son aylık brüt ücret", min: 0, porDefecto: 50000 },
    {
      id: "ek",
      tipo: "moneda",
      etiqueta: "Düzenli ek ödemeler (aylık brüt)",
      min: 0,
      requerido: false,
      ayuda: "Yol, yemek, düzenli ikramiye ve prim gibi her ay ödenen tutarlar. Kıdem tazminatı bu ödemeler eklenmiş (giydirilmiş) ücretle hesaplanır.",
    },
  ],
  calcular(entrada, valores, { redondear, fecha }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Son brüt ücreti girin.", "brut");
    const sure = sureHesapla(entrada.giris, entrada.cikis);
    const tavan = kidemTavaniTarihte(entrada.cikis, valores["tr.kidem-tavan"], fecha);
    const giydirilmis = redondear(entrada.brut + (entrada.ek ?? 0));
    const yillikTutar = redondear((giydirilmis * valores["tr.kidem-gun"]) / 30);
    const esas = Math.min(yillikTutar, tavan);
    const observaciones: string[] = [];
    if (sure.yil < 1) {
      observaciones.push("Kıdem tazminatı için aynı işverende en az bir yıl çalışmış olmak gerekir.");
    }
    if (yillikTutar > tavan) observaciones.push("Ücretiniz kıdem tazminatı tavanını aştığı için hesap tavan üzerinden yapıldı.");
    const brutTazminat = sure.yil < 1 ? 0 : redondear(esas * sure.yil + (esas * sure.ay) / 12 + (esas * sure.gun) / 365);
    const damga = redondear(porcentaje(brutTazminat, enMapa(valores["tr.damga-oranlari"], "ucret")));
    return {
      net: redondear(brutTazminat - damga),
      brutTazminat,
      damga,
      sure: sureMetni(sure),
      giydirilmis,
      tavan,
      esas,
      observaciones,
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Net kıdem tazminatı", formato: "moneda", destacada: true },
    { clave: "brutTazminat", etiqueta: "Brüt kıdem tazminatı", formato: "moneda" },
    { clave: "damga", etiqueta: "Damga vergisi", formato: "moneda" },
    { clave: "sure", etiqueta: "Çalışma süresi", formato: "texto" },
    { clave: "giydirilmis", etiqueta: "Giydirilmiş brüt ücret", formato: "moneda" },
    { clave: "tavan", etiqueta: "Çıkış tarihindeki kıdem tavanı", formato: "moneda" },
    { clave: "esas", etiqueta: "Bir yıl için esas alınan tutar", formato: "moneda" },
  ],
});
