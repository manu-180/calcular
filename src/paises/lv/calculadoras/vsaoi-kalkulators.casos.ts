import { definirCasos } from "@/motor/calculo";
import vsaoi from "./vsaoi-kalkulators";

const VID = "https://www.vid.gov.lv/lv/valsts-socialas-apdrosinasanas-obligato-iemaksu-likmes";

export default definirCasos(vsaoi, [
  {
    nombre: "Kopējā likme 34,09%",
    origen: { tipo: "oficial", url: VID, detalle: "VID tabula: 10,50 + 23,59 = 34,09." },
    fecha: "2026-11-01",
    entrada: { alga: 1000, kategorija: "vispariga" },
    esperado: { darbaNemejs: 105, darbaDevejs: 235.9, kopa: 340.9, kopejaLikme: 34.09 },
  },
  {
    nombre: "Pensijas vecums: 30,02%",
    origen: { tipo: "oficial", url: VID, detalle: "VID tabula: 9,25 + 20,77 = 30,02." },
    fecha: "2026-11-01",
    entrada: { alga: 1000, kategorija: "pensijas-vecums" },
    esperado: { kopejaLikme: 30.02, kopa: 300.2 },
  },
  {
    nombre: "Izdienas pensija: 31,70%",
    origen: { tipo: "oficial", url: VID, detalle: "VID tabula: 9,76 + 21,94 = 31,70." },
    fecha: "2026-11-01",
    entrada: { alga: 1000, kategorija: "izdienas" },
    esperado: { kopejaLikme: 31.7, kopa: 317 },
  },
  {
    nombre: "Ienākums virs maksimuma",
    origen: { tipo: "recalculado", url: "https://www.vid.gov.lv/lv/media/2453/download", detalle: "10 000 × 12 = 120 000. Virs 105 300 ir 14 700." },
    fecha: "2026-11-01",
    entrada: { alga: 10000, kategorija: "vispariga" },
    esperado: { virsMaksimuma: 14700 },
  },
]);
