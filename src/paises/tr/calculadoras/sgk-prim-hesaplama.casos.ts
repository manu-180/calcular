import { definirCasos } from "@/motor/calculo";
import sgkPrimHesaplama from "./sgk-prim-hesaplama";

const SGK = "https://www.sgk.gov.tr/Content/Post/c7812ea8-5087-413f-aeb5-d3c1d153e11a/Isveren-Prim-Oranlari-2026-01-13-04-52-38";

export default definirCasos(sgkPrimHesaplama, [
  {
    nombre: "Asgari ücret, 2 puan indirim",
    origen: { tipo: "oficial", url: "https://www.csgb.gov.tr/poco-pages/asgari-ucret/", detalle: "İşçi 4.624,20 + 330,30; işveren 6.523,43 + 660,60." },
    fecha: "2026-10-24",
    entrada: { brut: 33030, tesvik: "diger" },
    esperado: { isciToplam: 4954.5, isverenToplam: 7184.03, genelToplam: 12138.53, isciMyo: 2972.7, isciGss: 1651.5, isverenMyo: 3303 },
  },
  {
    nombre: "100.000 TL, indirimsiz: toplam %38,75",
    origen: { tipo: "recalculado", url: SGK, detalle: "İşçi %15 = 15.000, işveren %23,75 = 23.750, toplam 38.750." },
    fecha: "2026-10-24",
    entrada: { brut: 100000, tesvik: "yok" },
    esperado: { isciToplam: 15000, isverenToplam: 23750, genelToplam: 38750, isverenKvsk: 2250 },
  },
]);
