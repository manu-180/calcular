import { definirCasos } from "@/motor/calculo";
import { URL_FPA } from "../lib/fuentes-url";
import ypologismosFpa from "./ypologismos-fpa";

export default definirCasos(ypologismosFpa, [
  {
    nombre: "100 € συν ΦΠΑ 19%",
    origen: { tipo: "recalculado", url: URL_FPA, detalle: "Άρθρο 17: 100 × 19% = 19. Σύνολο 119." },
    fecha: "2026-10-26",
    entrada: { poso: 100, syntelestis: "19", kateuthynsi: "xoris" },
    esperado: { fpa: 19, synolo: 119 },
  },
  {
    nombre: "Αφαίρεση ΦΠΑ 19% από 119 €",
    origen: { tipo: "recalculado", url: URL_FPA, detalle: "119 / 1,19 = 100. ΦΠΑ 19." },
    fecha: "2026-10-26",
    entrada: { poso: 119, syntelestis: "19", kateuthynsi: "me" },
    esperado: { kathari: 100, fpa: 19 },
  },
  {
    nombre: "Μειωμένος 9%: 250 €",
    origen: { tipo: "recalculado", url: URL_FPA, detalle: "Άρθρο 18Α: 250 × 9% = 22,50." },
    fecha: "2026-10-26",
    entrada: { poso: 250, syntelestis: "9", kateuthynsi: "xoris" },
    esperado: { fpa: 22.5, synolo: 272.5 },
  },
  {
    nombre: "Μειωμένος 3%: αφαίρεση από 51,50 €",
    origen: { tipo: "recalculado", url: URL_FPA, detalle: "Άρθρο 18Β: 51,50 / 1,03 = 50. ΦΠΑ 1,50." },
    fecha: "2026-10-26",
    entrada: { poso: 51.5, syntelestis: "3", kateuthynsi: "me" },
    esperado: { kathari: 50, fpa: 1.5 },
  },
]);
