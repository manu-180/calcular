import { definirCasos } from "@/motor/calculo";
import uppsagningstid from "./uppsagningstid";

const LAS = "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-198280-om-anstallningsskydd_sfs-1982-80/";

export default definirCasos(uppsagningstid, [
  {
    nombre: "Ett och ett halvt år: en månad",
    origen: { tipo: "recalculado", url: LAS, detalle: "11 § LAS: minsta uppsägningstid en månad." },
    fecha: "2026-10-24",
    entrada: { anstalld: "2025-04-01", uppsagning: "2026-10-01", vem: "arbetsgivaren" },
    esperado: { manader: 1, ar: 1 },
  },
  {
    nombre: "Exakt fyra år: tre månader",
    origen: { tipo: "recalculado", url: LAS, detalle: "11 § LAS: minst fyra men kortare än sex år ger tre månader." },
    fecha: "2026-10-24",
    entrada: { anstalld: "2022-10-24", uppsagning: "2026-10-24", vem: "arbetsgivaren" },
    esperado: { manader: 3, ar: 4 },
  },
  {
    nombre: "En dag före fyra år: två månader",
    origen: { tipo: "recalculado", url: LAS, detalle: "Anställningstiden är tre hela år, alltså två månader." },
    fecha: "2026-10-24",
    entrada: { anstalld: "2022-10-25", uppsagning: "2026-10-24", vem: "arbetsgivaren" },
    esperado: { manader: 2, ar: 3 },
  },
  {
    nombre: "Tolv år: sex månader",
    origen: { tipo: "recalculado", url: LAS, detalle: "11 § LAS: minst tio år ger sex månader." },
    fecha: "2026-10-24",
    entrada: { anstalld: "2014-05-01", uppsagning: "2026-10-01", vem: "arbetsgivaren" },
    esperado: { manader: 6 },
  },
  {
    nombre: "Arbetstagaren säger upp sig efter tolv år",
    origen: { tipo: "recalculado", url: LAS, detalle: "11 § LAS: för arbetstagaren gäller en månad." },
    fecha: "2026-10-24",
    entrada: { anstalld: "2014-05-01", uppsagning: "2026-10-01", vem: "jag" },
    esperado: { manader: 1 },
  },
  {
    nombre: "Uppsägning före anställningen",
    origen: { tipo: "recalculado", url: LAS, detalle: "Datumen är omkastade." },
    fecha: "2026-10-24",
    entrada: { anstalld: "2026-05-01", uppsagning: "2026-01-01", vem: "jag" },
    esperaError: true,
  },
]);
