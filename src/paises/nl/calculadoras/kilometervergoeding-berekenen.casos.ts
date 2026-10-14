import { definirCasos } from "@/motor/calculo";
import calculadora from "./kilometervergoeding-berekenen";

const LH = "https://download.belastingdienst.nl/belastingdienst/docs/bijlage-nieuwsbrief-loonheffingen-2026-lh2091b63fd.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "20 km, 3 dagen, 46 weken",
    origen: { tipo: "oficial", url: LH, detalle: "Tabel 13: € 0,23 per km. 20 × 2 × 3 × 46 = 5.520 km; × 0,23 = 1.269,60." },
    fecha: "2026-10-14",
    entrada: { afstand: 20, dagen: 3, weken: 46, tarief: null },
    esperado: { kmPerJaar: 5520, onbelast: 1269.6, perMaand: 105.8, belast: 0 },
  },
  {
    nombre: "€ 0,30 per km: deel belast",
    origen: { tipo: "recalculado", detalle: "10 × 2 × 5 × 46 = 4.600 km. Vergoeding 1.380, onbelast 1.058, belast 322." },
    fecha: "2026-10-14",
    entrada: { afstand: 10, dagen: 5, weken: 46, tarief: 0.3 },
    esperado: { vergoeding: 1380, onbelast: 1058, belast: 322 },
  },
  {
    nombre: "Geen afstand",
    origen: { tipo: "recalculado", detalle: "Ongeldige invoer." },
    fecha: "2026-10-14",
    entrada: { afstand: 0, dagen: 3, weken: 46, tarief: null },
    esperaError: true,
  },
]);
