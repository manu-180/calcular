import { definirCasos } from "@/motor/calculo";
import calc from "./launareiknivel";

export default definirCasos(calc, [
  {
    nombre: "Dæmi Skattsins: 600.000 kr. laun",
    origen: { tipo: "oficial", url: "https://www.skatturinn.is/media/2026/rsk_0601_1_2026.is.pdf", detalle: "Orðsending 1/2026: 600.000 laun, 24.000 iðgjald, 186.445 skattur, 72.492 afsláttur, 113.953 staðgreiðsla." },
    fecha: "2026-06-15",
    entrada: { laun: 600000, sereign: 0, nyting: 100, felagsgjald: 0 },
    esperado: { lifeyrir: 24000, stofn: 576000, skattur: 186445, stadgreidsla: 113953, utborgad: 462047 },
  },
  {
    nombre: "Öll þrjú þrepin með 2% séreign",
    origen: { tipo: "recalculado", detalle: "Stofn 1.800.000 - 72.000 - 36.000 = 1.692.000. 156.859 + 342.035 + 135.884 = 634.778; - 72.492 = 562.286." },
    fecha: "2026-06-15",
    entrada: { laun: 1800000, sereign: 2, nyting: 100, felagsgjald: 0 },
    esperado: { stofn: 1692000, stadgreidsla: 562286, utborgad: 1129714 },
  },
  {
    nombre: "Undir skattleysismörkum",
    origen: { tipo: "recalculado", detalle: "Stofn 192.000; skattur 60.461 er lægri en afslátturinn: engin staðgreiðsla." },
    fecha: "2026-06-15",
    entrada: { laun: 200000, sereign: 0, nyting: 100, felagsgjald: 0 },
    esperado: { stadgreidsla: 0, utborgad: 192000 },
  },
  {
    nombre: "Laun núll",
    origen: { tipo: "recalculado", detalle: "Ógild innsláttur." },
    fecha: "2026-06-15",
    entrada: { laun: 0, sereign: 0, nyting: 100, felagsgjald: 0 },
    esperaError: true,
  },
]);
