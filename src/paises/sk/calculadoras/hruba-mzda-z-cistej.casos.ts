import { definirCasos } from "@/motor/calculo";
import hrubaMzdaZCistej from "./hruba-mzda-z-cistej";

const FS = "https://podpora.financnasprava.sk/418585-V%C3%BDpo%C4%8Det-preddavkov-na-da%C5%88---sadzba-dane?r=1";

export default definirCasos(hrubaMzdaZCistej, [
  {
    nombre: "Čistá 1 342,52 eura zodpovedá hrubej asi 1 800 eur",
    origen: { tipo: "recalculado", url: FS, detalle: "Opačný postup k výpočtu čistej mzdy: 1 800 − 169,20 − 90 − 198,28 = 1 342,52. Pre zaokrúhľovanie odvodov nadol dá rovnakú čistú sumu aj o niekoľko centov nižšia hrubá mzda." },
    fecha: "2026-06-15",
    entrada: { cista: 1342.52, nczd: true, detiDo15: 0, deti15az18: 0 },
    esperado: { hruba: 1800, cistaOverenie: 1342.52 },
    tolerancia: 0.5,
  },
  {
    nombre: "Čistá 728,90 eura zodpovedá minimálnej mzde",
    origen: { tipo: "recalculado", url: FS, detalle: "915 − 86,01 − 45,75 − 54,34 = 728,90; najnižšia hrubá mzda s touto čistou sumou je 914,95." },
    fecha: "2026-06-15",
    entrada: { cista: 728.9, nczd: true, detiDo15: 0, deti15az18: 0 },
    esperado: { hruba: 914.95, cistaOverenie: 728.9 },
  },
]);
