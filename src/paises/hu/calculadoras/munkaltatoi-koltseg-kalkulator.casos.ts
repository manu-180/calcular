import { definirCasos } from "@/motor/calculo";
import munkaltatoiKoltsegKalkulator from "./munkaltatoi-koltseg-kalkulator";

const SZOCHO = "https://njt.jog.gov.hu/jogszabaly/2018-52-00-00";

export default definirCasos(munkaltatoiKoltsegKalkulator, [
  {
    nombre: "500 000 Ft bruttó",
    origen: { tipo: "recalculado", url: SZOCHO, detalle: "Szocho 13% = 65 000; költség 565 000; nettó 332 500; adók és járulékok 232 500." },
    fecha: "2026-10-24",
    entrada: { brutto: 500000, fo: 1 },
    esperado: { szocho: 65000, koltseg: 565000, netto: 332500, allamnak: 232500, evesKoltseg: 6780000 },
  },
  {
    nombre: "Három fő minimálbéren",
    origen: { tipo: "recalculado", url: SZOCHO, detalle: "322 800 × 1,13 = 364 764 havonta; × 12 × 3 = 13 131 504." },
    fecha: "2026-10-24",
    entrada: { brutto: 322800, fo: 3 },
    esperado: { szocho: 41964, koltseg: 364764, evesKoltseg: 13131504 },
  },
  {
    nombre: "Nulla bér",
    origen: { tipo: "recalculado", url: SZOCHO, detalle: "Bér nélkül nincs költség." },
    fecha: "2026-10-24",
    entrada: { brutto: 0, fo: 1 },
    esperaError: true,
  },
]);
