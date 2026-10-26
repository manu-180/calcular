import { definirCasos } from "@/motor/calculo";
import ypologismosYperorion from "./ypologismos-yperorion";

const HLI = "https://www.hli.gov.gr/ergasiakes-scheseis/nomothesia-ergasiakes-scheseis/amoivi/ypervasi-chronikon-orion-amoivi/yperoria-2/";

export default definirCasos(ypologismosYperorion, [
  {
    nombre: "Ωρομίσθιο 8 €: 5 υπερεργασίας, 3 νόμιμες, 2 μη νόμιμες",
    origen: { tipo: "recalculado", url: HLI, detalle: "5 × 9,60 = 48. 3 × 11,20 = 33,60. 2 × 17,60 = 35,20. Σύνολο 116,80, προσαυξήσεις 116,80 − 80 = 36,80." },
    fecha: "2026-10-24",
    entrada: { oromisthio: 8, yperergasia: 5, nomimi: 3, meAdeia: 0, paranomi: 2 },
    esperado: { yperergasia: 48, nomimi: 33.6, paranomi: 35.2, synolo: 116.8, prosafxisi: 36.8 },
  },
  {
    nombre: "Υπερωρία με άδεια πέρα από το όριο: +60%",
    origen: { tipo: "oficial", url: HLI, detalle: "Άρθρο 58 ν. 4808/2021: ωρομίσθιο προσαυξημένο κατά 60%. 4 × 10 × 1,6 = 64." },
    fecha: "2026-10-24",
    entrada: { oromisthio: 10, yperergasia: 0, nomimi: 0, meAdeia: 4, paranomi: 0 },
    esperado: { meAdeia: 64, synolo: 64 },
  },
  {
    nombre: "Χωρίς ωρομίσθιο",
    origen: { tipo: "recalculado", url: HLI, detalle: "Χωρίς ωρομίσθιο δεν υπάρχει υπολογισμός." },
    fecha: "2026-10-24",
    entrada: { oromisthio: 0, yperergasia: 5, nomimi: 0, meAdeia: 0, paranomi: 0 },
    esperaError: true,
  },
]);
