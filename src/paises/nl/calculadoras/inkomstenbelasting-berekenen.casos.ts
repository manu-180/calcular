import { definirCasos } from "@/motor/calculo";
import calculadora from "./inkomstenbelasting-berekenen";

const VA = "https://www.belastingdienst.nl/wps/wcm/connect/nl/voorlopige-aanslag/content/voorlopige-aanslag-tarieven-en-heffingskortingen" as const;

export default definirCasos(calculadora, [
  {
    nombre: "€ 50.000 loon, geen aftrekposten",
    origen: {
      tipo: "recalculado",
      url: VA,
      detalle:
        "Box 1: 13.900,67 + 11.117 × 37,56% = 4.175,55 → 18.076,22. AHK 3.115 − 6,398% × 20.264 = 1.818,51. AK 5.685 − 6,51% × 4.408 = 5.398,04. Te betalen 10.859,67.",
    },
    fecha: "2026-10-14",
    entrada: { inkomen: 50000, arbeidsinkomen: null, aftrek: 0, jongKind: false, betaald: null },
    esperado: { belasting: 18076.22, ahk: 1818.51, arbeidskorting: 5398.04, teBetalen: 10859.67, tariefsaanpassing: 0 },
  },
  {
    nombre: "€ 100.000 met € 15.000 hypotheekrente: tariefsaanpassing",
    origen: {
      tipo: "recalculado",
      url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/aftrek-en-kortingen/content/afbouw-tarief-aftrekposten-bij-hoog-inkomen",
      detalle:
        "Belastbaar 85.000: 13.900,67 + 14.852,35 + 6.574 × 49,50% = 3.254,13 → 32.007,15. Aftrek in hoogste schijf 15.000 × 11,94% = 1.791. AHK 0. AK 5.685 − 6,51% × 54.408 = 2.143,04. Te betalen 31.655,11; betaald 30.000, dus 1.655,11 bijbetalen.",
    },
    fecha: "2026-10-14",
    entrada: { inkomen: 100000, arbeidsinkomen: null, aftrek: 15000, jongKind: false, betaald: 30000 },
    esperado: { belastbaar: 85000, belasting: 32007.15, tariefsaanpassing: 1791, ahk: 0, arbeidskorting: 2143.04, teBetalen: 31655.11, verschil: 1655.11 },
  },
  {
    nombre: "€ 30.000 met jong kind: kortingen begrensd tot de belasting",
    origen: {
      tipo: "recalculado",
      url: VA,
      detalle: "Box 1 10.725. AHK 3.098,11; AK 5.381,02; IACK 11,45% × 23.761 = 2.720,63. Samen 11.199,77, maar maximaal 10.725. Te betalen 0.",
    },
    fecha: "2026-10-14",
    entrada: { inkomen: 30000, arbeidsinkomen: null, aftrek: 0, jongKind: true, betaald: null },
    esperado: { belasting: 10725, ahk: 3098.11, arbeidskorting: 5381.02, combinatiekorting: 2720.63, kortingen: 10725, teBetalen: 0 },
  },
  {
    nombre: "Inkomen deels zonder arbeid",
    origen: { tipo: "recalculado", detalle: "Inkomen 40.000, arbeidsinkomen 20.000: AK 996 + 31,009% × 8.035 = 3.487,57." },
    fecha: "2026-10-14",
    entrada: { inkomen: 40000, arbeidsinkomen: 20000, aftrek: 0, jongKind: false, betaald: null },
    esperado: { arbeidskorting: 3487.57 },
  },
  {
    nombre: "Aftrekposten hoger dan inkomen",
    origen: { tipo: "recalculado", detalle: "Ongeldige invoer." },
    fecha: "2026-10-14",
    entrada: { inkomen: 10000, arbeidsinkomen: null, aftrek: 20000, jongKind: false, betaald: null },
    esperaError: true,
  },
]);
