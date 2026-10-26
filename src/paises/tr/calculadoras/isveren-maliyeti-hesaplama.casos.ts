import { definirCasos } from "@/motor/calculo";
import isverenMaliyetiHesaplama from "./isveren-maliyeti-hesaplama";

const CSGB = "https://www.csgb.gov.tr/poco-pages/asgari-ucret/";

export default definirCasos(isverenMaliyetiHesaplama, [
  {
    nombre: "Asgari ücret, imalat dışı (2 puan indirim)",
    origen: { tipo: "oficial", url: CSGB, detalle: "33.030 + SGK %19,75 = 6.523,43 + işsizlik %2 = 660,60; toplam 40.214,03." },
    fecha: "2026-10-24",
    entrada: { brut: 33030, tesvik: "diger" },
    esperado: { toplam: 40214.03, sgkIsveren: 6523.43, issizlikIsveren: 660.6, sgkOrani: 19.75 },
  },
  {
    nombre: "Asgari ücret, imalat (5 puan indirim)",
    origen: { tipo: "oficial", url: CSGB, detalle: "33.030 + SGK %16,75 = 5.532,53 + 660,60; toplam 39.223,13." },
    fecha: "2026-10-24",
    entrada: { brut: 33030, tesvik: "imalat" },
    esperado: { toplam: 39223.13, sgkIsveren: 5532.53 },
  },
  {
    nombre: "Asgari ücret, indirimsiz",
    origen: { tipo: "oficial", url: CSGB, detalle: "33.030 + SGK %21,75 = 7.184,03 + 660,60; toplam 40.874,63." },
    fecha: "2026-10-24",
    entrada: { brut: 33030, tesvik: "yok" },
    esperado: { toplam: 40874.63, sgkIsveren: 7184.03, tesvik: 0 },
  },
  {
    nombre: "Tavanın üstünde maaş",
    origen: { tipo: "recalculado", url: "https://www.sgk.gov.tr/Content/Post/2e0c9e1a-2cfe-4456-af10-49d3de0c58ba/Prime-Esas-Kazanc-Miktarlari-2026-01-14-10-35-39", detalle: "Primler 297.270 üzerinden: SGK %19,75 = 58.710,83, işsizlik %2 = 5.945,40; toplam 400.000 + 64.656,23 = 464.656,23." },
    fecha: "2026-10-24",
    entrada: { brut: 400000, tesvik: "diger" },
    esperado: { toplam: 464656.23, issizlikIsveren: 5945.4 },
  },
]);
