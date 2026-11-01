import { definirCasos } from "@/motor/calculo";
import aroghjutyanApahovagravchar from "./aroghjutyan-apahovagravchar";

const LEY = "https://www.arlis.am/hy/acts/218650/latest";

export default definirCasos(aroghjutyanApahovagravchar, [
  {
    nombre: "300 000 դրամ՝ 2026",
    origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 46 մաս 9 կետ 1: մինչև 500 000 դրամ՝ 4800 դրամ։ մաս 17: պետությունը՝ 6000 դրամ." },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 300000 },
    esperado: { vchar: 4800, petutyun: 6000, tarekan: 57600 },
  },
  {
    nombre: "500 001 դրամ՝ 2026",
    origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 46 մաս 9 կետ 2: ամսական դրույքաչափի 100 տոկոսը՝ 10 800 դրամ." },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 500001 },
    esperado: { vchar: 10800, petutyun: 0 },
  },
  {
    nombre: "150 000 դրամ՝ 2026",
    origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 45 մաս 1 կետ 6: մինչև 200 000 դրամ աշխատավարձի դեպքում՝ 2027-ից." },
    fecha: "2026-11-01",
    entrada: { ashkhatavardz: 150000 },
    esperado: { vchar: 0 },
  },
  {
    nombre: "150 000 դրամ՝ 2027",
    origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 13 մաս 1, հոդված 14 մաս 3: 10 800 դրամ." },
    fecha: "2027-01-01",
    entrada: { ashkhatavardz: 150000 },
    esperado: { vchar: 10800, tarekan: 129600 },
  },
]);
