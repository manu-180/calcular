import { definirCasos } from "@/motor/calculo";
import imeresAdeias from "./imeres-adeias";

const HLI = "https://www.hli.gov.gr/ergasiakes-scheseis/nomothesia-ergasiakes-scheseis/adeies-ergasiakes-scheseis/etisia-kanoniki-adeia/imeres-adeias/";

export default definirCasos(imeresAdeias, [
  {
    nombre: "Πενθήμερο, πρώτο έτος, 6 μήνες",
    origen: { tipo: "recalculado", url: HLI, detalle: "20 ημέρες για 12 μήνες: 20 × 6 / 12 = 10." },
    fecha: "2026-10-24",
    entrada: { evdomada: "5", etos: "1", mines: 6, etiIdiou: 0, etiSynolika: 0 },
    esperado: { imeres: 10 },
  },
  {
    nombre: "Εξαήμερο, δεύτερο έτος",
    origen: { tipo: "oficial", url: HLI, detalle: "Επαυξάνεται κατά μία ημέρα: 24 + 1 = 25." },
    fecha: "2026-10-24",
    entrada: { evdomada: "6", etos: "2", mines: null, etiIdiou: 1, etiSynolika: 5 },
    esperado: { imeres: 25 },
  },
  {
    nombre: "Πενθήμερο, τρίτο έτος, χωρίς προϋπηρεσία",
    origen: { tipo: "oficial", url: HLI, detalle: "Μέχρι 22 εργάσιμες στο πενθήμερο." },
    fecha: "2026-10-24",
    entrada: { evdomada: "5", etos: "3", mines: null, etiIdiou: 3, etiSynolika: 3 },
    esperado: { imeres: 22 },
  },
  {
    nombre: "12 έτη σε οποιονδήποτε εργοδότη: 25 ημέρες",
    origen: { tipo: "oficial", url: HLI, detalle: "ΕΓΣΣΕ 23/05/2000: 25 ή 30 ημέρες με 10 έτη στον ίδιο ή 12 σε οποιονδήποτε." },
    fecha: "2026-10-24",
    entrada: { evdomada: "5", etos: "3", mines: null, etiIdiou: 3, etiSynolika: 12 },
    esperado: { imeres: 25 },
  },
  {
    nombre: "Εξαήμερο με 26 έτη: 31 ημέρες",
    origen: { tipo: "oficial", url: HLI, detalle: "ΕΓΣΣΕ 02/04/2008: 31 εργάσιμες στο εξαήμερο μετά από 25 έτη." },
    fecha: "2026-10-24",
    entrada: { evdomada: "6", etos: "3", mines: null, etiIdiou: 20, etiSynolika: 26 },
    esperado: { imeres: 31 },
  },
  {
    nombre: "Συνολικά έτη λιγότερα από τα έτη στον εργοδότη",
    origen: { tipo: "recalculado", url: HLI, detalle: "Τα συνολικά έτη περιλαμβάνουν τον τωρινό εργοδότη." },
    fecha: "2026-10-24",
    entrada: { evdomada: "5", etos: "3", mines: null, etiIdiou: 8, etiSynolika: 5 },
    esperaError: true,
  },
]);
