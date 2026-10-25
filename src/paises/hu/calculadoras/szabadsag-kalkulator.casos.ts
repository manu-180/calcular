import { definirCasos } from "@/motor/calculo";
import szabadsagKalkulator from "./szabadsag-kalkulator";

const MT = "https://njt.jog.gov.hu/jogszabaly/2012-1-00-00";
const ALAP = { ev: 2026, gyerekek: 0, fogyatekos: 0, megvaltozott: false, kezdete: null, vege: null };

export default definirCasos(szabadsagKalkulator, [
  {
    nombre: "36 éves, két gyermek",
    origen: { tipo: "recalculado", url: MT, detalle: "Alap 20 (116. §) + 5 (117. § e), 35 évtől) + 4 (118. § b)) = 29 nap." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, szuletesiEv: 1990, gyerekek: 2 },
    esperado: { osszes: 29, korSzerint: 5, gyermek: 4, eletkor: 36 },
  },
  {
    nombre: "46 éves, három gyermek, egyikük fogyatékos",
    origen: { tipo: "recalculado", url: MT, detalle: "20 + 10 (45 évtől) + 7 (kettőnél több gyermek) + 2 (fogyatékos gyermek) = 39 nap." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, szuletesiEv: 1980, gyerekek: 3, fogyatekos: 1 },
    esperado: { osszes: 39, korSzerint: 10, gyermek: 9 },
  },
  {
    nombre: "Fiatal munkavállaló, idén 18 éves",
    origen: { tipo: "recalculado", url: MT, detalle: "119. § (1): utoljára abban az évben jár, amelyben betölti a 18. életévét; 20 + 5 = 25 nap." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, szuletesiEv: 2008 },
    esperado: { osszes: 25, fiatal: 5, korSzerint: 0 },
  },
  {
    nombre: "25 éves: az első pótnap",
    origen: { tipo: "recalculado", url: MT, detalle: "117. § (2): abban az évben jár először, amelyben betölti a 25. életévét; 20 + 1 = 21 nap." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, szuletesiEv: 2001 },
    esperado: { osszes: 21, korSzerint: 1 },
  },
  {
    nombre: "Július elsején kezdett munkaviszony",
    origen: { tipo: "recalculado", url: MT, detalle: "121. §: 29 × 184 / 365 = 14,6, a fél napot elérő töredék egész nap: 15." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, szuletesiEv: 1990, gyerekek: 2, kezdete: "2026-07-01" },
    esperado: { teljes: 29, aranyos: 15, osszes: 15 },
  },
  {
    nombre: "Megváltozott munkaképesség",
    origen: { tipo: "recalculado", url: MT, detalle: "120. §: évi öt nap pótszabadság; 30 éves: 20 + 2 + 5 = 27." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, szuletesiEv: 1996, megvaltozott: true },
    esperado: { osszes: 27, egyeb: 5, korSzerint: 2 },
  },
]);
