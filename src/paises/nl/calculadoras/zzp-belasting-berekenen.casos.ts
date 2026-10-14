import { definirCasos } from "@/motor/calculo";
import calculadora from "./zzp-belasting-berekenen";

const ZA = "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/veranderingen-inkomstenbelasting-2026/ondernemersaftrek-2026/zelfstandigenaftrek-2026" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Zzp'er met € 50.000 winst",
    origen: {
      tipo: "recalculado",
      url: ZA,
      detalle:
        "Zelfstandigenaftrek 1.200; mkb 12,7% × 48.800 = 6.197,60; belastbare winst 42.602,40. Box 1 15.297,68; AHK 2.291,81; AK (arbeidsinkomen 50.000) 5.398,04; IB 7.607,83. Zvw 4,85% × 42.602,40 = 2.066,22. Samen 9.674,05.",
    },
    fecha: "2026-10-14",
    entrada: { winst: 50000, urencriterium: true, starter: false, loon: 0 },
    esperado: { zelfstandigenaftrek: 1200, mkb: 6197.6, belastbareWinst: 42602.4, ahk: 2291.81, arbeidskorting: 5398.04, inkomstenbelasting: 7607.83, zvw: 2066.22, totaal: 9674.05, netto: 40325.95 },
  },
  {
    nombre: "€ 120.000 winst: tariefsaanpassing en maximum Zvw",
    origen: {
      tipo: "recalculado",
      url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/afbouw-tarief-aftrekposten-bij-hoog-inkomen",
      detalle:
        "Aftrek 1.200 + mkb 15.087,60 = 16.287,60, allemaal in de hoogste schijf: × 11,94% = 1.944,74. Belastbare winst 103.712,40. IB 42.373,49. Zvw over maximaal 79.409: 3.851,34.",
    },
    fecha: "2026-10-14",
    entrada: { winst: 120000, urencriterium: true, starter: false, loon: 0 },
    esperado: { tariefsaanpassing: 1944.74, belastbareWinst: 103712.4, inkomstenbelasting: 42373.49, zvw: 3851.34, totaal: 46224.83 },
  },
  {
    nombre: "Starter met € 30.000 winst",
    origen: { tipo: "recalculado", url: ZA, detalle: "1.200 + 2.123 = 3.323 ondernemersaftrek; mkb 12,7% × 26.677 = 3.387,98; belastbaar 23.289,02. Kortingen dekken de belasting: IB 0. Zvw 1.129,52." },
    fecha: "2026-10-14",
    entrada: { winst: 30000, urencriterium: true, starter: true, loon: 0 },
    esperado: { startersaftrek: 2123, mkb: 3387.98, belastbareWinst: 23289.02, inkomstenbelasting: 0, zvw: 1129.52 },
  },
  {
    nombre: "Bijverdienste naast loon, zonder urencriterium",
    origen: { tipo: "recalculado", detalle: "Geen zelfstandigenaftrek; mkb 12,7% × 20.000 = 2.540. Zvw over 17.460 (ruimte 79.409 − 40.000) = 846,81." },
    fecha: "2026-10-14",
    entrada: { winst: 20000, urencriterium: false, starter: false, loon: 40000 },
    esperado: { zelfstandigenaftrek: 0, mkb: 2540, belastbareWinst: 17460, zvw: 846.81, inkomstenbelasting: 14789.94 },
  },
  {
    nombre: "Startersaftrek zonder urencriterium kan niet",
    origen: { tipo: "recalculado", url: ZA, detalle: "De startersaftrek verhoogt de zelfstandigenaftrek, die het urencriterium vraagt." },
    fecha: "2026-10-14",
    entrada: { winst: 30000, urencriterium: false, starter: true, loon: 0 },
    esperaError: true,
  },
]);
