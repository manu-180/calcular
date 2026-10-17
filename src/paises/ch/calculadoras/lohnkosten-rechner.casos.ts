import { definirCasos } from "@/motor/calculo";
import lohnkostenRechner from "./lohnkosten-rechner";

const AHV = "https://www.ahv-iv.ch/p/2.01.d";

export default definirCasos(lohnkostenRechner, [
  {
    nombre: "6500 Franken mit FAK 1,5 % und BU 0,5 %",
    origen: {
      tipo: "recalculado",
      url: AHV,
      detalle:
        "AHV/IV/EO 344,50; ALV 71,50; FAK 97,50; BU 32,50; BVG die Hälfte von 10 % auf 58 040 = 2902 / 12 = 241,83. Beiträge 787,83, Lohnkosten 7287,83. Jahr: 84 500 + 4478,50 + 929,50 + 1267,50 + 422,50 + 2901,96 = 94 499,96.",
    },
    fecha: "2026-10-14",
    entrada: { monatslohn: 6500, anzahl: "13", alter: 35, fak: 1.5, bu: 0.5, ktg: null, bvgMonat: null },
    esperado: { ahv: 344.5, alv: 71.5, fak: 97.5, bu: 32.5, bvg: 241.83, beitraege: 787.83, kostenMonat: 7287.83, kostenJahr: 94499.96, zuschlag: 12.12046154 },
    tolerancia: 0.01,
  },
  {
    nombre: "Ohne FAK und BU",
    origen: { tipo: "recalculado", url: AHV, detalle: "344,50 + 71,50 + 241,83 = 657,83; Lohnkosten 7157,83." },
    fecha: "2026-10-14",
    entrada: { monatslohn: 6500, anzahl: "13", alter: 35, fak: null, bu: null, ktg: null, bvgMonat: null },
    esperado: { beitraege: 657.83, kostenMonat: 7157.83 },
  },
  {
    nombre: "BVG-Beitrag aus dem Reglement",
    origen: { tipo: "recalculado", url: AHV, detalle: "AHV 212; ALV 44; BVG 250 wie eingegeben. Beiträge 506, Lohnkosten 4506." },
    fecha: "2026-10-14",
    entrada: { monatslohn: 4000, anzahl: "12", alter: 45, fak: null, bu: null, ktg: null, bvgMonat: 250 },
    esperado: { ahv: 212, alv: 44, bvg: 250, beitraege: 506, kostenMonat: 4506 },
  },
]);
