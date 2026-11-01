import { definirCasos } from "@/motor/calculo";
import kontantstotte from "./kontantstotte";

const NAV = "https://www.nav.no/kontantstotte";

export default definirCasos(kontantstotte, [
  {
    nombre: "Uten barnehageplass i 7 måneder",
    origen: { tipo: "oficial", url: NAV, detalle: "Nav: 100 % gir 7 500 kr i måneden; 7 måneder = 52 500." },
    fecha: "2026-10-24",
    entrada: { barnehage: "ingen", maneder: 7 },
    esperado: { perManed: 7500, totalt: 52500 },
  },
  {
    nombre: "17 til 24 timer i barnehage",
    origen: { tipo: "oficial", url: NAV, detalle: "Nav-tabellen: 40 % gir 3 000 kr i måneden." },
    fecha: "2026-10-24",
    entrada: { barnehage: "t24", maneder: 7 },
    esperado: { perManed: 3000, totalt: 21000 },
  },
  {
    nombre: "33 timer eller mer",
    origen: { tipo: "oficial", url: NAV, detalle: "Ingen kontantstøtte med 33 timer eller mer." },
    fecha: "2026-10-24",
    entrada: { barnehage: "t33", maneder: 7 },
    esperado: { perManed: 0 },
  },
  {
    nombre: "Flere måneder enn loven gir",
    origen: { tipo: "oficial", url: NAV, detalle: "Høyst 7 måneder." },
    fecha: "2026-10-24",
    entrada: { barnehage: "ingen", maneder: 9 },
    esperaError: true,
  },
]);
