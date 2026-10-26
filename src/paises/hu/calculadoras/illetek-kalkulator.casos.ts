import { definirCasos } from "@/motor/calculo";
import illetekKalkulator from "./illetek-kalkulator";

const ITV = "https://njt.jog.gov.hu/jogszabaly/1990-93-00-00";
const ALAP = { eladott: null, ujLakas: false, fiatal: false };

export default definirCasos(illetekKalkulator, [
  {
    nombre: "40 millió Ft-os használt lakás",
    origen: { tipo: "recalculado", url: ITV, detalle: "19. § (1): 40 000 000 × 4% = 1 600 000." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, ertek: 40000000 },
    esperado: { illetek: 1600000, alap: 40000000 },
  },
  {
    nombre: "Lakáscsere: 30 millió Ft-os lakás eladása után",
    origen: { tipo: "recalculado", url: ITV, detalle: "21. § (2): a különbözet 10 000 000 × 4% = 400 000." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, ertek: 40000000, eladott: 30000000 },
    esperado: { alap: 10000000, illetek: 400000 },
  },
  {
    nombre: "25 millió Ft-os új lakás",
    origen: { tipo: "recalculado", url: ITV, detalle: "26. § (1) f): 30 millió Ft alatt a 15 millió Ft-nak megfelelő illetéket nem kell megfizetni; (25 − 15) millió × 4% = 400 000." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, ertek: 25000000, ujLakas: true },
    esperado: { alap: 10000000, illetek: 400000 },
  },
  {
    nombre: "14 millió Ft-os új lakás: illetékmentes",
    origen: { tipo: "recalculado", url: ITV, detalle: "26. § (1) f): 15 millió Ft-ig mentes." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, ertek: 14000000, ujLakas: true },
    esperado: { illetek: 0 },
  },
  {
    nombre: "35 év alatti első lakás, 15 millió Ft",
    origen: { tipo: "recalculado", url: ITV, detalle: "26. § (6): 600 000 legfeljebb 50%-kal csökken: 300 000." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, ertek: 15000000, fiatal: true },
    esperado: { kedvezmeny: 300000, illetek: 300000 },
  },
  {
    nombre: "1,2 milliárd Ft-os ingatlan",
    origen: { tipo: "recalculado", url: ITV, detalle: "19. § (1): 1 milliárdig 4% = 40 000 000, felette 2% = 4 000 000; összesen 44 000 000." },
    fecha: "2026-10-24",
    entrada: { ...ALAP, ertek: 1200000000 },
    esperado: { illetek: 44000000 },
  },
]);
