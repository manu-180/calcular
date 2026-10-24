import { definirCasos } from "@/motor/calculo";
import nettenBruteMaasHesaplama from "./netten-brute-maas-hesaplama";

const CSGB = "https://www.csgb.gov.tr/poco-pages/asgari-ucret/";
const GIB_UCRET = "https://cdn.gib.gov.tr/api/gibportal-file/file/getFile?objectKey=DUYURU%2FUNIVERSAL%2F2026%2F2026_Ucret_Geliri.pdf";

export default definirCasos(nettenBruteMaasHesaplama, [
  {
    nombre: "Net asgari ücretten brüte",
    origen: { tipo: "oficial", url: CSGB, detalle: "Net 28.075,50 TL, brüt 33.030 TL." },
    fecha: "2026-10-24",
    entrada: { net: 28075.5, ay: "1" },
    esperado: { brut: 33030, net: 28075.5 },
  },
  {
    nombre: "Net 40.207,53 TL Ocak: brüt 50.000 TL",
    origen: { tipo: "recalculado", url: GIB_UCRET, detalle: "Brütten nete hesabının tersi: 50.000 TL brütün Ocak neti 40.207,53 TL." },
    fecha: "2026-10-24",
    entrada: { net: 40207.53, ay: "1" },
    esperado: { brut: 50000, gelirVergisi: 2163.67, damgaVergisi: 128.8 },
  },
  {
    nombre: "Net 38.408,95 TL Temmuz: brüt 50.000 TL",
    origen: { tipo: "recalculado", url: GIB_UCRET, detalle: "Temmuz ayında kümülatif matrah %20 dilimine girdiği için aynı brüt 38.408,95 TL net verir." },
    fecha: "2026-10-24",
    entrada: { net: 38408.95, ay: "7" },
    esperado: { brut: 50000, dilim: 20 },
  },
  {
    nombre: "Net sıfır hata verir",
    origen: { tipo: "recalculado", url: CSGB, detalle: "Net maaş olmadan hesap yapılamaz." },
    fecha: "2026-10-24",
    entrada: { net: 0, ay: "1" },
    esperaError: true,
  },
]);
