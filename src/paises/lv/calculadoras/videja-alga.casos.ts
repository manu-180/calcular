import { definirCasos } from "@/motor/calculo";
import videjaAlga from "./videja-alga";

const U = "https://data.stat.gov.lv/api/v1/lv/OSP_PUB/START/EMP/DS/DSV/DSV010m";

export default definirCasos(videjaAlga, [
  {
    nombre: "1946 eiro ir vidējā alga 2026. gada jūnijā",
    origen: { tipo: "recalculado", url: U, detalle: "CSP: 2026-06 bruto 1946 eiro. 1946 / 1946 = 100%." },
    fecha: "2026-11-01",
    entrada: { alga: 1946 },
    esperado: { videja: 1946, attieciba: 100, starpiba: 0 },
  },
  {
    nombre: "1500 eiro pret 1946",
    origen: { tipo: "recalculado", url: U, detalle: "1500 - 1946 = -446. 1500 / 1946 = 77,08%." },
    fecha: "2026-11-01",
    entrada: { alga: 1500 },
    esperado: { starpiba: -446, attieciba: 77.08 },
    tolerancia: 0.01,
  },
]);
