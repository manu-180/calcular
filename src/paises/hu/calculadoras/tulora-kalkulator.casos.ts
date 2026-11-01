import { definirCasos } from "@/motor/calculo";
import tuloraKalkulator from "./tulora-kalkulator";

const MT = "https://njt.jog.gov.hu/jogszabaly/2012-1-00-00";

export default definirCasos(tuloraKalkulator, [
  {
    nombre: "Havibér 500 000 Ft, 10 túlóra munkanapon",
    origen: { tipo: "recalculado", url: MT, detalle: "139. § (3): 500 000 / 174 = 2873,56 Ft/óra; × 10 = 28 736; 143. § (2): 50% = 14 368; összesen 43 104." },
    fecha: "2026-10-24",
    entrada: { berTipus: "havi", ber: 500000, orak: 10, mikor: "munkanap" },
    esperado: { alapdij: 28736, potlek: 14368, osszes: 43104, oraber: 2874 },
  },
  {
    nombre: "Órabér 2000 Ft, 8 óra munkaszüneti napon",
    origen: { tipo: "recalculado", url: MT, detalle: "143. § (5): 100% pótlék; 8 × 2000 = 16 000 + 16 000 = 32 000." },
    fecha: "2026-10-24",
    entrada: { berTipus: "orai", ber: 2000, orak: 8, mikor: "munkaszuneti" },
    esperado: { potlekSzazalek: 100, osszes: 32000 },
  },
  {
    nombre: "Heti pihenőnap másik pihenőnappal",
    origen: { tipo: "recalculado", url: MT, detalle: "143. § (4): ha másik pihenőnapot kapsz, 50%; 6 × 2500 = 15 000 + 7500 = 22 500." },
    fecha: "2026-10-24",
    entrada: { berTipus: "orai", ber: 2500, orak: 6, mikor: "pihenonap-masik" },
    esperado: { potlekSzazalek: 50, osszes: 22500 },
  },
]);
