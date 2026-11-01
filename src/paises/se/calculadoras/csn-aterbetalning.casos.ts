import { definirCasos } from "@/motor/calculo";
import csnAterbetalning from "./csn-aterbetalning";

const LAG = "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/studiestodslag-19991395_sfs-1999-1395/";

export default definirCasos(csnAterbetalning, [
  {
    nombre: "250 000 kr, börjar betala det år man fyller 26",
    origen: {
      tipo: "recalculado",
      url: LAG,
      detalle:
        "4 kap. 4 och 8 §§: 25 år, årsbeloppet ökar 2 % per år. Ränta 2,135 %. Första årsbeloppet 250 000 × (0,02135 − 0,02) / (1 − (1,02 / 1,02135)^25) = 10 376,43 kr.",
    },
    fecha: "2026-10-24",
    entrada: { skuld: 250000, alder: 26 },
    esperado: { arsbelopp: 10376.43, perManad: 864.7, ar: 25, avgift: 150 },
    tolerancia: 0.02,
  },
  {
    nombre: "Börjar betala det år man fyller 50: 15 år",
    origen: { tipo: "recalculado", url: LAG, detalle: "Återbetalningstiden slutar det år man fyller 64: 15 år. Första årsbeloppet 17 180,56 kr." },
    fecha: "2026-10-24",
    entrada: { skuld: 250000, alder: 50 },
    esperado: { ar: 15, arsbelopp: 17180.56 },
    tolerancia: 0.02,
  },
  {
    nombre: "Liten skuld: lägsta årsbelopp",
    origen: { tipo: "recalculado", url: LAG, detalle: "4 kap. 10 §: årsbeloppet blir minst 15 % av prisbasbeloppet, 0,15 × 59 200 = 8 880 kr. Tiden förkortas till 8 år." },
    fecha: "2026-10-24",
    entrada: { skuld: 60000, alder: 26 },
    esperado: { arsbelopp: 8880, ar: 8 },
  },
  {
    nombre: "Ingen skuld",
    origen: { tipo: "recalculado", url: LAG, detalle: "Utan skuld finns inget att betala." },
    fecha: "2026-10-24",
    entrada: { skuld: 0, alder: 30 },
    esperaError: true,
  },
]);
