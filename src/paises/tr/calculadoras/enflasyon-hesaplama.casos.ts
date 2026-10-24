import { definirCasos } from "@/motor/calculo";
import enflasyonHesaplama from "./enflasyon-hesaplama";

const TCMB = "https://herkesicin.tcmb.gov.tr/wps/wcm/connect/ekonomi/hie/icerik/enflasyon+hesaplayici";

export default definirCasos(enflasyonHesaplama, [
  {
    nombre: "10.000 TL: Ocak 2020 ile Eylül 2026 arası",
    origen: { tipo: "oficial", url: TCMB, detalle: "TCMB enflasyon hesaplayıcı: 10.000 TL → 97.846,34 TL, toplam değişim %878,46 (endeks 446,45 → 4.368,35)." },
    fecha: "2026-10-24",
    entrada: { tutar: 10000, baslangic: "2020-01-01", bitis: "2026-09-30" },
    esperado: { guncel: 97846.34, eBas: 446.45, eBit: 4368.35 },
  },
  {
    nombre: "Eylül 2025 ile Eylül 2026 arası: yıllık %29,73",
    origen: { tipo: "oficial", url: TCMB, detalle: "TÜİK Eylül 2026 yıllık TÜFE %29,73; 10.000 TL → 12.973,16 TL." },
    fecha: "2026-10-24",
    entrada: { tutar: 10000, baslangic: "2025-09-01", bitis: "2026-09-01" },
    esperado: { guncel: 12973.16 },
  },
  {
    nombre: "Açıklanmamış ay: son veri kullanılır",
    origen: { tipo: "recalculado", url: TCMB, detalle: "Ekim 2026 verisi henüz yok; Eylül 2026 endeksi kullanılır." },
    fecha: "2026-10-24",
    entrada: { tutar: 10000, baslangic: "2025-09-01", bitis: "2026-10-24" },
    esperado: { guncel: 12973.16, bitAy: "Eylül 2026" },
  },
  {
    nombre: "Başlangıç bitişten sonra: hata",
    origen: { tipo: "recalculado", url: TCMB, detalle: "Tarihler ters." },
    fecha: "2026-10-24",
    entrada: { tutar: 10000, baslangic: "2026-05-01", bitis: "2025-01-01" },
    esperaError: true,
  },
]);
