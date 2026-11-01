import { definirCasos } from "@/motor/calculo";
import vypocetCistejMzdy from "./vypocet-cistej-mzdy";

const FS = "https://podpora.financnasprava.sk/418585-V%C3%BDpo%C4%8Det-preddavkov-na-da%C5%88---sadzba-dane?r=1";

export default definirCasos(vypocetCistejMzdy, [
  {
    nombre: "1 800 eur v hrubom bez detí",
    origen: { tipo: "recalculado", url: FS, detalle: "Sociálne 9,4 % = 169,20; zdravotné 5 % = 90; zdaniteľná 1 540,80; mínus 497,23 = 1 043,57; daň 19 % = 198,28; čistá 1 342,52." },
    fecha: "2026-06-15",
    entrada: { hruba: 1800, nczd: true, detiDo15: 0, deti15az18: 0 },
    esperado: { cista: 1342.52, socialne: 169.2, zdravotne: 90, dan: 198.28, cena: 2451.6 },
  },
  {
    nombre: "Minimálna mzda 915 eur a dve deti do 15 rokov",
    origen: { tipo: "recalculado", url: FS, detalle: "Odvody 86,01 + 45,75; zdaniteľná 783,24; základ 286,01; daň 54,34; bonus 200 (limit 36 % je 281,97); čistá 928,90." },
    fecha: "2026-06-15",
    entrada: { hruba: 915, nczd: true, detiDo15: 2, deti15az18: 0 },
    esperado: { cista: 928.9, dan: 54.34, bonus: 200 },
  },
  {
    nombre: "8 000 eur: tri pásma dane a nad nimi 35 %",
    origen: { tipo: "recalculado", url: FS, detalle: "Odvody 752 + 400; základ 6 350,77; daň 696,4032 + 340,955 + 366,528 + 34,9685 = 1 438,85; čistá 5 409,15." },
    fecha: "2026-06-15",
    entrada: { hruba: 8000, nczd: true, detiDo15: 0, deti15az18: 0 },
    esperado: { cista: 5409.15, dan: 1438.85 },
  },
  {
    nombre: "20 000 eur: strop sociálneho poistenia",
    origen: { tipo: "oficial", url: "https://www.socpoist.sk/socialne-poistenie/platenie-poistneho/tabulky-platenia-poistneho/tabulky-platenia-poistneho-od-1-6", detalle: "Z maximálneho základu 16 764 eur platí zamestnanec 1 575,81 eura." },
    fecha: "2026-06-15",
    entrada: { hruba: 20000, nczd: true, detiDo15: 0, deti15az18: 0 },
    esperado: { socialne: 1575.81, zdravotne: 1000 },
  },
  {
    nombre: "Nulová mzda je chyba",
    origen: { tipo: "recalculado", url: FS, detalle: "Hrubá mzda musí byť vyššia ako nula." },
    fecha: "2026-06-15",
    entrada: { hruba: 0, nczd: true, detiDo15: 0, deti15az18: 0 },
    esperaError: true,
  },
]);
