import { definirCasos } from "@/motor/calculo";
import ddvKalkulator from "./ddv-kalkulator";

const ZDDV = "https://www.ujp.gov.mk/files/attachment/0000/0986/______________________________________.____________267____30.12.2025.pdf";

export default definirCasos(ddvKalkulator, [
  {
    nombre: "10.000 денари без ДДВ, општа стапка",
    origen: { tipo: "recalculado", url: ZDDV, detalle: "10.000 × 18 % = 1.800; вкупно 11.800." },
    fecha: "2026-11-01",
    entrada: { iznos: 10000, stapka: "opshta", pravec: "bez" },
    esperado: { ddv: 1800, so: 11800, bez: 10000 },
  },
  {
    nombre: "11.800 денари со ДДВ, општа стапка",
    origen: { tipo: "recalculado", url: ZDDV, detalle: "11.800 / 1,18 = 10.000; ДДВ 1.800." },
    fecha: "2026-11-01",
    entrada: { iznos: 11800, stapka: "opshta", pravec: "so" },
    esperado: { bez: 10000, ddv: 1800 },
  },
  {
    nombre: "1.050 денари со ДДВ, стапка 5 %",
    origen: { tipo: "recalculado", url: ZDDV, detalle: "1.050 / 1,05 = 1.000; ДДВ 50." },
    fecha: "2026-11-01",
    entrada: { iznos: 1050, stapka: "povlastena5", pravec: "so" },
    esperado: { bez: 1000, ddv: 50 },
  },
  {
    nombre: "1.000 денари без ДДВ, стапка 10 %",
    origen: { tipo: "recalculado", url: ZDDV, detalle: "1.000 × 10 % = 100; вкупно 1.100." },
    fecha: "2026-11-01",
    entrada: { iznos: 1000, stapka: "povlastena10", pravec: "bez" },
    esperado: { ddv: 100, so: 1100 },
  },
]);
