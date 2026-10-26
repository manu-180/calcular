import { definirCasos } from "@/motor/calculo";
import apozimiosiApolysis from "./apozimiosi-apolysis";

const HLI = "https://www.hli.gov.gr/ergasiakes-scheseis/nomothesia-ergasiakes-scheseis/atomikes-symvaseis/symvasi-aoristou-chronou/apozimiosi-apolysis/";

export default definirCasos(apozimiosiApolysis, [
  {
    nombre: "1.500 €, 5 έτη, χωρίς προειδοποίηση",
    origen: { tipo: "recalculado", url: HLI, detalle: "4 έως 6 έτη: 3 μισθοί. Μισθός 1500 × 7/6 = 1750. 3 × 1750 = 5250." },
    fecha: "2026-10-24",
    entrada: { miktos: 1500, eti: 5, proeidopoiisi: false, eti2012: 0 },
    esperado: { mines: 3, vasi: 1750, apozimiosi: 5250, proeidopoiisiMines: 3 },
  },
  {
    nombre: "Με προειδοποίηση: η μισή",
    origen: { tipo: "recalculado", url: HLI, detalle: "5250 / 2 = 2625." },
    fecha: "2026-10-24",
    entrada: { miktos: 1500, eti: 5, proeidopoiisi: true, eti2012: 0 },
    esperado: { apozimiosi: 2625 },
  },
  {
    nombre: "12.000 €, 20 έτη: όριο 240 κατώτατα ημερομίσθια",
    origen: { tipo: "recalculado", url: HLI, detalle: "Όριο 8 × 30 × 41,09 = 9861,60, × 7/6 = 11505,20. 16 έτη και άνω: 12 μισθοί = 138062,40." },
    fecha: "2026-10-24",
    entrada: { miktos: 12000, eti: 20, proeidopoiisi: false, eti2012: 0 },
    esperado: { vasi: 11505.2, mines: 12, apozimiosi: 138062.4 },
  },
  {
    nombre: "20 έτη στις 12.11.2012: 4 επιπλέον μισθοί έως 2.000 €",
    origen: { tipo: "recalculado", url: HLI, detalle: "Κλίμακα 12 × 2500 × 7/6 = 35000. Επιπλέον για 17, 18, 19 και 20 έτη: 4 × 2000 × 7/6 = 9333,33. Σύνολο 44333,33." },
    fecha: "2026-10-24",
    entrada: { miktos: 2500, eti: 30, proeidopoiisi: false, eti2012: 20 },
    esperado: { kanoniki: 35000, minesMetavatikis: 4, metavatiki: 9333.33, apozimiosi: 44333.33 },
  },
  {
    nombre: "Λιγότερο από ένα έτος: χωρίς αποζημίωση",
    origen: { tipo: "oficial", url: HLI, detalle: "Σύμβαση κάτω του έτους: χωρίς υποχρέωση αποζημίωσης." },
    fecha: "2026-10-24",
    entrada: { miktos: 1500, eti: 0, proeidopoiisi: false, eti2012: 0 },
    esperado: { apozimiosi: 0, mines: 0 },
  },
  {
    nombre: "Έτη του 2012 περισσότερα από τα συνολικά",
    origen: { tipo: "recalculado", url: HLI, detalle: "Τα έτη στις 12.11.2012 είναι μέρος των συνολικών." },
    fecha: "2026-10-24",
    entrada: { miktos: 2500, eti: 30, proeidopoiisi: true, eti2012: 40 },
    esperaError: true,
  },
]);
