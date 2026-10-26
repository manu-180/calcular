import { definirCasos } from "@/motor/calculo";
import jarulekKalkulator from "./jarulek-kalkulator";

const TBJ = "https://njt.jog.gov.hu/jogszabaly/2019-122-00-00";
const SZOCHO = "https://njt.jog.gov.hu/jogszabaly/2018-52-00-00";

export default definirCasos(jarulekKalkulator, [
  {
    nombre: "Munkavállaló, 500 000 Ft bruttó",
    origen: { tipo: "recalculado", url: TBJ, detalle: "TB 18,5% = 92 500 (Tbj. 25. §); szocho 13% = 65 000 (Szocho tv. 2. §)." },
    fecha: "2026-10-24",
    entrada: { helyzet: "munkavallalo", jovedelem: 500000, garantalt: null },
    esperado: { tb: 92500, szocho: 65000, osszes: 157500, alap: 500000, minimum: null },
  },
  {
    nombre: "Egyéni vállalkozó a minimálbér alatt",
    origen: { tipo: "recalculado", url: SZOCHO, detalle: "Az alap legalább a minimálbér, 322 800 (Tbj. 40. § (3), Szocho tv. 8. § (3)): TB 59 718, szocho 41 964." },
    fecha: "2026-10-24",
    entrada: { helyzet: "vallalkozo", jovedelem: 150000, garantalt: false },
    esperado: { alap: 322800, tb: 59718, szocho: 41964, osszes: 101682 },
  },
  {
    nombre: "Egyéni vállalkozó, garantált bérminimum",
    origen: { tipo: "recalculado", url: SZOCHO, detalle: "Alap 373 200: TB 69 042, szocho 48 516." },
    fecha: "2026-10-24",
    entrada: { helyzet: "vallalkozo", jovedelem: 300000, garantalt: true },
    esperado: { alap: 373200, tb: 69042, szocho: 48516 },
  },
  {
    nombre: "Egyéni vállalkozó a minimum felett",
    origen: { tipo: "recalculado", url: TBJ, detalle: "Alap 600 000: TB 111 000, szocho 78 000." },
    fecha: "2026-10-24",
    entrada: { helyzet: "vallalkozo", jovedelem: 600000, garantalt: false },
    esperado: { alap: 600000, tb: 111000, szocho: 78000, eves: 2268000 },
  },
]);
