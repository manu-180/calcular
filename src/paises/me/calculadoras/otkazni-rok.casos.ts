import { definirCasos } from "@/motor/calculo";
import otkazniRok from "./otkazni-rok";

const RADU = "https://wapi.gov.me/download/5708ed78-5d80-492f-89f1-daa147732dc8?version=1.0";

export default definirCasos(otkazniRok, [
  {
    nombre: "Redovni rok od 30 dana",
    origen: { tipo: "recalculado", url: RADU, detalle: "Čl. 177 st. 1: 2. 11. + 30 dana = 2. 12. 2026; pet sedmica x 4 časa = 20." },
    fecha: "2026-10-31",
    entrada: { slucaj: "redovni", datum: "2026-11-02", ugovoreno: null },
    esperado: { kraj: "2026-12-02", dana: 30, casovi: 20 },
  },
  {
    nombre: "Probni rad",
    origen: { tipo: "recalculado", url: RADU, detalle: "Čl. 35 st. 6: najmanje pet dana." },
    fecha: "2026-10-31",
    entrada: { slucaj: "probni", datum: "2026-11-02", ugovoreno: null },
    esperado: { kraj: "2026-11-07", dana: 5 },
  },
  {
    nombre: "Kraći rok od zakonskog je greška",
    origen: { tipo: "recalculado", url: RADU, detalle: "Čl. 177 st. 1: najmanje 30 dana." },
    fecha: "2026-10-31",
    entrada: { slucaj: "redovni", datum: "2026-11-02", ugovoreno: 15 },
    esperaError: true,
  },
]);
