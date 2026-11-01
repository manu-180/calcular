import { definirCasos } from "@/motor/calculo";
import calc from "./otroski-dodatek";

export default definirCasos(calc, [
  { nombre: "Peti razred, dva otroka", origen: { tipo: "oficial", url: "https://www.gov.si/teme/otroski-dodatek/", detalle: "Preglednica gov.si: 62,06 + 72,42" }, fecha: "2026-10-31", entrada: { dohodek: 700, srednjesolci: 0, osnovnosolci: 2 }, esperado: { skupaj: 134.48, razred: 5 } },
  { nombre: "Sedmi razred, srednješolec", origen: { tipo: "oficial", url: "https://www.gov.si/teme/otroski-dodatek/", detalle: "Preglednica za srednjo šolo: 37,25" }, fecha: "2026-10-31", entrada: { dohodek: 900, srednjesolci: 1, osnovnosolci: 0 }, esperado: { skupaj: 37.25 } },
  { nombre: "Nad mejo", origen: { tipo: "recalculado", detalle: "Nad 1328,28 ni zneska" }, fecha: "2026-10-31", entrada: { dohodek: 2000, srednjesolci: 0, osnovnosolci: 1 }, esperado: { skupaj: 0 } },
]);
