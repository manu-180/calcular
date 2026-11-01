import { definirCasos } from "@/motor/calculo";
import nychteriniErgasiaKyriaki from "./nychterini-ergasia-kyriaki";

const HLI_NYCHTA = "https://www.hli.gov.gr/ergasiakes-scheseis/nomothesia-ergasiakes-scheseis/amoivi/nychterina-amoivi/amoivi-nychterinis-ergasias-2/";
const HLI_KYRIAKI = "https://www.hli.gov.gr/ergasiakes-scheseis/nomothesia-ergasiakes-scheseis/amoivi/kyriaki-argies-amoivi/amoivi-gia-apascholisi-kata-kyriaki-i-imera-argias-2/";

export default definirCasos(nychteriniErgasiaKyriaki, [
  {
    nombre: "Ωρομίσθιο 8 €: 16 νυχτερινές ώρες και 8 ώρες Κυριακής",
    origen: { tipo: "recalculado", url: HLI_NYCHTA, detalle: "Νύχτα 16 × 8 × 25% = 32. Κυριακή 8 × 8 × 75% = 48. Σύνολο 80." },
    fecha: "2026-10-24",
    entrada: { oromisthio: 8, oresNychtas: 16, oresKyriakis: 8 },
    esperado: { prosafxisiNychtas: 32, prosafxisiKyriakis: 48, prosafxiseis: 80, amoiviNychtas: 160, amoiviKyriakis: 112 },
  },
  {
    nombre: "Μόνο Κυριακή: 6 ώρες με 10 €",
    origen: { tipo: "oficial", url: HLI_KYRIAKI, detalle: "Προσαύξηση 75% επί του νόμιμου ωρομισθίου: 6 × 7,50 = 45." },
    fecha: "2026-10-24",
    entrada: { oromisthio: 10, oresNychtas: 0, oresKyriakis: 6 },
    esperado: { prosafxiseis: 45 },
  },
  {
    nombre: "Αρνητικές ώρες",
    origen: { tipo: "recalculado", url: HLI_NYCHTA, detalle: "Οι ώρες δεν μπορεί να είναι αρνητικές." },
    fecha: "2026-10-24",
    entrada: { oromisthio: 8, oresNychtas: -2, oresKyriakis: 0 },
    esperaError: true,
  },
]);
