import { definirCasos } from "@/motor/calculo";
import kidemTazminatiHesaplama from "./kidem-tazminati-hesaplama";

const SSS = "https://www.csgb.gov.tr/sikca-sorulan-sorular/calisma-genel-mudurlugu/%C4%B1s-kanunu/";
const TAVAN = "https://www.csgb.gov.tr/Media/ydelgoxf/kidem-tazminati-yillar-1980-2026.pdf";

export default definirCasos(kidemTazminatiHesaplama, [
  {
    nombre: "5 yıl 6 ay 15 gün, 50.000 TL",
    origen: { tipo: "recalculado", url: SSS, detalle: "Her yıl için 30 günlük brüt ücret: 50.000 × 5 + 50.000 × 6/12 + 50.000 × 15/365 = 277.054,79; damga binde 7,59 = 2.102,85; net 274.951,94." },
    fecha: "2026-10-24",
    entrada: { giris: "2021-03-01", cikis: "2026-09-16", brut: 50000, ek: null },
    esperado: { brutTazminat: 277054.79, damga: 2102.85, net: 274951.94, sure: "5 yıl 6 ay 15 gün" },
  },
  {
    nombre: "Tavan Temmuz 2026: 120.000 TL ücret, 3 yıl",
    origen: { tipo: "oficial", url: TAVAN, detalle: "01.07.2026 - 31.12.2026 tavanı 73.729,87; 3 × 73.729,87 = 221.189,61; damga 1.678,83." },
    fecha: "2026-10-24",
    entrada: { giris: "2023-10-01", cikis: "2026-10-01", brut: 120000, ek: null },
    esperado: { tavan: 73729.87, esas: 73729.87, brutTazminat: 221189.61, damga: 1678.83 },
  },
  {
    nombre: "Tavan Ocak-Haziran 2026",
    origen: { tipo: "oficial", url: TAVAN, detalle: "01.01.2026 - 30.06.2026 tavanı 64.948,77; 2 yıl: 129.897,54." },
    fecha: "2026-10-24",
    entrada: { giris: "2024-03-15", cikis: "2026-03-15", brut: 100000, ek: 5000 },
    esperado: { tavan: 64948.77, giydirilmis: 105000, brutTazminat: 129897.54 },
  },
  {
    nombre: "Bir yıldan az: tazminat yok",
    origen: { tipo: "recalculado", url: SSS, detalle: "En az bir yıl çalışma şartı (1475 sayılı Kanun md. 14)." },
    fecha: "2026-10-24",
    entrada: { giris: "2026-01-01", cikis: "2026-10-01", brut: 50000, ek: null },
    esperado: { brutTazminat: 0, net: 0 },
  },
  {
    nombre: "Çıkış girişten önce: hata",
    origen: { tipo: "recalculado", url: SSS, detalle: "Tarihler ters." },
    fecha: "2026-10-24",
    entrada: { giris: "2026-05-01", cikis: "2026-01-01", brut: 50000, ek: null },
    esperaError: true,
  },
]);
