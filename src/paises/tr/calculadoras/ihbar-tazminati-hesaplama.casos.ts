import { definirCasos } from "@/motor/calculo";
import ihbarTazminatiHesaplama from "./ihbar-tazminati-hesaplama";

const IK = "https://www.csgb.gov.tr/Media/crldhi51/4857-say%C4%B1l%C4%B1-i%C5%9F-kanunu.pdf";
const OZELGE = "https://gib.gov.tr/mevzuat/kanun/438/ozelge/23421";

export default definirCasos(ihbarTazminatiHesaplama, [
  {
    nombre: "3 yıldan fazla: 8 hafta",
    origen: { tipo: "recalculado", url: IK, detalle: "Günlük 50.000 / 30 = 1.666,67; 56 gün = 93.333,52; GV %15 = 14.000,03 (GVK md. 61, ücret); damga 708,40; net 78.625,09." },
    fecha: "2026-10-24",
    entrada: { giris: "2023-01-01", cikis: "2026-10-24", brut: 50000, ek: null, kumulatif: null },
    esperado: { hafta: 8, gun: 56, brutTazminat: 93333.52, gelirVergisi: 14000.03, damga: 708.4, net: 78625.09 },
  },
  {
    nombre: "1 yıl, kümülatif matrah 300.000 TL: 4 hafta, %20 dilimi",
    origen: { tipo: "recalculado", url: OZELGE, detalle: "28 gün × 1.666,67 = 46.666,76; GV %20 = 9.333,35; damga 354,20; net 36.979,21." },
    fecha: "2026-10-24",
    entrada: { giris: "2025-10-01", cikis: "2026-10-01", brut: 50000, ek: null, kumulatif: 300000 },
    esperado: { hafta: 4, brutTazminat: 46666.76, gelirVergisi: 9333.35, net: 36979.21 },
  },
  {
    nombre: "Tam 6 ay: 4 hafta",
    origen: { tipo: "recalculado", url: IK, detalle: "Altı aydan az süren işte 2 hafta; altı ay dolunca 4 hafta (md. 17/b)." },
    fecha: "2026-10-24",
    entrada: { giris: "2026-03-01", cikis: "2026-09-01", brut: 33030, ek: null, kumulatif: null },
    esperado: { hafta: 4 },
  },
  {
    nombre: "6 aydan bir gün eksik: 2 hafta",
    origen: { tipo: "recalculado", url: IK, detalle: "İşi altı aydan az sürmüş işçi için iki hafta (md. 17/a)." },
    fecha: "2026-10-24",
    entrada: { giris: "2026-03-02", cikis: "2026-09-01", brut: 33030, ek: null, kumulatif: null },
    esperado: { hafta: 2, gun: 14 },
  },
  {
    nombre: "Tam 3 yıl: 6 hafta",
    origen: { tipo: "recalculado", url: IK, detalle: "Birbuçuk yıldan üç yıla kadar sürmüş işte 6 hafta (md. 17/c)." },
    fecha: "2026-10-24",
    entrada: { giris: "2023-09-01", cikis: "2026-09-01", brut: 33030, ek: null, kumulatif: null },
    esperado: { hafta: 6 },
  },
]);
