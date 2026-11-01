import { definirCasos } from "@/motor/calculo";
import vypovedniDoba from "./vypovedni-doba";

const MPSV = "https://ppropo.mpsv.cz/VI21Obecnepodminkyplatnostivypov";
const ZP = "https://www.zakonyprolidi.cz/cs/2006-262";

export default definirCasos(vypovedniDoba, [
  {
    nombre: "Výpověď doručená 5. 7. 2025",
    origen: { tipo: "oficial", url: MPSV, detalle: "MPSV: dvouměsíční výpovědní doba u výpovědi doručené 5. 7. 2025 skončí 5. 9. 2025." },
    fecha: "2026-10-24",
    entrada: { doruceni: "2025-07-05", mesice: 2 },
    esperado: { zacatek: "2025-07-05", konec: "2025-09-05", dny: 63 },
  },
  {
    nombre: "Doručení 31. prosince: konec posledním dnem února",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 51 odst. 1: v únoru není 31. den, výpovědní doba končí 28. 2. 2026." },
    fecha: "2026-10-24",
    entrada: { doruceni: "2025-12-31", mesice: 2 },
    esperado: { konec: "2026-02-28", dny: 60 },
  },
  {
    nombre: "Výpověď doručená před 1. 6. 2025",
    origen: { tipo: "oficial", url: MPSV, detalle: "U výpovědí doručených do 31. 5. 2025 běží výpovědní doba od prvního dne následujícího měsíce do konce posledního měsíce." },
    fecha: "2026-10-24",
    entrada: { doruceni: "2025-05-15", mesice: 2 },
    esperado: { zacatek: "2025-06-01", konec: "2025-07-31", dny: 61 },
  },
  {
    nombre: "Tříměsíční výpovědní doba podle smlouvy",
    origen: { tipo: "recalculado", url: ZP, detalle: "Doručení 10. 3. 2026, tři měsíce: konec 10. 6. 2026." },
    fecha: "2026-10-24",
    entrada: { doruceni: "2026-03-10", mesice: 3 },
    esperado: { konec: "2026-06-10" },
  },
]);
