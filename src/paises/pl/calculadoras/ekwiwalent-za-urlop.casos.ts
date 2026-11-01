import { definirCasos } from "@/motor/calculo";
import ekwiwalentZaUrlop from "./ekwiwalent-za-urlop";

const ROZP = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970020014";

export default definirCasos(ekwiwalentZaUrlop, [
  {
    nombre: "5 dni urlopu w 2026 r. przy 6000 zł",
    origen: {
      tipo: "recalculado",
      url: ROZP,
      detalle: "§ 18 i 19: współczynnik 2026 = 251 / 12 = 20,92; za dzień 6000 / 20,9167 = 286,85; za godzinę 35,86; 40 godzin = 1434,40.",
    },
    fecha: "2026-10-24",
    entrada: { wynagrodzenie: 6000, dni: 5, data: "2026-10-31", etat: 1 },
    esperado: { zaDzien: 286.85, zaGodzine: 35.86, godziny: 40, ekwiwalent: 1434.4 },
  },
  {
    nombre: "Pół etatu, 10 dni urlopu, 3000 zł",
    origen: {
      tipo: "recalculado",
      url: ROZP,
      detalle: "§ 19 ust. 3: współczynnik 20,9167 × 0,5 = 10,4583; za dzień 286,85; za godzinę 35,86; 80 godzin = 2868,80.",
    },
    fecha: "2026-10-24",
    entrada: { wynagrodzenie: 3000, dni: 10, data: "2026-06-30", etat: 0.5 },
    esperado: { zaDzien: 286.85, ekwiwalent: 2868.8 },
  },
]);
