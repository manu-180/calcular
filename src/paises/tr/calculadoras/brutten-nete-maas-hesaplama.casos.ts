import { definirCasos } from "@/motor/calculo";
import bruttenNeteMaasHesaplama from "./brutten-nete-maas-hesaplama";

const CSGB = "https://www.csgb.gov.tr/poco-pages/asgari-ucret/";
const GIB_UCRET = "https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=DUYURU%2FUNIVERSAL%2F2026%2F2026_Ucret_Geliri.pdf";

export default definirCasos(bruttenNeteMaasHesaplama, [
  {
    nombre: "Brüt asgari ücret: net 28.075,50 TL",
    origen: { tipo: "oficial", url: CSGB, detalle: "33.030 - 4.624,20 SGK - 330,30 işsizlik = 28.075,50; gelir ve damga vergisi yok." },
    fecha: "2026-10-24",
    entrada: { brut: 33030, ay: "1" },
    esperado: { net: 28075.5, sgkIsci: 4624.2, issizlikIsci: 330.3, gelirVergisi: 0, damgaVergisi: 0 },
  },
  {
    nombre: "Asgari ücret Temmuz: istisna dilim değiştirir, net aynı",
    origen: { tipo: "recalculado", url: GIB_UCRET, detalle: "Kümülatif 6 × 28.075,50 = 168.453. İstisna: (190.000 - 168.453) × %15 + 6.528,50 × %20 = 4.537,75, hesaplanan vergiye eşit." },
    fecha: "2026-10-24",
    entrada: { brut: 33030, ay: "7" },
    esperado: { net: 28075.5, gvHesaplanan: 4537.75, gvIstisna: 4537.75, gelirVergisi: 0 },
  },
  {
    nombre: "50.000 TL brüt, Ocak",
    origen: { tipo: "recalculado", url: GIB_UCRET, detalle: "SGK 7.000, işsizlik 500, matrah 42.500, vergi %15 = 6.375; istisna 28.075,50 × %15 = 4.211,33; GV 2.163,67; damga (50.000 - 33.030) × binde 7,59 = 128,80; net 40.207,53." },
    fecha: "2026-10-24",
    entrada: { brut: 50000, ay: "1" },
    esperado: { net: 40207.53, gvMatrahi: 42500, gvHesaplanan: 6375, gvIstisna: 4211.33, gelirVergisi: 2163.67, damgaVergisi: 128.8, dilim: 15 },
  },
  {
    nombre: "50.000 TL brüt, Temmuz ve yıllık toplam",
    origen: { tipo: "recalculado", url: GIB_UCRET, detalle: "Kümülatif 255.000 (%20 dilimi): vergi 8.500; istisna 4.537,75; GV 3.962,25; net 38.408,95. On iki ayın net toplamı 466.135,63." },
    fecha: "2026-10-24",
    entrada: { brut: 50000, ay: "7" },
    esperado: { net: 38408.95, gelirVergisi: 3962.25, kumulatif: 255000, yillikNet: 466135.63, ortalamaNet: 38844.64 },
  },
  {
    nombre: "400.000 TL brüt: SGK tavanı",
    origen: { tipo: "recalculado", url: "https://www.sgk.gov.tr/Content/Post/2e0c9e1a-2cfe-4456-af10-49d3de0c58ba/Prime-Esas-Kazanc-Miktarlari-2026-01-14-10-35-39", detalle: "Prim tavanı 297.270: SGK 41.617,80, işsizlik 2.972,70; matrah 355.409,50; vergi 28.500 + 165.409,50 × %20 = 61.581,90; GV 57.370,57; damga 2.785,30; net 295.253,63." },
    fecha: "2026-10-24",
    entrada: { brut: 400000, ay: "1" },
    esperado: { net: 295253.63, sgkIsci: 41617.8, issizlikIsci: 2972.7, gvHesaplanan: 61581.9, damgaVergisi: 2785.3 },
  },
  {
    nombre: "Brüt sıfır hata verir",
    origen: { tipo: "recalculado", url: CSGB, detalle: "Brüt maaş olmadan hesap yapılamaz." },
    fecha: "2026-10-24",
    entrada: { brut: 0, ay: "1" },
    esperaError: true,
  },
]);
