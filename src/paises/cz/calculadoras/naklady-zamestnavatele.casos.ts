import { definirCasos } from "@/motor/calculo";
import nakladyZamestnavatele from "./naklady-zamestnavatele";

const CSSZ = "https://www.cssz.gov.cz/web/cz/vyse-a-sazba";

export default definirCasos(nakladyZamestnavatele, [
  {
    nombre: "45 000 Kč hrubého",
    origen: {
      tipo: "recalculado",
      url: CSSZ,
      detalle: "Sociální 24,8 % = 11 160; zdravotní 13,5 % = 6 075, zaměstnavatel dvě třetiny 4 050; náklady 45 000 + 11 160 + 4 050 = 60 210, za rok 722 520.",
    },
    fecha: "2026-10-24",
    entrada: { hruba: 45000, zamestnanci: 1 },
    esperado: { socialni: 11160, zdravotni: 4050, naklady: 60210, rocne: 722520, cista: 35600 },
  },
  {
    nombre: "33 333 Kč: zaokrouhlení nahoru",
    origen: {
      tipo: "recalculado",
      url: CSSZ,
      detalle: "Sociální 8 266,58 → 8 267; zdravotní 4 499,96 → 4 500, zaměstnanec 1 500, zaměstnavatel 3 000; náklady 44 600.",
    },
    fecha: "2026-10-24",
    entrada: { hruba: 33333, zamestnanci: 1 },
    esperado: { socialni: 8267, zdravotni: 3000, naklady: 44600 },
  },
  {
    nombre: "Dva zaměstnanci po 30 000 Kč",
    origen: {
      tipo: "recalculado",
      url: CSSZ,
      detalle: "Na jednoho: sociální 7 440, zdravotní 4 050 − 1 350 = 2 700, náklady 40 140. Za dva 80 280, odvody 20 280.",
    },
    fecha: "2026-10-24",
    entrada: { hruba: 30000, zamestnanci: 2 },
    esperado: { naklady: 80280, odvody: 20280 },
  },
  {
    nombre: "Nulová mzda",
    origen: { tipo: "recalculado", url: CSSZ, detalle: "Bez mzdy nejsou žádné odvody." },
    fecha: "2026-10-24",
    entrada: { hruba: 0, zamestnanci: 1 },
    esperaError: true,
  },
]);
