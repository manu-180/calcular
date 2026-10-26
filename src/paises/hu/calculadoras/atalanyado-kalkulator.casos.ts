import { definirCasos } from "@/motor/calculo";
import atalanyadoKalkulator from "./atalanyado-kalkulator";

const SZJA = "https://njt.jog.gov.hu/jogszabaly/1995-117-00-00";
const NAV = "https://nav.gov.hu/sajtoszoba/hirek/Kedvezoen_valtoztak_az_atalanyadozas_szabalyai";

export default definirCasos(atalanyadoKalkulator, [
  {
    nombre: "6 millió Ft bevétel, 45% költséghányad, főfoglalkozású",
    origen: { tipo: "recalculado", url: NAV, detalle: "Jövedelem 3 300 000; adómentes 1 936 800; adóköteles 1 363 200, SZJA 204 480. A járulékalap a minimum, 12 × 322 800 = 3 873 600: TB 716 616, szocho 503 568." },
    fecha: "2026-10-24",
    entrada: { bevetel: 6000000, tevekenyseg: "altalanos", fofoglalkozasu: true, garantalt: false },
    esperado: { jovedelem: 3300000, adomentes: 1936800, adokoteles: 1363200, szja: 204480, tb: 716616, szocho: 503568, osszes: 1424664 },
  },
  {
    nombre: "20 millió Ft bevétel: a jövedelem a minimum felett",
    origen: { tipo: "recalculado", url: SZJA, detalle: "Jövedelem 11 000 000; adóköteles 9 063 200; SZJA 1 359 480, TB 1 676 692, szocho 1 178 216." },
    fecha: "2026-10-24",
    entrada: { bevetel: 20000000, tevekenyseg: "altalanos", fofoglalkozasu: true, garantalt: false },
    esperado: { adokoteles: 9063200, szja: 1359480, tb: 1676692, szocho: 1178216, osszes: 4214388, hatar: 38736000 },
  },
  {
    nombre: "Kiskereskedelem 90%, 30 millió Ft bevétel",
    origen: { tipo: "recalculado", url: SZJA, detalle: "53. § (1) c): jövedelem 3 000 000; adóköteles 1 063 200; SZJA 159 480; járulékalap a minimum. Bevételi határ 50 × 3 873 600 = 193 680 000." },
    fecha: "2026-10-24",
    entrada: { bevetel: 30000000, tevekenyseg: "kiskereskedelem", fofoglalkozasu: true, garantalt: false },
    esperado: { jovedelem: 3000000, szja: 159480, tb: 716616, hatar: 193680000 },
  },
  {
    nombre: "Mellékállás, 3 millió Ft bevétel: minden adómentes",
    origen: { tipo: "recalculado", url: NAV, detalle: "Jövedelem 1 650 000, kevesebb az adómentes 1 936 800-nál; nincs járulékminimum." },
    fecha: "2026-10-24",
    entrada: { bevetel: 3000000, tevekenyseg: "altalanos", fofoglalkozasu: false, garantalt: null },
    esperado: { adokoteles: 0, szja: 0, tb: 0, szocho: 0, osszes: 0 },
  },
  {
    nombre: "80% költséghányad, garantált bérminimummal",
    origen: { tipo: "recalculado", url: SZJA, detalle: "Bevétel 15 000 000 × 20% = 3 000 000; adóköteles 1 063 200; járulékalap 12 × 373 200 = 4 478 400: TB 828 504, szocho 582 192." },
    fecha: "2026-10-24",
    entrada: { bevetel: 15000000, tevekenyseg: "kiemelt", fofoglalkozasu: true, garantalt: true },
    esperado: { jovedelem: 3000000, tb: 828504, szocho: 582192 },
  },
]);
