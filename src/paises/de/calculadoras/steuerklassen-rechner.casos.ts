import { definirCasos } from "@/motor/calculo";
import steuerklassenRechner from "./steuerklassen-rechner";

export default definirCasos(steuerklassenRechner, [
  {
    nombre: "Alleinverdiener mit 4000 Euro: III/V schlägt IV/IV",
    origen: {
      tipo: "recalculado",
      url: "https://www.bmf-steuerrechner.de/interface/2026Version1.xhtml?code=LSt2026ext&LZZ=2&RE4=400000&STKL=3&KVZ=2.90&PVZ=1",
      detalle: "Lohnsteuer laut BMF für 4000 Euro: Klasse III 201,83; IV 524,50; V 944,91. Sozialabgaben je 870. Netto: III 2928,17; IV 2605,50; V 2185,09. Partner B ohne Gehalt.",
    },
    fecha: "2026-10-14",
    entrada: { bruttoA: 4000, bruttoB: 0, kinderfreibetraege: "0", kinder: "kinderlos", bundesland: "nw", kirche: false },
    esperado: { dreiFuenf: 2928.17, vierVier: 2605.5, fuenfDrei: 2185.09, vorteil: 322.67, empfehlung: "III für Partner A, V für Partner B" },
  },
  {
    nombre: "Minijob-Gehalt beim Partner wird abgewiesen",
    origen: { tipo: "recalculado", detalle: "400 Euro liegen unter der Geringfügigkeitsgrenze von 603 Euro." },
    fecha: "2026-10-14",
    entrada: { bruttoA: 4000, bruttoB: 400, kinderfreibetraege: "0", kinder: "kinderlos", bundesland: "nw", kirche: false },
    esperaError: true,
  },
]);
