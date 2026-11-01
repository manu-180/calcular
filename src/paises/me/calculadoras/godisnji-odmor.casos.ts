import { definirCasos } from "@/motor/calculo";
import godisnjiOdmor from "./godisnji-odmor";

const RADU = "https://wapi.gov.me/download/5708ed78-5d80-492f-89f1-daa147732dc8?version=1.0";

export default definirCasos(godisnjiOdmor, [
  {
    nombre: "Puna godina, pet radnih dana",
    origen: { tipo: "recalculado", url: RADU, detalle: "Zakon o radu, čl. 81 st. 1: najmanje 20 radnih dana." },
    fecha: "2026-10-31",
    entrada: { sedmica: "pet", mjeseci: 12, ugovoreno: null },
    esperado: { dana: 20, minimum: 20 },
  },
  {
    nombre: "Šest radnih dana",
    origen: { tipo: "recalculado", url: RADU, detalle: "Čl. 81 st. 3: 24 radna dana." },
    fecha: "2026-10-31",
    entrada: { sedmica: "sest", mjeseci: 12, ugovoreno: null },
    esperado: { dana: 24 },
  },
  {
    nombre: "Sedam mjeseci sa 22 ugovorena dana",
    origen: { tipo: "recalculado", url: RADU, detalle: "Čl. 79 st. 3 i 4: 22 / 12 x 7 = 12,83, zaokruženo 13." },
    fecha: "2026-10-31",
    entrada: { sedmica: "pet", ugovoreno: 22, mjeseci: 7 },
    esperado: { dana: 13, godisnje: 22 },
  },
  {
    nombre: "Manje od minimuma je greška",
    origen: { tipo: "recalculado", url: RADU, detalle: "Čl. 81 st. 1: ne manje od 20." },
    fecha: "2026-10-31",
    entrada: { sedmica: "pet", ugovoreno: 15, mjeseci: 12 },
    esperaError: true,
  },
]);
