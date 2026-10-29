import { definirCasos } from "@/motor/calculo";
import calculadora from "./vakantiedagen-berekenen";

const VAC = "https://www.dna.sr/media/egnb5dhm/vakantiewet.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Eerste volle kalenderjaar",
    origen: { tipo: "oficial", url: VAC, detalle: "Artikel 7 lid 1 Vacantiewet 1975: twaalf werkdagen na een kalenderjaar onafgebroken in dienst." },
    fecha: "2026-10-27",
    entrada: { situatie: "volle-jaren", jaren: 1, maanden: null },
    esperado: { dagen: 12, maximum: 18 },
  },
  {
    nombre: "Drie volle kalenderjaren",
    origen: { tipo: "recalculado", url: VAC, detalle: "12 + 2 × 2 = 16." },
    fecha: "2026-10-27",
    entrada: { situatie: "volle-jaren", jaren: 3, maanden: null },
    esperado: { dagen: 16 },
  },
  {
    nombre: "Tien jaar: maximum",
    origen: { tipo: "recalculado", url: VAC, detalle: "12 + 2 × 9 = 30, maar het maximum is achttien werkdagen." },
    fecha: "2026-10-27",
    entrada: { situatie: "volle-jaren", jaren: 10, maanden: null },
    esperado: { dagen: 18 },
  },
  {
    nombre: "Zeven maanden in het eerste jaar",
    origen: { tipo: "oficial", url: VAC, detalle: "Artikel 7 lid 3: een werkdag per volle maand diensttijd." },
    fecha: "2026-10-27",
    entrada: { situatie: "eerste-jaar", jaren: null, maanden: 7 },
    esperado: { dagen: 7 },
  },
]);
