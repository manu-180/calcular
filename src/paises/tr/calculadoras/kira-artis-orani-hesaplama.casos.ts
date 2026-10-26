import { definirCasos } from "@/motor/calculo";
import kiraArtisOraniHesaplama from "./kira-artis-orani-hesaplama";

const TCMB = "https://herkesicin.tcmb.gov.tr/wps/wcm/connect/ekonomi/hie/icerik/enflasyon+hesaplayici";
const TBK = "https://webdosya.csb.gov.tr/db/yerelyonetimler/icerikler/k-ra-artis-orani-hk-20210922094332.pdf";

export default definirCasos(kiraArtisOraniHesaplama, [
  {
    nombre: "Ekim 2026 yenilemesi: %31,49",
    origen: { tipo: "recalculado", url: TBK, detalle: "TBK md. 344: bir önceki kira yılında TÜFE on iki aylık ortalama değişimi. Eylül 2026 endeksleriyle %31,49 (TÜİK bülteniyle aynı); 20.000 × %31,49 = 6.298." },
    fecha: "2026-10-24",
    entrada: { kira: 20000, tarih: "2026-10-15" },
    esperado: { oran: 31.49, artis: 6298, yeniKira: 26298, esasAy: "Eylül 2026", yillik: 29.73 },
  },
  {
    nombre: "Eylül 2026 yenilemesi: %31,79",
    origen: { tipo: "recalculado", url: TCMB, detalle: "Ağustos 2026 endeksleriyle on iki aylık ortalama %31,79." },
    fecha: "2026-10-24",
    entrada: { kira: 20000, tarih: "2026-09-01" },
    esperado: { oran: 31.79, yeniKira: 26358, esasAy: "Ağustos 2026" },
  },
  {
    nombre: "Ocak 2025 yenilemesi: Aralık 2024 oranı %58,51",
    origen: { tipo: "recalculado", url: TCMB, detalle: "Aralık 2024 endeksleriyle on iki aylık ortalama %58,51." },
    fecha: "2026-10-24",
    entrada: { kira: 10000, tarih: "2025-01-10" },
    esperado: { oran: 58.51, yeniKira: 15851 },
  },
  {
    nombre: "Henüz açıklanmamış ay",
    origen: { tipo: "recalculado", url: TCMB, detalle: "Aralık 2026 yenilemesi için Kasım verisi yok; son veri (Eylül 2026) kullanılır." },
    fecha: "2026-10-24",
    entrada: { kira: 20000, tarih: "2026-12-01" },
    esperado: { oran: 31.49, esasAy: "Eylül 2026" },
  },
]);
