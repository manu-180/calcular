import { definirCasos } from "@/motor/calculo";
import sapensioShenatani from "./sapensio-shenatani";

const KANONI = "https://site-api.pensions.ge/uploads/docs/legislation/funded-pension-law-2026.pdf";
const SHEMA = "https://site-api.pensions.ge/api/v1/static-page/get?slug=pension-schema";

export default definirCasos(sapensioShenatani, [
  {
    nombre: "1000 ლარი, ფონდის მაგალითი",
    origen: { tipo: "oficial", url: SHEMA, detalle: "20 + 20 + 20 = 60 ლარი თვეში." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 1000, tipi: "dasaqmebuli" },
    esperado: { sul: 60, piradi: 20, damsaqmebeli: 20, sakhelmtsipo: 20, tslshi: 720 },
  },
  {
    nombre: "5000 ლარი, მეორე ზღვარზე",
    origen: { tipo: "recalculado", url: KANONI, detalle: "მუხლი 3.6 „ე“: 60 000 წელიწადში: 480 + 360 = 840, თვეში 70; 100 + 100 + 70 = 270." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 5000, tipi: "dasaqmebuli" },
    esperado: { sul: 270, sakhelmtsipo: 70, tslshi: 3240 },
  },
  {
    nombre: "თვითდასაქმებული",
    origen: { tipo: "recalculado", url: KANONI, detalle: "მუხლი 3.6 „დ“: 1000 × 4% = 40; სახელმწიფო 20." },
    fecha: "2026-11-01",
    entrada: { khelpasi: 1000, tipi: "tvitdasaqmebuli" },
    esperado: { sul: 60, piradi: 40, damsaqmebeli: 0, sakhelmtsipo: 20 },
  },
]);
