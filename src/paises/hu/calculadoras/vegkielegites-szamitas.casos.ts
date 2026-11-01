import { definirCasos } from "@/motor/calculo";
import vegkielegitesSzamitas from "./vegkielegites-szamitas";

const MT = "https://njt.jog.gov.hu/jogszabaly/2012-1-00-00";
const ALAP = { megszunes: "felmondas", magatartas: false, nyugdijas: false, nyugdijElott: false } as const;

export default definirCasos(vegkielegitesSzamitas, [
  {
    nombre: "12 év, munkáltatói felmondás",
    origen: { tipo: "recalculado", url: MT, detalle: "77. § (3) c): legalább tíz év, háromhavi távolléti díj; 3 × 600 000 = 1 800 000." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, tavolletiDij: 600000, evek: 12 },
    esperado: { honapok: 3, osszeg: 1800000 },
  },
  {
    nombre: "12 év, a nyugdíjkorhatár előtti öt évben",
    origen: { tipo: "recalculado", url: MT, detalle: "77. § (4): a c) és d) sávban kéthavi emelés; 5 × 600 000 = 3 000 000." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, tavolletiDij: 600000, evek: 12, nyugdijElott: true },
    esperado: { honapok: 5, emeles: 2, osszeg: 3000000 },
  },
  {
    nombre: "25 év a nyugdíj előtt: kilenc havi",
    origen: { tipo: "recalculado", url: MT, detalle: "Hathavi (f) pont) + háromhavi emelés = 9 × 400 000 = 3 600 000." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, tavolletiDij: 400000, evek: 25, nyugdijElott: true },
    esperado: { honapok: 9, osszeg: 3600000 },
  },
  {
    nombre: "Két év után még nem jár",
    origen: { tipo: "recalculado", url: MT, detalle: "77. § (3): legalább három év kell." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, tavolletiDij: 500000, evek: 2 },
    esperado: { honapok: 0, osszeg: 0 },
  },
  {
    nombre: "Közös megegyezés",
    origen: { tipo: "recalculado", url: MT, detalle: "77. § (1): csak munkáltatói felmondásnál és jogutód nélküli megszűnésnél jár." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, megszunes: "mas", magatartas: null, tavolletiDij: 500000, evek: 10 },
    esperado: { osszeg: 0 },
  },
  {
    nombre: "Felmondás a magatartás miatt",
    origen: { tipo: "recalculado", url: MT, detalle: "77. § (5) b): nem jár végkielégítés." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, magatartas: true, tavolletiDij: 500000, evek: 10 },
    esperado: { osszeg: 0 },
  },
  {
    nombre: "Jogutód nélküli megszűnés, hat év",
    origen: { tipo: "recalculado", url: MT, detalle: "77. § (3) b): legalább öt év, kéthavi; 2 × 450 000 = 900 000." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, megszunes: "megszunt", magatartas: null, tavolletiDij: 450000, evek: 6 },
    esperado: { honapok: 2, osszeg: 900000 },
  },
]);
