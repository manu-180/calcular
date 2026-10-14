import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

export default definirCasos(iva, [
  {
    nombre: "Aggiungere l'IVA ordinaria a 100 euro",
    origen: { tipo: "recalculado", detalle: "100 × 22% = 22; totale 122." },
    fecha: "2026-10-14",
    entrada: { operazione: "aggiungi", importo: 100, aliquota: "ordinaria" },
    esperado: { imponibile: 100, iva: 22, totale: 122, aliquota: 22 },
  },
  {
    nombre: "Scorporare l'IVA al 22% da 1.000 euro",
    origen: { tipo: "recalculado", detalle: "1.000 / 1,22 = 819,67; IVA 180,33." },
    fecha: "2026-10-14",
    entrada: { operazione: "scorpora", importo: 1000, aliquota: "ordinaria" },
    esperado: { imponibile: 819.67, iva: 180.33, totale: 1000 },
  },
  {
    nombre: "Aliquota ridotta del 10% su 250 euro",
    origen: { tipo: "recalculado", detalle: "250 × 10% = 25; totale 275." },
    fecha: "2026-10-14",
    entrada: { operazione: "aggiungi", importo: 250, aliquota: "ridotta-10" },
    esperado: { iva: 25, totale: 275, aliquota: 10 },
  },
  {
    nombre: "Scorporo al 4% da 104 euro",
    origen: { tipo: "recalculado", detalle: "104 / 1,04 = 100; IVA 4." },
    fecha: "2026-10-14",
    entrada: { operazione: "scorpora", importo: 104, aliquota: "minima-4" },
    esperado: { imponibile: 100, iva: 4 },
  },
  {
    nombre: "Aliquota del 5% su 80 euro",
    origen: { tipo: "recalculado", detalle: "80 × 5% = 4; totale 84." },
    fecha: "2026-10-14",
    entrada: { operazione: "aggiungi", importo: 80, aliquota: "ridotta-5" },
    esperado: { iva: 4, totale: 84 },
  },
  {
    nombre: "Aliquota che non esiste",
    origen: { tipo: "recalculado", detalle: "Una chiave fuori dalla tabella dà errore." },
    fecha: "2026-10-14",
    entrada: { operazione: "aggiungi", importo: 80, aliquota: "inventata" },
    esperaError: true,
  },
]);
